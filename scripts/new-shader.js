#!/usr/bin/env node
import { cpSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: npm run new <shader-name>');
  process.exit(1);
}

const dest = resolve(root, 'src/shaders', slug);
if (existsSync(dest)) {
  console.error(`Already exists: src/shaders/${slug}/`);
  process.exit(1);
}

const template = resolve(root, 'src/shaders/_template');

// Copy template folder
cpSync(template, dest, { recursive: true });

// Build replacements
const title = slug
  .split('-')
  .map(w => w.charAt(0).toUpperCase() + w.slice(1))
  .join(' ');
const date = new Date().toISOString().slice(0, 10);

// Apply replacements to all files
for (const file of ['meta.json', 'image.glsl']) {
  const filepath = resolve(dest, file);
  let content = readFileSync(filepath, 'utf-8');
  content = content.replace(/\{\{TITLE\}\}/g, title);
  content = content.replace(/\{\{DATE\}\}/g, date);
  writeFileSync(filepath, content);
}

console.log(`Created src/shaders/${slug}/`);
console.log(`  image.glsl  — starter gradient + glow`);
console.log(`  meta.json   — title: "${title}"`);
