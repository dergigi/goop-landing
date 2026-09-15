---
name: Goop
description: A command palette, full-bleed. The landing page is the app.
colors:
  ink: "#0a080c"
  text: "#f4f2f6"
  white: "#ffffff"
  lilac: "#ead5f9"
  lilac-dim: "color-mix(in oklab, #ead5f9 72%, transparent)"
  lilac-faint: "color-mix(in oklab, #ead5f9 30%, transparent)"
  keycap-active: "#f3dafe"
  purple: "#6c4399"
  brand: "#8e4ec6"
typography:
  display:
    fontFamily: "Cascadia Code, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "2.125rem"
    fontWeight: 600
    lineHeight: 1
  title:
    fontFamily: "Cascadia Code, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "1.4375rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Cascadia Code, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Cascadia Code, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.5
  keycap:
    fontFamily: "Cascadia Code, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1
rounded:
  row: "0.25rem"
  chrome: "0.375rem"
  frame: "0.5rem"
  keycap: "0.4em"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "1.375rem"
  2xl: "1.875rem"
  3xl: "2.0625rem"
components:
  input-bar:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    typography: "{typography.display}"
    rounded: "{rounded.chrome}"
    padding: "0 1.875rem 0 0.9375rem"
    height: "4.625rem"
  command-row:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    typography: "{typography.title}"
    rounded: "{rounded.row}"
    padding: "0 0.8125rem 0 1.1875rem"
    height: "3.90625rem"
  command-row-active:
    backgroundColor: "{colors.purple}"
    textColor: "{colors.white}"
    typography: "{typography.title}"
    rounded: "{rounded.row}"
    padding: "0 0.8125rem 0 1.1875rem"
    height: "3.90625rem"
  keycap:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    typography: "{typography.keycap}"
    rounded: "{rounded.keycap}"
    padding: "0 0.4em"
    height: "2.05em"
    width: "3.05em"
  keycap-active:
    backgroundColor: "transparent"
    textColor: "{colors.keycap-active}"
    typography: "{typography.keycap}"
    rounded: "{rounded.keycap}"
    padding: "0 0.4em"
    height: "2.05em"
    width: "3.05em"
  file-row:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    typography: "{typography.title}"
    rounded: "0"
    padding: "0 1rem"
    height: "3.125rem"
  file-row-hover:
    backgroundColor: "transparent"
    textColor: "{colors.lilac}"
    typography: "{typography.title}"
    rounded: "0"
    padding: "0 1rem"
    height: "3.125rem"
  button-copy:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.chrome}"
    padding: "0.25rem 0.75rem"
  button-copy-hover:
    backgroundColor: "{colors.purple}"
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.chrome}"
    padding: "0.25rem 0.75rem"
  screenshot-frame:
    backgroundColor: "transparent"
    textColor: "{colors.lilac}"
    typography: "{typography.body}"
    rounded: "{rounded.frame}"
    height: "16.1875rem"
  prompt-box:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.frame}"
    padding: "1rem"
  status-bar:
    backgroundColor: "transparent"
    textColor: "{colors.lilac}"
    typography: "{typography.title}"
    rounded: "0"
    padding: "0 2.5rem 0 1.625rem"
    height: "3.625rem"
---

# Design System: Goop

## Overview

**Creative North Star: "The Fuzzy Finder"**

The Goop landing page is not a page about a keyboard-first client; it is one. The whole viewport is a command palette: an input bar across the top, a list of commands on the left with keycap hints, a preview pane on the right that answers whatever row is active, and an editor status bar along the bottom. Every word could be removed and the layout would still read as a finder. Visitors arrive already inside the app, with "Download for macOS" highlighted and its files listed.

The material is a single sheet of near-black ink divided by hairline rules. Nothing is lifted, glowing, or layered; the only filled shape on the screen is the active row, painted in the app's purple. One monospace family, Cascadia Code, carries every role from the headline to the status bar, because commands, file names, keycaps, and version strings are all the same kind of thing here. Type and spacing are set in rem against a root font-size that tracks the viewport, so the composition scales as one piece rather than reflowing.

Motion is the motion of a palette: the row highlight moves instantly, the preview crossfades in 120ms, the caret blinks. Nothing else animates. The direction contract refused the category default (centered headline, three platform buttons, floating screenshot with a glow, three-column feature grid), and the build holds that refusal.

