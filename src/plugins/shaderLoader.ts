/**
 * Vite plugin for build-time shader discovery.
 *
 * Scans `src/shaders/<slug>/` folders, reads GLSL source and metadata,
 * and exposes the result as the virtual module `virtual:shader-registry`.
 *
 * @module plugins/shaderLoader
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import type { Plugin, ViteDevServer } from 'vite';
import {
  IMAGE_PASS_FILENAME,
  BUFFER_FILENAMES,
  META_FILENAME,
  SCREENSHOT_FILENAME,
  LIB_DIRNAME,
} from '../constants';
import type {
  RawShaderMeta,
  ShaderEntry,
  ShaderPasses,
  ShaderChannels,
  CommonsSource,
  PassId,
  ChannelBindings,
  ChannelSlot,
} from '../types';

const VIRTUAL_MODULE_ID = 'virtual:shader-registry';
const RESOLVED_VIRTUAL_MODULE_ID = '\0virtual:shader-registry';

/**
 * Internal shader entry shape used during plugin scan before serialization.
 */
type ShaderEntryInternal = ShaderEntry & { _hasScreenshot?: boolean };

/** Map buffer filenames to their PassId keys */
const BUFFER_PASS_MAP: Record<string, PassId> = {
  'buffer-a.glsl': 'bufferA',
  'buffer-b.glsl': 'bufferB',
  'buffer-c.glsl': 'bufferC',
  'buffer-d.glsl': 'bufferD',
};

/** Map buffer index to the default iChannel slot on the image pass */
const BUFFER_INDEX_TO_CHANNEL: ChannelSlot[] = [
  'iChannel0',
  'iChannel1',
  'iChannel2',
  'iChannel3',
];

/**
 * Build default channel wiring based on which buffers exist.
 *
 * - Image pass gets `iChannel0 = buffer-a`, `iChannel1 = buffer-b`, etc.
 *   for each buffer that exists.
 * - Each buffer pass gets `iChannel0 = self` for feedback.
 */
function buildDefaultChannels(existingBuffers: string[]): ShaderChannels {
  const channels: ShaderChannels = {};

  if (existingBuffers.length === 0) return channels;

  const imageBindings: ChannelBindings = {};
  for (let i = 0; i < existingBuffers.length; i++) {
    const bufferFile = existingBuffers[i];
    const passId = BUFFER_PASS_MAP[bufferFile];
    const channelSlot = BUFFER_INDEX_TO_CHANNEL[i];
    if (passId && channelSlot) {
      // e.g. iChannel0 = 'buffer-a'
      imageBindings[channelSlot] = bufferFile.replace('.glsl', '') as
        'buffer-a' | 'buffer-b' | 'buffer-c' | 'buffer-d';
    }
  }

  if (Object.keys(imageBindings).length > 0) {
    channels.image = imageBindings;
  }

  // Each buffer gets iChannel0 = 'self' for feedback
  for (const bufferFile of existingBuffers) {
    const passId = BUFFER_PASS_MAP[bufferFile];
    if (passId) {
      channels[passId] = { iChannel0: 'self' };
    }
  }

  return channels;
}

/**
 * Deep-merge channel overrides from meta.json onto defaults.
 * Meta overrides win for any slot that is explicitly set.
 */
function mergeChannels(
  defaults: ShaderChannels,
  overrides: ShaderChannels,
): ShaderChannels {
  const result: ShaderChannels = { ...defaults };

  for (const key of Object.keys(overrides) as PassId[]) {
    const existing = result[key] ?? {};
    const incoming = overrides[key] ?? {};
    result[key] = { ...existing, ...incoming };
  }

  return result;
}

/** Assign a buffer source to the correct pass property in a type-safe way. */
function assignBufferPass(
  passes: ShaderPasses,
  passId: PassId,
  source: string,
): void {
  switch (passId) {
    case 'bufferA':
      passes.bufferA = source;
      break;
    case 'bufferB':
      passes.bufferB = source;
      break;
    case 'bufferC':
      passes.bufferC = source;
      break;
    case 'bufferD':
      passes.bufferD = source;
      break;
    default:
      break;
  }
}

