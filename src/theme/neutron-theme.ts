/**
 * Neutron UI Theme — Typed Constants
 *
 * Ported from the NeutronTheme system in feynman.ui.js.
 * Oscilloscope / particle detector aesthetic: dark blue-black
 * backgrounds, cyan glows, Fira Code monospace.
 *
 * @module theme/neutron-theme
 */

/** Available Neutron UI color variant names */
export type NeutronVariant = 'cyan' | 'danger' | 'magenta' | 'yellow' | 'green';

/** Color token set for a single Neutron UI variant */
export interface NeutronColorSet {
  readonly primary: string;
  readonly glow: string;
  readonly glowStrong: string;
  readonly bg: string;
  readonly bgLight: string;
  readonly bgHover: string;
  readonly border: string;
  readonly borderActive: string;
  readonly text: string;
  readonly textDim: string;
  readonly textWhite: string;
}

/** Complete Neutron UI color palette */
export const NEUTRON_COLORS: Readonly<Record<NeutronVariant, NeutronColorSet>> = {
  cyan: {
    primary: '#0ff',
    glow: 'rgba(0, 200, 255, 0.4)',
    glowStrong: 'rgba(0, 200, 255, 0.8)',
    bg: 'rgba(0, 5, 10, 0.95)',
    bgLight: 'rgba(0, 10, 20, 0.9)',
    bgHover: 'rgba(0, 200, 255, 0.15)',
    border: 'rgba(0, 200, 255, 0.4)',
    borderActive: '#0ff',
    text: '#0ff',
    textDim: 'rgba(0, 200, 255, 0.5)',
    textWhite: '#fff',
  },
  danger: {
    primary: '#f50',
    glow: 'rgba(255, 50, 50, 0.4)',
    glowStrong: 'rgba(255, 50, 50, 0.8)',
    bg: 'rgba(20, 0, 0, 0.95)',
    bgLight: 'rgba(40, 5, 5, 0.9)',
    bgHover: 'rgba(255, 100, 50, 0.15)',
    border: 'rgba(255, 100, 50, 0.5)',
    borderActive: '#f50',
    text: '#f90',
    textDim: 'rgba(255, 150, 100, 0.7)',
    textWhite: 'rgba(255, 200, 180, 0.9)',
  },
  magenta: {
    primary: '#f0f',
    glow: 'rgba(255, 50, 255, 0.4)',
    glowStrong: 'rgba(255, 100, 255, 0.8)',
    bg: 'rgba(15, 0, 15, 0.95)',
    bgLight: 'rgba(25, 5, 25, 0.9)',
    bgHover: 'rgba(255, 100, 255, 0.15)',
    border: 'rgba(255, 100, 255, 0.4)',
    borderActive: '#f0f',
    text: '#f6f',
    textDim: 'rgba(255, 150, 255, 0.6)',
    textWhite: '#fff',
  },
  yellow: {
    primary: '#ff0',
    glow: 'rgba(255, 255, 50, 0.4)',
    glowStrong: 'rgba(255, 255, 100, 0.8)',
    bg: 'rgba(15, 15, 0, 0.95)',
    bgLight: 'rgba(25, 25, 5, 0.9)',
    bgHover: 'rgba(255, 255, 100, 0.15)',
    border: 'rgba(255, 255, 100, 0.4)',
    borderActive: '#ff0',
    text: '#ff8',
    textDim: 'rgba(255, 255, 150, 0.6)',
    textWhite: '#fff',
  },
  green: {
    primary: '#0f0',
    glow: 'rgba(50, 255, 50, 0.4)',
    glowStrong: 'rgba(100, 255, 100, 0.8)',
    bg: 'rgba(0, 15, 5, 0.95)',
    bgLight: 'rgba(5, 25, 10, 0.9)',
    bgHover: 'rgba(100, 255, 100, 0.15)',
    border: 'rgba(100, 255, 100, 0.4)',
    borderActive: '#0f0',
    text: '#8f8',
    textDim: 'rgba(150, 255, 150, 0.6)',
    textWhite: '#fff',
  },
} as const;

/** Neutron UI font family constant */
export const NEUTRON_FONT_FAMILY = '"Fira Code", monospace';
