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
function matches(label: string, q: string) {
  let i = 0;
  for (const ch of label.toLowerCase()) if (ch === q[i]) i++;
  return i === q.length;
}

function filter() {
  const q = input.value.trim().toLowerCase();
  for (const r of rows) r.hidden = !matches(r.textContent ?? '', q);
  const list = visible();
  if (empty) empty.hidden = list.length > 0;
  if (list.length && !list.includes(activeRow()!)) select(idOf(list[0]));
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
  const quick = input.value === '' && (/^[1-9]$/.test(e.key) || e.key === '?');
  if (quick) {
    const target = e.key === '?' ? rows.find((r) => idOf(r) === 'shortcuts') : rows[Number(e.key) - 1];
    if (target) {
      e.preventDefault();
      select(idOf(target), { user: true });
      return;
    }
  }

  // Any other printable key starts filtering.
  if (!inInput && e.key.length === 1) input.focus();
});

for (const r of rows) {
  r.querySelector('a')!.addEventListener('click', (e) => {
    e.preventDefault();
    select(idOf(r), { user: true });
    if (!stacked.matches) input.focus();
  });
}

for (const btn of document.querySelectorAll<HTMLButtonElement>('[data-copy]')) {
  btn.addEventListener('click', async () => {
    const text = document.getElementById(btn.dataset.copy!)?.textContent ?? '';
    await navigator.clipboard.writeText(text.trim());
    const was = btn.textContent;
    btn.textContent = 'copied';
    setTimeout(() => (btn.textContent = was), 1200);
  });
}

const initial = location.hash.slice(1);
if (panels.some((p) => p.id === initial)) select(initial);