/**
 * Load commons GLSL source files as individual entries.
 *
 * @param libDir - Absolute path to the src/lib/ directory
 * @param commons - Array of common names (e.g. ['sphere', 'lighting'])
 * @param slug - Shader slug for error messages
 * @returns Array of CommonsSource entries (name + source)
 */
function loadCommons(libDir: string, commons: string[], slug: string): CommonsSource[] {
  const entries: CommonsSource[] = [];

  for (const name of commons) {
    if (name.includes('..') || name.includes('/') || name.includes('\\')) {
      console.warn(`[shader-loader] Skipping commons entry with suspicious path characters in ${slug}: ${name}`);
      continue;
    }

    const filePath = path.join(libDir, `${name}.glsl`);
    if (!fs.existsSync(filePath)) {
      throw new Error(`[shader-loader] Commons file not found for shader "${slug}": src/lib/${name}.glsl`);
    }

    try {
      entries.push({ name, source: fs.readFileSync(filePath, 'utf-8') });
    } catch (err) {
      throw new Error(`[shader-loader] Failed to read commons file src/lib/${name}.glsl for shader "${slug}": ${err}`);
    }
  }

  return entries;
}

/**
 * Scan all shader directories and assemble the registry.
 */
function scanShaders(shadersDir: string, libDir: string): ShaderEntryInternal[] {
  if (!fs.existsSync(shadersDir)) return [];

  const entries: ShaderEntryInternal[] = [];

  // Issue #4: Directory read error handling
  let slugs: string[];
  try {
    slugs = fs
      .readdirSync(shadersDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .sort();
  } catch (err) {
    console.warn(`[shader-loader] Failed to read directory ${shadersDir}:`, err);
    return [];
  }

  for (const slug of slugs) {
    // Issue #5: Path traversal protection
    if (slug.includes('..') || slug.includes('/') || slug.includes('\\')) {
      console.warn(`[shader-loader] Skipping slug with suspicious path characters: ${slug}`);
      continue;
    }

    // Skip underscore-prefixed folders (e.g. _template)
    if (slug.startsWith('_')) continue;

    const dir = path.join(shadersDir, slug);
    const metaPath = path.join(dir, META_FILENAME);
    const imagePath = path.join(dir, IMAGE_PASS_FILENAME);

    // Both meta.json and image.glsl are required
    if (!fs.existsSync(metaPath) || !fs.existsSync(imagePath)) continue;

    // Issue #1: JSON parse error handling
    // Issue #2: File read error handling for meta.json
    let rawMeta: RawShaderMeta;
    try {
      rawMeta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
    } catch (err) {
      console.warn(`[shader-loader] Malformed JSON in ${metaPath}:`, err);
      continue;
    }

    // Issue #3: JSON schema validation
    if (
      !rawMeta.title ||
      !rawMeta.description ||
      !rawMeta.date ||
      !rawMeta.tags ||
      !rawMeta.links
    ) {
      console.warn(`[shader-loader] Missing required fields in ${metaPath}`);
      continue;
    }

    // Issue #2: File read error handling for image.glsl
    let imageSource: string;
    try {
      imageSource = fs.readFileSync(imagePath, 'utf-8');
    } catch (err) {
      console.warn(`[shader-loader] Failed to read ${imagePath}:`, err);
      continue;
    }

    const passes: ShaderPasses = { image: imageSource };
    const existingBuffers: string[] = [];

    for (const bufferFile of BUFFER_FILENAMES) {
      const bufferPath = path.join(dir, bufferFile);
      if (fs.existsSync(bufferPath)) {
        const passId = BUFFER_PASS_MAP[bufferFile];
        if (passId) {
          // Issue #2: File read error handling for buffer files
          let bufferSource: string;
          try {
            bufferSource = fs.readFileSync(bufferPath, 'utf-8');
          } catch (err) {
            console.warn(`[shader-loader] Failed to read ${bufferPath}:`, err);
            continue;
          }
          // Issue #6: Type-safe buffer pass assignment
          assignBufferPass(passes, passId, bufferSource);
          existingBuffers.push(bufferFile);
        }
      }
    }

    const defaultChannels = buildDefaultChannels(existingBuffers);
    const channels = rawMeta.channels
      ? mergeChannels(defaultChannels, rawMeta.channels)
      : defaultChannels;

    // Load commons sources if specified (renderer prepends at runtime)
    const commonsSources: CommonsSource[] =
      rawMeta.commons && rawMeta.commons.length > 0
        ? loadCommons(libDir, rawMeta.commons, slug)
        : [];

    // Detect screenshot in shader source folder
    const screenshotPath = path.join(dir, SCREENSHOT_FILENAME);
    const hasScreenshot = fs.existsSync(screenshotPath);

    entries.push({
      slug,
      title: rawMeta.title,
      description: rawMeta.description,
      date: rawMeta.date,
      tags: rawMeta.tags,
      links: rawMeta.links,
      screenshotUrl: '',
      passes,
      channels,
      commonsSources,
      _hasScreenshot: hasScreenshot,
    });
  }

  // Issue #7: Warning when zero shaders found
  if (entries.length === 0) {
    console.warn(`[shader-loader] No shaders found in ${shadersDir}`);
  }

  return entries;
}

/**
 * Vite plugin that provides `virtual:shader-registry` with
 * build-time-discovered shader data.
 */
export function shaderLoaderPlugin(): Plugin {
  let shadersDir: string;
  let libDir: string;

  return {
    name: 'shader-loader',

    configResolved(config) {
      shadersDir = path.resolve(config.root, 'src/shaders');
      libDir = path.resolve(config.root, 'src', LIB_DIRNAME);
    },

    resolveId(id: string) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
    },

    load(id: string) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        const entries = scanShaders(shadersDir, libDir);

        // Generate import statements for screenshots found in shader source folders
        const imports: string[] = [];
        const screenshotVars = new Map<string, string>();

        for (const entry of entries) {
          if (entry._hasScreenshot) {
            const varName = `__ss_${entry.slug.replace(/[^a-zA-Z0-9]/g, '_')}`;
            const importPath = `/src/shaders/${entry.slug}/${SCREENSHOT_FILENAME}`;
            imports.push(`import ${varName} from '${importPath}';`);
            screenshotVars.set(entry.slug, varName);
          }
        }

        // Build module: JSON with screenshot placeholders replaced by import refs
        const PLACEHOLDER_PREFIX = '__SCREENSHOT_IMPORT_';
        const serializable = entries.map(({ _hasScreenshot, ...entry }) => ({
          ...entry,
          screenshotUrl: screenshotVars.has(entry.slug)
            ? `${PLACEHOLDER_PREFIX}${entry.slug}__`
            : '',
        }));

        let dataStr = JSON.stringify(serializable, null, 2);

        // Replace placeholder strings with actual import variable references
        for (const [slug, varName] of screenshotVars) {
          dataStr = dataStr.replace(
            `"${PLACEHOLDER_PREFIX}${slug}__"`,
            varName,
          );
        }

        return `${imports.join('\n')}\nexport const shaders = ${dataStr};\n`;
      }
    },

    configureServer(server: ViteDevServer) {
      // Watch shader files for HMR
      server.watcher.add(path.join(shadersDir, '**/*.glsl'));
      server.watcher.add(path.join(shadersDir, `**/${META_FILENAME}`));
      // Watch shared lib files for HMR
      server.watcher.add(path.join(libDir, '**/*.glsl'));

      server.watcher.on('change', (file: string) => {
        const normalized = file.replace(/\\/g, '/');
        if (
          (normalized.includes('/src/shaders/') || normalized.includes('/src/lib/')) &&
          (normalized.endsWith('.glsl') || normalized.endsWith('.json'))
        ) {
          const mod = server.moduleGraph.getModuleById(
            RESOLVED_VIRTUAL_MODULE_ID,
          );
          if (mod) {
            server.moduleGraph.invalidateModule(mod);
            server.ws.send({ type: 'full-reload' });
          }
        }
      });
    },
  };
}