**Key Characteristics:**
- One dark ground, one purple, one lilac, white text. Nothing else.
- Hairline rules divide; the active row is the only fill.
- Mono everywhere, tabular numerals on, weights 400 / 600 / 700 only.
- Keycaps are small bordered mono boxes, sized in em so they scale with their line.
- Rem sizing on a fluid root (16px at 1280 to 20px at 1600) so the palette scales as a single object.
- Live palette: arrows, Enter, Esc, digits, `?`, and typing all work; the preview swaps without layout shift.

## Colors

A monochrome purple world: near-black ink, pale lilac for everything secondary, one purple fill, and a slightly brighter brand purple reserved for the caret.

### Primary
- **Palette Purple** (`{colors.purple}`): the active row fill, text selection, `accent-color`, and the copy button's hover fill. It marks "this is selected" and nothing else.
- **Brand Purple** (`{colors.brand}`): the blinking caret in the input bar, and mixed at 18% into the keycap border. This is the app icon's purple; on the page it is a point, not an area.

### Neutral
- **Ink** (`{colors.ink}`): the single background. There are no surface tiers; panes, boxes, and the status bar all sit on the same ink.
- **Primary Text** (`{colors.text}`): headings, command labels, file names, the query, running text.
- **White** (`{colors.white}`): text and selection foreground on top of Palette Purple only.
- **Lilac** (`{colors.lilac}`): secondary text (taglines, file descriptions, signing notes, the status bar, hints, the screenshot placeholder), the caret color of the native input, the placeholder frame's dots, and file-row hover text.
- **Lilac Dim** (`{colors.lilac-dim}`): every hairline rule and border on the page, and link underlines. One value for all dividers.
- **Lilac Faint** (`{colors.lilac-faint}`): the scrollbar thumb and the "/" between alternative shortcuts. Present but receding.
- **Keycap Active** (`{colors.keycap-active}`): keycap text and border when the keycap sits inside the purple active row.

### Named Rules
**The One Fill Rule.** Palette Purple paints exactly one area at a time: the active row (or, on hover, the copy button). No second purple region may appear in the same view. Its rarity is what makes it read as the cursor.

**The Hairline Rule.** Every divider and outline is `1px solid` Lilac Dim, exposed as `--rule`. Panes, file rows, the input bar, the screenshot frame, the prompt box, and the status bar all share it. Do not introduce a second border color or weight.

**The Caret Rule.** Brand Purple appears as a line, never a fill: the caret, and a trace in the keycap border. Areas of purple are Palette Purple.

## Typography

**Display Font:** Cascadia Code (self-hosted variable woff2, weights 200 to 700, latin and latin-ext subsets, `font-display: swap`; fallbacks `ui-monospace`, SF Mono, Menlo, Consolas)
**Body Font:** Cascadia Code (same family)
**Label/Mono Font:** Cascadia Code (same family)

**Character:** One monospace voice for every role. Hierarchy comes from size and weight alone: 600 for the two headline-sized elements (query and panel heading), 700 for keycaps, 400 for everything else. `font-variant-numeric: tabular-nums` is on globally so versions, sizes, and shortcut columns line up. Command rows are tracked slightly tight (-0.01em).

The root font-size is `clamp(16px, 1.25vw, 20px)`, fixed at 16px below 980px. All type below is in rem against that root, so the desktop composition scales between 1280px and 1600px as one object.

### Hierarchy
- **Display** (600, 2.125rem, line-height 1): the panel heading (`h1`) and the query text in the input bar. Steps to 1.875rem below 1100px and 1.625rem below 980px.
- **Title** (400, 1.4375rem, line-height 1, -0.01em on rows): command rows, file rows, the tagline under a heading, the "esc to clear" hint, the "No matching command" state. The status bar sits a step under at 1.3125rem. Below 1100px rows are 1.0625rem and file rows 1.1875rem; below 980px rows and taglines are 1.125rem and file rows 1rem.
- **Body** (400, 1.25rem, line-height 1.45, max-width 62ch): running prose in a panel (`.more`), file descriptions, signing notes (line-height 1), the screenshot placeholder caption. Below 980px, 1rem.
- **Label** (400, 1.125rem, line-height 1.5): the agent prompt block, its header, and the copy button. Below 980px, 0.9375rem.
- **Keycap** (700, 1.25rem in the command list; 0.9375rem in the shortcut table; 0.875rem inline in prose; line-height 1): keycap glyphs and key names.

### Named Rules
**The One Voice Rule.** Cascadia Code is the only typeface. Do not add a display or grotesk face for headings; the heading is the same mono at 2.125rem / 600.

**The Two Weights Rule.** 600 is for the two display-size elements and 700 is for keycaps. Everything else is 400. Do not use 500, and do not bold inline for emphasis; use Lilac for de-emphasis instead.

