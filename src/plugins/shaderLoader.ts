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
  SCREENSHOT_PATH_PREFIX,
  SCREENSHOT_FILENAME,
} from '../constants';
import type {
  RawShaderMeta,
  ShaderEntry,
  ShaderPasses,
  ShaderChannels,
  PassId,
  ChannelBindings,
  ChannelSlot,
} from '../types';

const VIRTUAL_MODULE_ID = 'virtual:shader-registry';
const RESOLVED_VIRTUAL_MODULE_ID = '\0virtual:shader-registry';

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

/**
 * Scan all shader directories and assemble the registry.
 */
function scanShaders(shadersDir: string): ShaderEntry[] {
  if (!fs.existsSync(shadersDir)) return [];

  const entries: ShaderEntry[] = [];
  const slugs = fs
    .readdirSync(shadersDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  for (const slug of slugs) {
    const dir = path.join(shadersDir, slug);
    const metaPath = path.join(dir, META_FILENAME);
    const imagePath = path.join(dir, IMAGE_PASS_FILENAME);

    // Both meta.json and image.glsl are required
    if (!fs.existsSync(metaPath) || !fs.existsSync(imagePath)) continue;

    const rawMeta: RawShaderMeta = JSON.parse(
      fs.readFileSync(metaPath, 'utf-8'),
    );
    const imageSource = fs.readFileSync(imagePath, 'utf-8');

    const passes: ShaderPasses = { image: imageSource };
    const existingBuffers: string[] = [];

    for (const bufferFile of BUFFER_FILENAMES) {
      const bufferPath = path.join(dir, bufferFile);
      if (fs.existsSync(bufferPath)) {
        const passId = BUFFER_PASS_MAP[bufferFile];
        if (passId) {
          (passes as unknown as Record<string, string>)[passId] = fs.readFileSync(
            bufferPath,
            'utf-8',
          );
          existingBuffers.push(bufferFile);
        }
      }
    }

    const defaultChannels = buildDefaultChannels(existingBuffers);
    const channels = rawMeta.channels
      ? mergeChannels(defaultChannels, rawMeta.channels)
      : defaultChannels;

    const screenshotUrl = `${SCREENSHOT_PATH_PREFIX}${slug}/${SCREENSHOT_FILENAME}`;

    entries.push({
      slug,
      title: rawMeta.title,
      description: rawMeta.description,
      date: rawMeta.date,
      tags: rawMeta.tags,
      links: rawMeta.links,
      screenshotUrl,
      passes,
      channels,
    });
  }

  return entries;
}

/**
 * Vite plugin that provides `virtual:shader-registry` with
 * build-time-discovered shader data.
 */
export function shaderLoaderPlugin(): Plugin {
  let shadersDir: string;

  return {
    name: 'shader-loader',

    configResolved(config) {
      shadersDir = path.resolve(config.root, 'src/shaders');
    },

    resolveId(id: string) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
    },

    load(id: string) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        const entries = scanShaders(shadersDir);
        return `export const shaders = ${JSON.stringify(entries, null, 2)};`;
      }
    },

    configureServer(server: ViteDevServer) {
      // Watch shader files for HMR
      server.watcher.add(path.join(shadersDir, '**/*.glsl'));
      server.watcher.add(path.join(shadersDir, `**/${META_FILENAME}`));

      server.watcher.on('change', (file: string) => {
        const normalized = file.replace(/\\/g, '/');
        if (
          normalized.includes('/src/shaders/') &&
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
