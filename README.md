# goop-landing

Landing page for [Goop](https://github.com/dergigi/goop), a native NIP-17 client for you and your agents. Lives at [goop.dergigi.com](https://goop.dergigi.com).

The page is a command palette: arrow keys, digits, `?` and `Esc` drive the list, typing filters it. Built with Astro, static output, no framework runtime.

## Develop

```sh
pnpm install
pnpm dev       # http://localhost:4321
pnpm build     # static output in dist/
pnpm preview
```

Download links go through GitHub's `releases/latest/download/<file>` redirect, so they always serve the newest release without a rebuild. The version number and file sizes shown are fetched from the GitHub API at build time (hardcoded fallback in `src/lib/release.ts`) and can lag until the next deploy. Set `GITHUB_TOKEN` in the build environment to avoid the anonymous rate limit.

## Social preview

`public/og.png` is rendered from the `/og` route. With the dev server running, `pnpm og` regenerates it.

## Screenshots

Drop real app screenshots at `public/screenshots/macos.png`, `windows.png`, and `linux.png`. Each download panel shows its screenshot when the file exists and an outlined placeholder otherwise.

## Design

`PRODUCT.md` holds the product truth, `DESIGN.md` and `.impeccable/design.json` the design system as built. Both were produced with [impeccable](https://impeccable.style/).
