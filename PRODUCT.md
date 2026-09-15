# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (static output), deployed on Vercel. Domain: goop.dergigi.com. Chosen by the user.

## Users

Nostr users on desktop who want a fast, keyboard-first client for private messages. They already hold a Nostr identity in an external signer (bunker, browser extension, or similar) and would rather hit a shortcut than reach for a mouse. Many of them are technical.

Secondary audience: people running AI agents (OpenClaw, Hermes, NullClaw) who want their agents to message them over NIP-17. This is a hook, not the lead.

## Product Purpose

Goop is a desktop client for NIP-17 private messaging on Nostr. It exists so that encrypted DMs and group chats on Nostr have a client that is fast, quiet, and reliable on macOS, Windows, and Linux. Success for a visitor of the landing page: they understand what Goop is within seconds, trust that it works, and download the build for their platform.

## Positioning

"A simple NIP-17 client that just works." Goop is Gigi's fork of Coop, built in Rust on GPUI (the same UI framework as the Zed editor). Every action has a keyboard shortcut and shortcuts are discoverable in the app. Messaging goes through NIP-17 gift wraps only; NIP-04 is not supported. Identity login requires an external signer, so Goop never holds a plain secret key.

## Operating Context

- Native desktop app, no web or mobile version.
- Downloads per platform from GitHub Releases: macOS (.dmg, arm64 and x64), Windows (.exe, arm64 and x64), Linux (.tar.gz, .flatpak, .snap, arm64 and x64). `SHA256SUMS` published with every release.
- Releases follow Semantic Versioning and Keep a Changelog. Releases come fast (2.1.0 to 2.3.0 within two days in September 2026); the page reads the latest release from the GitHub API at build time, never hardcodes it.
- Usage guide (keyboard shortcuts, agent setup) lives at https://dergigi.com/goop/ and must remain the canonical docs destination.
- Source: https://github.com/dergigi/goop. Upstream: https://git.reya.info/reya/coop.

## Capabilities and Constraints

Confirmed capabilities (from README and CHANGELOG):

- NIP-17 direct and group messaging with gift-wrapped events.
- Keyboard shortcuts for everything: `?` shortcut help, Cmd/Ctrl+K conversation and message search, Cmd/Ctrl+P profile search, Cmd/Ctrl+F find in chat, Cmd/Ctrl+N new chat, Cmd/Ctrl+1/2/3 inbox/requests/composer, tab management, relay and settings shortcuts.
- Message requests inbox for first contact.
- Encrypted attachments: per-file AES-256-GCM keys, uploaded to Blossom servers, keys sent only inside NIP-17 kind-15 messages (2.2.0).
- Resumable history backfill and rescans, per-recipient delivery tracking with retries.
- External signer login (bunker retained across sessions). No secret-key login, no identity backup.
- Light, Dark, and System themes.
- Native menus and an About dialog.

Constraints and honest limitations that copy must not contradict:

- NIP-04 is not supported.
- macOS bundles are ad-hoc signed and not notarized; Windows installers have no developer certificate. Users will see OS warnings on first launch.
- Local Snap packages need `snap install --dangerous --classic`.
- History coverage depends on what relays retain; "history checked" is not proof of complete history.
- Cross-client validation of encrypted attachments and groups is incomplete.
- Requires the user to already have a Nostr identity in a signer.

Terminology: NIP-17, gift wrap, npub, relay, signer, bunker, Blossom, Inbox, Requests.

## Brand Commitments

- Name: Goop. Lowercase in URLs, capitalized in prose.
- Mark: a dripping purple ghost blob (`assets/brand/goop.svg` in the goop repo; app icon is the white mark on purple `#8E4EC6`, rounded square). Light variant uses `#8145B5` on `#EAD5F9`.
- Tagline: "A simple NIP-17 client that just works."
- Voice: plain, direct, technical when needed, no hype. The README and changelog state limitations openly; the landing page keeps that honesty.
- Licensed GPL-3.0. Free software, no pricing, no accounts.
- Docs point to WhiteNoise as the alternative when NIP-17 is not enough. Keep that generosity.

## Evidence on Hand

- README.md and CHANGELOG.md in https://github.com/dergigi/goop (feature list, shortcuts, limitations).
- GitHub Releases API for the latest version, assets, and sizes.
- The usage guide at https://dergigi.com/goop/ (docs/index.md in the repo): agent guide marks OpenClaw as tested with Goop, Hermes and NullClaw as untested; NIP-17 keyboard shortcuts; the OpenClaw prompt verbatim.
- Brand SVG and app icons (PNG, ICNS, ICO) in the goop repo.
- Real app screenshots: none in the repo yet. The user will provide them; the page must have a clear slot for them and must not fake a screenshot as if it were real.
- No testimonials, user counts, or press. Do not invent any.

## Product Principles

- The download is the point. Every viewport should make getting Goop for your platform obvious.
- Show the keyboard. Shortcuts are the differentiator; make them visible and real, not decorative.
- Say what it does not do. Limitations stated plainly build more trust with this audience than polish does.
- One protocol, done well. NIP-17 only, and proud of it.
- Free software, free of friction. No signup, no tracking, no pricing table.

## Accessibility & Inclusion

Keyboard-first audience: the page itself must be fully keyboard navigable with visible focus states. Respect `prefers-reduced-motion` and `prefers-color-scheme`.