## Layout

The page is one CSS grid filling `100dvh` (minimum 45rem): a top bar spanning both columns, a command list at 40.3% width, a preview pane taking the rest, and a status bar spanning both columns. The command list and preview scroll independently; the preview's lower 2.5rem fades out through a `mask-image` so overflowing content trails off instead of clipping against the status rule. The input bar floats inside a 0.75rem inset with the hairline border and the chrome radius; every other region is edge to edge and divided by rules.

Rhythm is rem-based. Component heights are fixed: input bar 4.625rem, command row 3.90625rem (with 0.15625rem / 0.1875rem vertical gap inside), file row 3.125rem, status bar 3.625rem. Horizontal insets run 1.1875rem (command list) and 1.875rem / 2.25rem (preview). Vertical stacking between panel blocks uses 1.1875rem after the heading, 1.25rem before a file list, 0.9375rem before a note, 1.125rem before the screenshot frame, and 1.375rem before prose or the prompt box. File and shortcut tables use `ch`-based column gaps (2.5ch on desktop, 1.5ch below 1100px) so gutters stay in step with the mono grid.

Responsive behavior, in order:
- **Below 1100px (narrow desktop):** the command column widens to 44%, row and file type step down one size, file name columns gain ellipsis so every label stays on one line.
- **`pointer: coarse`:** keycap hints in the command list are hidden; there is no keyboard to press them on.
- **Below 980px (phones and small tablets):** the grid becomes one column; the input bar shrinks to 3.75rem with a 2.5rem ghost, the command list sits first with a bottom rule instead of a right rule, the preview follows, and the status bar wraps to two lines and drops "? for shortcuts". The root font-size is fixed at 16px. Picking a command smooth-scrolls the preview into view.
- **Below 480px:** file rows wrap the file name onto its own line above size and architecture; link lists collapse to one column.

Density is high and even: the desktop list shows all eight commands and the preview shows heading, tagline, two file rows, note, and screenshot frame in a single 720px viewport without scrolling.

## Elevation & Depth

This system has no shadows and no tonal layering. Every surface is the same Ink; depth is conveyed by hairline rules alone, and selection is conveyed by the single Palette Purple fill. The screenshot frame and the agent prompt box are outlined with the same hairline, not raised. The only gradient on the page is a `mask-image` fade at the bottom edge of the scrolling preview; it is a scroll affordance, not a painted surface, and should not be read as permission for gradient backgrounds.

### Named Rules
**The Flat Sheet Rule.** No `box-shadow`, no background gradients, no translucent panels, no blur. If a region needs to read as a container, give it the hairline border and nothing else.

## Shapes

Corners are small and consistent. Rows and the focus ring use 0.25rem; the input bar and copy button use 0.375rem (`--radius`); the screenshot frame and prompt box, the two largest outlined shapes, use 0.5rem. Keycaps are the one em-sized shape: 0.4em radius, 3.05em minimum width, 2.05em height, with a 0.125rem border, so they stay proportioned at every text size they appear in. The screenshot placeholder carries three 0.625rem lilac circles in its top left, the only circles on the page and only present until a real screenshot replaces the frame. Borders are always 1px hairlines except the keycap's 0.125rem stroke. There is no clipping or angled geometry.

## Components

The component vocabulary is a fuzzy finder's: a query bar, rows, keycaps, a file table, a status bar. Character: instrument-like and quiet; every part is visibly the same material.

### Input Bar
- **Shape:** hairline border, chrome radius (0.375rem), 4.625rem tall, inset 0.75rem from the viewport on top and sides.
- **Contents:** the ghost mark (3.5rem, drawn in Primary Text), the query at Display size, a custom caret, and the "esc to clear" hint at Title size on the right.
- **Caret:** a `max(2px, 0.09em)` by 1.1em bar in Brand Purple, blinking on a 1.1s step timer whether or not the input has focus. The native caret is hidden and the input is sized with `ch` to its text so the custom caret sits exactly after the last character.
- **Focus:** no ring on the input itself; the bar is always the focus.

### Command Row
- **Shape:** 3.90625rem tall, row radius (0.25rem), label left and keycap right, single line with ellipsis.
- **Default:** transparent, Primary Text, Title size at -0.01em. There is no hover state; the pointer is not the cursor here.
- **Active:** Palette Purple fill, White text, keycap recolored to Keycap Active. The move is instant, no transition.
- **Behavior:** Up/Down cycle, digits 1 to 8 and `?` jump, typing filters by subsequence ("dlw" finds "Download for Windows"), Esc clears. Selecting also updates the URL hash so a panel can be linked directly and works without JavaScript via `:target`.

