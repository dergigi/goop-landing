const input = document.getElementById('query') as HTMLInputElement;
const rows = [...document.querySelectorAll<HTMLLIElement>('.row')];
const panels = [...document.querySelectorAll<HTMLElement>('.panel')];
const empty = document.querySelector<HTMLElement>('.no-match');

const idOf = (row: HTMLLIElement) => row.querySelector('a')!.dataset.id!;
const visible = () => rows.filter((r) => !r.hidden);
const activeRow = () => rows.find((r) => r.classList.contains('active'));

const stacked = matchMedia('(max-width: 980px)');

function select(id: string, { focusPanel = false, user = false } = {}) {
  for (const r of rows) {
    const on = idOf(r) === id;
    r.classList.toggle('active', on);
    r.setAttribute('aria-selected', String(on));
    if (on) r.scrollIntoView({ block: 'nearest' });
  }
  for (const p of panels) p.hidden = p.id !== id;
  const preview = document.querySelector<HTMLElement>('.preview')!;
  preview.scrollTop = 0;
  // One column: bring the panel into view when the visitor picks a command.
  if (user && stacked.matches) preview.scrollIntoView({ behavior: 'smooth', block: 'start' });
  history.replaceState(null, '', `#${id}`);
  if (focusPanel) document.getElementById(id)?.querySelector<HTMLElement>('a, button')?.focus();
}

function move(delta: number) {
  const list = visible();
  if (!list.length) return;
  const i = list.indexOf(activeRow()!);
  select(idOf(list[(i + delta + list.length) % list.length]), { user: true });
}

// Subsequence match: "dlw" finds "Download for Windows".
function subsequence(text: string, q: string) {
  let i = 0;
  for (const ch of text) if (ch === q[i]) i++;
  return i === q.length;
}

// 2: the label contains the query or an alias ("help") starts with it,
// 1: the label matches as a subsequence, 0: no match.
function score(row: HTMLLIElement, q: string) {
  const a = row.querySelector('a')!;
  const label = (a.textContent ?? '').toLowerCase();
  const aliases = (a.dataset.alias ?? '').toLowerCase().split(' ');
  if (label.includes(q) || aliases.some((w) => w.startsWith(q))) return 2;
  return subsequence(label, q) ? 1 : 0;
}

function filter() {
  const q = input.value.trim().toLowerCase();
  const scores = new Map(rows.map((r) => [r, score(r, q)]));
  for (const r of rows) r.hidden = scores.get(r) === 0;
  const list = visible();
  if (empty) empty.hidden = list.length > 0;
  if (!list.length) return;
  // Follow the best hit while typing; with an empty query keep the current row.
  const best = list.reduce((a, b) => (scores.get(b)! > scores.get(a)! ? b : a));
  const current = activeRow();
  if (!current || !list.includes(current) || (q && scores.get(current)! < scores.get(best)!)) select(idOf(best));
}

// Monospace: the input is exactly as wide as its text, so the caret sits after it.
const fit = () => (input.style.width = `${Math.max(input.value.length, input.placeholder.length)}ch`);
fit();
// ch is measured on the fallback font until Cascadia arrives.
document.fonts.ready.then(fit);
input.addEventListener('input', () => {
  fit();
  filter();
});

document.addEventListener('keydown', (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const inInput = e.target === input;
  const typing = e.target instanceof HTMLElement && e.target.matches('textarea, [contenteditable]');
  if (typing) return;

  switch (e.key) {
    case 'ArrowDown':
    case 'ArrowUp':
      e.preventDefault();
      move(e.key === 'ArrowDown' ? 1 : -1);
      return;
    case 'Enter':
      if (inInput) {
        e.preventDefault();
        const a = activeRow();
        if (a) select(idOf(a), { focusPanel: true });
      }
      return;
    case 'Escape':
      e.preventDefault();
      input.value = '';
      filter();
      input.focus();
      return;
  }

  // Digits and ? jump straight to a command while the filter is empty.
  const quick = input.value === '' && (/^[0-9]$/.test(e.key) || e.key === '?');
  if (quick) {
    // 1-9 pick rows one to nine, 0 the tenth.
    const target = e.key === '?' ? rows.find((r) => idOf(r) === 'shortcuts') : rows[(Number(e.key) + 9) % 10];
    if (target) {
      e.preventDefault();
      select(idOf(target), { user: true });
      return;
    }
  }

  // Any other printable key starts filtering.
  if (!inInput && e.key.length === 1) input.focus();
});

// Any in-page link to a panel (command rows, footer) switches the palette.
document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
  if (!a) return;
  const id = a.hash.slice(1);
  if (!panels.some((p) => p.id === id)) return;
  e.preventDefault();
  select(id, { user: true });
  if (!stacked.matches) input.focus();
});

for (const btn of document.querySelectorAll<HTMLButtonElement>('[data-copy]')) {
  let resetTimer: ReturnType<typeof setTimeout>;
  btn.addEventListener('click', async () => {
    const text = document.getElementById(btn.dataset.copy!)?.textContent ?? '';
    try {
      await navigator.clipboard.writeText(text.trim());
      clearTimeout(resetTimer);
      btn.dataset.copied = '';
      btn.setAttribute('aria-label', 'Copied');
      btn.title = 'Copied';
      resetTimer = setTimeout(() => {
        delete btn.dataset.copied;
        btn.setAttribute('aria-label', 'Copy to clipboard');
        btn.title = 'Copy to clipboard';
      }, 1200);
    } catch {
      btn.setAttribute('aria-label', 'Copy failed. Try again');
      btn.title = 'Copy failed. Try again';
    }
  });
}

const initial = location.hash.slice(1);
if (panels.some((p) => p.id === initial)) select(initial);
