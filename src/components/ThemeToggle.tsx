import { useEffect, useState } from 'react';

type Mode = 'auto' | 'light' | 'dark';

const ORDER: Mode[] = ['auto', 'light', 'dark'];
const LABEL: Record<Mode, string> = { auto: '自动', light: '浅', dark: '深' };

function apply(mode: Mode) {
  const root = document.documentElement;
  if (mode === 'auto') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', mode);
}

export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'light' || saved === 'dark' ? saved : 'auto';
  });

  useEffect(() => {
    apply(mode);
    if (mode === 'auto') localStorage.removeItem('theme');
    else localStorage.setItem('theme', mode);
  }, [mode]);

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setMode(ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length])}
      title={`主题：${LABEL[mode]}（点击切换）`}
      aria-label={`主题：${LABEL[mode]}，点击切换`}
    >
      <span aria-hidden="true">{mode === 'auto' ? '◐' : mode === 'light' ? '○' : '●'}</span>
      {LABEL[mode]}
    </button>
  );
}
