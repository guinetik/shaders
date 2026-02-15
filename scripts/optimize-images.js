#!/usr/bin/env node
/**
 * Converts PNG screenshots in src/shaders/ to optimized WebP.
 *
 * Usage:  npm run images
 *
 * Requires ImageMagick (`magick` or `convert`) on PATH.
 * - Finds all screenshot.png files under src/shaders/
 * - Converts each to screenshot.webp (quality 80)
 * - Deletes the original PNG after successful conversion
 */
import { readdirSync, existsSync, unlinkSync, statSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const shadersDir = resolve(root, 'src/shaders');

const WEBP_QUALITY = 80;

// Detect ImageMagick command
function findMagickCmd() {
  for (const cmd of ['magick', 'convert']) {
    try {
      execSync(`${cmd} --version`, { stdio: 'ignore' });
      return cmd;
    } catch {
      // not found, try next
    }
  }
  return null;
}

const magick = findMagickCmd();
if (!magick) {
  console.error('Error: ImageMagick not found. Install it and ensure `magick` or `convert` is on PATH.');
  process.exit(1);
}

// Find all shader folders with screenshot.png
const shaderFolders = readdirSync(shadersDir, { withFileTypes: true })
  .filter(d => d.isDirectory() && !d.name.startsWith('_'))
  .map(d => d.name);

let converted = 0;
let skipped = 0;

for (const slug of shaderFolders) {
  const pngPath = join(shadersDir, slug, 'screenshot.png');
  const webpPath = join(shadersDir, slug, 'screenshot.webp');

  if (!existsSync(pngPath)) continue;

  if (existsSync(webpPath)) {
    // WebP already exists — only re-convert if PNG is newer
    const pngMtime = statSync(pngPath).mtimeMs;
    const webpMtime = statSync(webpPath).mtimeMs;
    if (pngMtime <= webpMtime) {
      skipped++;
      continue;
    }
  }

  try {
    const cmd = magick === 'magick'
      ? `magick "${pngPath}" -quality ${WEBP_QUALITY} "${webpPath}"`
      : `convert "${pngPath}" -quality ${WEBP_QUALITY} "${webpPath}"`;

    execSync(cmd, { stdio: 'pipe' });

    const pngSize = statSync(pngPath).size;
    const webpSize = statSync(webpPath).size;
    const savings = ((1 - webpSize / pngSize) * 100).toFixed(0);

    unlinkSync(pngPath);
    converted++;

    console.log(`  ${slug}/screenshot.png → .webp  (${formatBytes(pngSize)} → ${formatBytes(webpSize)}, -${savings}%)`);
  } catch (err) {
    console.error(`  ${slug}/screenshot.png — conversion failed: ${err.message}`);
  }
}

if (converted === 0 && skipped === 0) {
  console.log('No PNG screenshots found.');
} else {
  if (converted > 0) console.log(`\nConverted ${converted} image${converted !== 1 ? 's' : ''}.`);
  if (skipped > 0) console.log(`Skipped ${skipped} (WebP already up to date).`);
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}
