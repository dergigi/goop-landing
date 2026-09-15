---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: []
---

# Surface: goop.dergigi.com landing page (src/pages/index.astro)

Scope: the single landing page. Visitor mode: Persuade.

Audience and job: Nostr users on desktop who live on the keyboard, arriving to find out what Goop is and get the build for their platform. Secondary hook: people running AI agents who want their agents to DM them.

Action: download the right build. Proof: the page itself behaves like the app (a real, keyboard-driven command palette), the honest release facts (version, file names, sizes, signing status, SHA256SUMS), the real shortcut list, and a slot for a real screenshot the user will provide.

Constraints: no invented claims, testimonials, or user counts. State limitations plainly (ad-hoc signed macOS, no Windows certificate, NIP-17 only, external signer required). Fully keyboard navigable with visible focus. Respect prefers-reduced-motion and prefers-color-scheme (dark is the primary scene). Lightweight: no framework runtime, minimal JS.

Approved comp: .impeccable/mocks/comp-b-finder.png (1280x720). Alternates not chosen: comp-a-centered.png, comp-c-split.png. Decision comp for the direction: .impeccable/mocks/decision/model-pick.png.

## Direction contract

THESIS: The landing page is the app's command palette, full-bleed. The visitor does not read about a keyboard-first client; they operate one. Refused: the category default of a centered headline, three platform buttons, a floating screenshot with a glow, and a three-column feature grid.

OWN-WORLD: One dark ink ground (#120D1A), one purple (#8E4EC6) used only for the active row and the caret, pale lilac (#EAD5F9) for rules, hints, and secondary text, white for primary text. Hairline 1px rules divide panes; no cards, no shadows, no gradients. Monospace is the working voice (commands, files, keycaps, status bar); a grotesk with a point of view sets the preview headings. Keycaps are small bordered mono boxes. Editor status bar along the bottom. With every word removed the page still reads as a fuzzy finder.

STORY: The visitor lands inside a finder already showing "Download for macOS" highlighted with its files, sizes, and honest signing note. They understand Goop is a native, keyboard-driven NIP-17 client because the page moves like one: arrow keys or typing filter the rows, the preview pane answers. They download, or read shortcuts, agents, or NIP-17, without leaving the palette.

FIRST VIEWPORT: Full-width input bar across the top (ghost mark, typed "goop", caret, "esc to clear"), 1px lilac rule beneath. Below, two panes: left ~40% the command list (Download for macOS/Windows/Linux, Keyboard shortcuts, Agents, Usage guide, Source, What is NIP-17?) with keycap hints, first row filled purple; right ~60% the preview: heading, tagline, two file rows with hairline rules, signing note, and a large outlined window frame reserved for the real screenshot. Bottom: 1px rule and status bar (goop v2.1.0 / NIP-17 · GPL-3.0 · macOS Windows Linux / ? for shortcuts). Primary action is the highlighted row and its file rows.

FORM: Command Palette, candidate 1 of 7 on the grounded list (IMPECCABLE'S PICK, chosen by the user over the assigned Boxed Software). Seed key 2e37f157. Signature interaction: the palette is live; Up/Down, Enter, Esc, typing to filter, and the number keys jump rows; the preview pane swaps content without layout shift. Motion grammar: instant row highlight, a 120ms preview crossfade, caret blink; nothing else moves.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
