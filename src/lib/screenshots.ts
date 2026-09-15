import { existsSync, readdirSync, readFileSync } from 'node:fs';

export type Screenshot = { src: string; width: number; height: number; caption: string };

const DIR = 'public/screenshots';

// Gallery order and captions. Files not listed here come after, by filename.
const CAPTIONS: Record<string, string> = {
  goop: 'Welcome screen',
  'chat-agent': 'Chatting with an agent',
  'chat-agent-light': 'Same chat, light theme',
  'note-to-self-light': 'Note to self',
  macos: 'macOS',
  windows: 'Windows',
  linux: 'Linux',
};
const ORDER = Object.keys(CAPTIONS);
const rank = (name: string) => {
  const i = ORDER.indexOf(name);
  return i === -1 ? ORDER.length : i;
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
    .map((f) => f.slice(0, -4))
    .sort((a, b) => rank(a) - rank(b) || a.localeCompare(b))
    .map((name) => screenshot(name)!);
}
