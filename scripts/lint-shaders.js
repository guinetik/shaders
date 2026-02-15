#!/usr/bin/env node
/**
 * GLSL Shader Linter
 *
 * Validates all .glsl files in src/shaders/ by wrapping them in the same
 * Shadertoy-compatible preamble the renderer uses, then running
 * glslangValidator against the assembled source.
 *
 * Usage: npm run lint:shaders
 *
 * Requires glslangValidator:
 *   Windows: scoop install main/glslang
 *   macOS:   brew install glslang
 *   Linux:   sudo apt install glslang-tools
 */

import { execSync } from 'child_process';
import { readdirSync, readFileSync, writeFileSync, unlinkSync, existsSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';
import { tmpdir } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const shadersDir = join(rootDir, 'src', 'shaders');

// Terminal colors
const c = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

/**
 * The same preamble the WebGL renderer injects (useShaderRenderer.ts).
 * Wraps user code so glslangValidator sees a complete ES 3.00 program.
 */
const PREAMBLE = `#version 300 es
precision highp float;
precision highp int;
uniform float iTime;
uniform float iTimeDelta;
uniform vec3 iResolution;
uniform vec4 iMouse;
uniform vec4 iDate;
uniform int iFrame;
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform sampler2D iChannel2;
uniform sampler2D iChannel3;
uniform vec3 iChannelResolution[4];
out vec4 outColor;
`;

const POSTAMBLE = `
void main() {
    mainImage(outColor, gl_FragCoord.xy);
}
`;

/** Number of lines in the preamble (for adjusting error line numbers). */
const PREAMBLE_LINES = PREAMBLE.split('\n').length;

/**
 * Check if glslangValidator is available on PATH.
 * @returns {boolean}
 */
function checkValidator() {
  try {
    execSync('glslangValidator --version', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

/**
 * Collect all .glsl files recursively under src/shaders/.
 * @returns {Array<{slug: string, file: string, path: string}>}
 */
function findShaders() {
  const results = [];
  if (!existsSync(shadersDir)) return results;

  for (const slug of readdirSync(shadersDir, { withFileTypes: true })) {
    if (!slug.isDirectory()) continue;
    const slugDir = join(shadersDir, slug.name);
    for (const entry of readdirSync(slugDir)) {
      if (!entry.endsWith('.glsl')) continue;
      results.push({
        slug: slug.name,
        file: entry,
        path: join(slugDir, entry),
      });
    }
  }
  return results;
}

/**
 * Validate a single shader file by wrapping it and running glslangValidator.
 * @param {string} filePath
 * @returns {{ success: boolean, errors: string[] }}
 */
function validateShader(filePath) {
  const userGlsl = readFileSync(filePath, 'utf8');
  const assembled = PREAMBLE + userGlsl + POSTAMBLE;

  // Write assembled source to a temp file (.frag so validator picks ES profile)
  const tmpFile = join(tmpdir(), `lint-shader-${Date.now()}.frag`);
  writeFileSync(tmpFile, assembled, 'utf8');

  try {
    execSync(`glslangValidator "${tmpFile}"`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    return { success: true, errors: [] };
  } catch (error) {
    const raw = error.stdout?.toString() || error.stderr?.toString() || error.message;
    // Adjust line numbers: subtract preamble lines so they match the user's file
    const errors = raw
      .split('\n')
      .filter(l => l.trim())
      .map(line =>
        line.replace(/^(ERROR|WARNING):\s*\d+:(\d+)/g, (match, level, lineNum) => {
          const adjusted = Math.max(1, parseInt(lineNum, 10) - PREAMBLE_LINES + 1);
          return `${level}: line ${adjusted}`;
        })
      );
    return { success: false, errors };
  } finally {
    try { unlinkSync(tmpFile); } catch { /* ignore */ }
  }
}

function printInstallInstructions() {
  console.log(`${c.yellow}${c.bold}glslangValidator not found!${c.reset}\n`);
  console.log('Install it for your platform:\n');
  console.log(`  ${c.cyan}Windows (Scoop):${c.reset}  scoop install main/glslang`);
  console.log(`  ${c.cyan}macOS:${c.reset}            brew install glslang`);
  console.log(`  ${c.cyan}Linux:${c.reset}            sudo apt install glslang-tools\n`);
}

function main() {
  console.log(`\n${c.cyan}${c.bold}GLSL Shader Linter${c.reset}\n`);

  if (!checkValidator()) {
    printInstallInstructions();
    process.exit(1);
  }

  const shaders = findShaders();

  if (shaders.length === 0) {
    console.log(`${c.yellow}No .glsl files found in src/shaders/${c.reset}`);
    process.exit(0);
  }

  console.log(`Found ${shaders.length} shader file(s)\n`);

  let passCount = 0;
  let failCount = 0;
  let currentSlug = '';

  for (const shader of shaders) {
    // Print slug header when it changes
    if (shader.slug !== currentSlug) {
      currentSlug = shader.slug;
      console.log(`${c.dim}${currentSlug}/${c.reset}`);
    }

    const result = validateShader(shader.path);

    if (result.success) {
      console.log(`  ${c.green}ok${c.reset}  ${shader.file}`);
      passCount++;
    } else {
      console.log(`  ${c.red}ERR${c.reset} ${shader.file}`);
      for (const line of result.errors) {
        console.log(`      ${c.red}${line}${c.reset}`);
      }
      failCount++;
    }
  }

  // Summary
  console.log(`\n${c.bold}Results:${c.reset} ${c.green}${passCount} passed${c.reset}${failCount > 0 ? `, ${c.red}${failCount} failed${c.reset}` : ''}\n`);

  process.exit(failCount > 0 ? 1 : 0);
}

main();
