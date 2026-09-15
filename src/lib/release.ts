export type Asset = { name: string; size: number; url: string };
export type Release = { version: string; publishedAt: string; url: string; assets: Asset[] };

const REPO = 'dergigi/goop';
const DL = `https://github.com/${REPO}/releases/download`;

// Used when the GitHub API is unreachable at build time (rate limits, offline).
const FALLBACK: Release = {
  version: '2.1.0',
  publishedAt: '2026-09-14T21:36:28Z',
  url: `https://github.com/${REPO}/releases/tag/v2.1.0`,
  assets: [
    { name: 'goop-macos-arm64.dmg', size: 8810452, url: `${DL}/v2.1.0/goop-macos-arm64.dmg` },
    { name: 'goop-macos-x64.dmg', size: 9746343, url: `${DL}/v2.1.0/goop-macos-x64.dmg` },
    { name: 'goop-windows-arm64.exe', size: 7078188, url: `${DL}/v2.1.0/goop-windows-arm64.exe` },
    { name: 'goop-windows-x64.exe', size: 7495912, url: `${DL}/v2.1.0/goop-windows-x64.exe` },
    { name: 'goop-linux-arm64.flatpak', size: 9026088, url: `${DL}/v2.1.0/goop-linux-arm64.flatpak` },
    { name: 'goop-linux-arm64.snap', size: 14848000, url: `${DL}/v2.1.0/goop-linux-arm64.snap` },
    { name: 'goop-linux-arm64.tar.gz', size: 25214892, url: `${DL}/v2.1.0/goop-linux-arm64.tar.gz` },
    { name: 'goop-linux-x64.flatpak', size: 9269104, url: `${DL}/v2.1.0/goop-linux-x64.flatpak` },
    { name: 'goop-linux-x64.snap', size: 15093760, url: `${DL}/v2.1.0/goop-linux-x64.snap` },
    { name: 'goop-linux-x64.tar.gz', size: 26195202, url: `${DL}/v2.1.0/goop-linux-x64.tar.gz` },
    { name: 'SHA256SUMS', size: 880, url: `${DL}/v2.1.0/SHA256SUMS` },
  ],
};

export async function getRelease(): Promise<Release> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'goop-landing' },
    });
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const json = await res.json();
    return {
      version: String(json.tag_name).replace(/^v/, ''),
      publishedAt: json.published_at,
      url: json.html_url,
      assets: json.assets.map((a: any) => ({ name: a.name, size: a.size, url: a.browser_download_url })),
    };
  } catch (err) {
    console.warn(`[release] falling back to v${FALLBACK.version}:`, (err as Error).message);
    return FALLBACK;
  }
}

export function formatSize(bytes: number): string {
  return `${(bytes / 1_000_000).toFixed(1)} MB`;
}

export type Platform = 'macos' | 'windows' | 'linux';

const ARCH_LABEL: Record<Platform, Record<string, string>> = {
  macos: { arm64: 'Apple Silicon', x64: 'Intel' },
  windows: { arm64: 'arm64', x64: 'x64' },
  linux: { arm64: 'arm64', x64: 'x64' },
};

export type FileRow = { name: string; size: string; arch: string; url: string };

export function filesFor(release: Release, platform: Platform): FileRow[] {
  return release.assets
    .filter((a) => a.name.startsWith(`goop-${platform}-`))
    .map((a) => {
      const arch = a.name.split('-')[2].split('.')[0];
      return { name: a.name, size: formatSize(a.size), arch: ARCH_LABEL[platform][arch] ?? arch, url: a.url };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function checksumsUrl(release: Release): string {
  return release.assets.find((a) => a.name === 'SHA256SUMS')?.url ?? release.url;
}