### Keycap
- **Shape:** inline-flex box, 3.05em minimum width, 2.05em tall, 0.4em radius, 0.125rem border in Lilac mixed 18% toward Brand Purple.
- **Type:** Keycap role (700). Names render as glyphs where the keyboard has one (↑ ↓ ↵ esc tab shift ,). "Mod" renders as an inline ⌘ SVG on macOS and "Ctrl" elsewhere, decided by `data-os` on `<html>`; without JavaScript both show separated by a slash.
- **Sizes:** 1.25rem in the command list, 0.9375rem in the shortcut table, 0.875rem inline in prose (`.key.inline`, vertically centered).
- **Hidden** on coarse pointers in the command list.

### File Row / Link Row
- **Shape:** a `ul` with a top hairline; each row is a 3.125rem tall link with a bottom hairline, 1rem horizontal padding, subgrid columns (name, size, architecture; or name and description for links). No radius.
- **Default:** Primary Text at Title size; descriptions in Lilac at Body size.
- **Hover:** the whole row's text turns Lilac. No background change.
- **Below 980px:** rows grow to fit, size/arch/desc drop to 0.875rem Lilac; below 480px the name takes its own line.

### Shortcut Table
- **Shape:** block list of rows with bottom hairlines, min-height 3.125rem, `max-content 1fr` columns with a 2.5ch gap.
- **Contents:** one or more keycap combos separated by a Lilac Faint "/", then the description at Body size. Below 980px, keys stack above the description.

### Copy Button
- **Shape:** the only button. Hairline border, chrome radius (0.375rem), 0.25rem by 0.75rem padding, Label size, transparent.
- **Hover:** Palette Purple fill, text unchanged. Click swaps the label to "copied" for 1.2s.

### Prompt Box
- **Shape:** hairline border, frame radius (0.5rem). A header strip (Lilac, Label size, 0.75rem by 1rem padding, bottom hairline) holding a caption and the copy button, then a `pre` at Label size, line-height 1.5, 1rem padding, wrapping.

### Screenshot Frame
- **Shape:** hairline border, frame radius (0.5rem), 16.1875rem tall (12.5rem below 980px) while empty; expands to fit the image when a real screenshot exists.
- **Placeholder:** three Lilac dots top-left and the word "screenshot" centered in Lilac at Body size. The dots and caption are placeholder only and leave with the image.

### Status Bar
- **Shape:** 3.625rem tall, top hairline, three columns (`1fr auto 1fr`), Lilac at 1.3125rem.
- **Contents:** version link left, protocol / license / platforms center, "? for shortcuts" right. Below 980px it wraps and drops the right slot.

### Links in Prose
- Underlined with `text-underline-offset: 0.1875rem`, underline in Lilac Dim, text inherits. File and link rows are not underlined.

### Focus Ring
- `0.125rem solid` Lilac outline, 0.125rem offset, 0.25rem radius, on every focusable element via `:focus-visible`. Visible focus is a requirement of this world, not a default left in place.

## Do's and Don'ts

### Do:
- **Do** paint selection with Palette Purple and White text, and only one selected thing at a time (The One Fill Rule).
- **Do** divide with `var(--rule)` (1px Lilac Dim) and nothing heavier; use the same hairline for outlines.
- **Do** set every size in rem against the fluid root (`clamp(16px, 1.25vw, 20px)`) so new regions scale with the palette.
- **Do** put keyboard hints in the keycap component, and make every hinted key actually work on the page.
- **Do** keep secondary information in Lilac at the Body or Label size rather than bolding the primary.
- **Do** keep the preview swap to a 120ms `ease-out` fade, honor `prefers-reduced-motion` by removing it and the caret blink, and let nothing else move.

### Don't:
- **Don't** add a second typeface; headings are Cascadia Code at 2.125rem / 600 (The One Voice Rule).
- **Don't** use shadows, gradient backgrounds, blur, or translucent panels (The Flat Sheet Rule).
- **Don't** introduce cards, tiles, or a feature grid; content lives in panels of hairline-ruled rows.
- **Don't** use Brand Purple as a fill; it is the caret and a trace in the keycap border (The Caret Rule).
- **Don't** add hover backgrounds to command rows; the active row is the only highlight, and it moves by keyboard or click.
- **Don't** fake a screenshot; the frame stays an outlined placeholder until a real image exists at `public/screenshots/<platform>.png`.
