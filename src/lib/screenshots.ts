import { existsSync, readdirSync, readFileSync } from 'node:fs';

export type Screenshot = { src: string; width: number; height: number; caption: string };

const DIR = 'public/screenshots';

const CAPTIONS: Record<string, string> = {
  goop: 'Welcome screen, macOS',
  macos: 'macOS',
  windows: 'Windows',
  linux: 'Linux',
};

// PNG header: width and height are big-endian uint32 at bytes 16 and 20.
function pngSize(path: string) {
  const b = readFileSync(path, { encoding: null }).subarray(0, 24);
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
}

export function screenshot(name: string): Screenshot | undefined {
  const path = `${DIR}/${name}.png`;
  if (!existsSync(path)) return undefined;
  return { src: `/screenshots/${name}.png`, ...pngSize(path), caption: CAPTIONS[name] ?? name };
}

export function allScreenshots(): Screenshot[] {
  if (!existsSync(DIR)) return [];
  return readdirSync(DIR)
    .filter((f) => f.endsWith('.png'))
    .sort()
    .map((f) => screenshot(f.slice(0, -4))!);
}
