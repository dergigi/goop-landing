export type Asset = { name: string; size: number; url: string };
export type Release = { version: string; publishedAt: string; url: string; assets: Asset[] };

const REPO = 'dergigi/goop';
// Assets resolve through GitHub's "latest" redirect, so links never go stale
// between builds. Version and sizes shown on the page are from build time.
const LATEST = `https://github.com/${REPO}/releases/latest`;
const download = (name: string) => `${LATEST}/download/${name}`;

// Used when the GitHub API is unreachable at build time (rate limits, offline).
const FALLBACK: Release = {
  version: '2.5.0',
  publishedAt: '2026-09-15T07:30:15Z',
  url: LATEST,
  assets: [
    { name: 'goop-linux-arm64.flatpak', size: 9119624, url: download('goop-linux-arm64.flatpak') },
    { name: 'goop-linux-arm64.snap', size: 15007744, url: download('goop-linux-arm64.snap') },
    { name: 'goop-linux-arm64.tar.gz', size: 25470197, url: download('goop-linux-arm64.tar.gz') },
    { name: 'goop-linux-x64.flatpak', size: 9367944, url: download('goop-linux-x64.flatpak') },
    { name: 'goop-linux-x64.snap', size: 15249408, url: download('goop-linux-x64.snap') },
    { name: 'goop-linux-x64.tar.gz', size: 26482722, url: download('goop-linux-x64.tar.gz') },
    { name: 'goop-macos-arm64.dmg', size: 8929518, url: download('goop-macos-arm64.dmg') },
    { name: 'goop-macos-x64.dmg', size: 9886785, url: download('goop-macos-x64.dmg') },
    { name: 'goop-windows-arm64.exe', size: 7159457, url: download('goop-windows-arm64.exe') },
    { name: 'goop-windows-x64.exe', size: 7585459, url: download('goop-windows-x64.exe') },
    { name: 'SHA256SUMS', size: 880, url: download('SHA256SUMS') },
  ],
};

export async function getRelease(): Promise<Release> {
  const token = process.env.GITHUB_TOKEN;
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'goop-landing',
        // Optional: lifts the 60 requests/hour anonymous limit on CI and Vercel.
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const json = await res.json();
    return {
      version: String(json.tag_name).replace(/^v/, ''),
      publishedAt: json.published_at,
      url: LATEST,
      assets: json.assets.map((a: any) => ({ name: a.name, size: a.size, url: download(a.name) })),
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
