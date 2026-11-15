import { useEffect, useState } from 'react';

type Mode = 'auto' | 'light' | 'dark';

const ORDER: Mode[] = ['auto', 'light', 'dark'];
const LABEL: Record<Mode, string> = { auto: '自动', light: '浅', dark: '深' };
const ICON: Record<Mode, string> = { auto: '◐', light: '○', dark: '●' };

function systemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'light' || saved === 'dark' ? saved : 'auto';
  });

  useEffect(() => {
    const root = document.documentElement;
    const applyResolved = () => {
      root.dataset.theme = mode === 'auto' ? systemTheme() : mode;
    };

    applyResolved();
    if (mode === 'auto') localStorage.removeItem('theme');
    else localStorage.setItem('theme', mode);

    if (mode !== 'auto') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', applyResolved);
    return () => mq.removeEventListener('change', applyResolved);
  }, [mode]);

  return (
    <button
      type="button"
      onClick={() => setMode(ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length])}
      title={`主题：${LABEL[mode]}（点击切换）`}
      aria-label={`主题：${LABEL[mode]}，点击切换`}
      className="flex cursor-pointer items-baseline gap-1.5 border-0 bg-transparent p-0 font-mono text-[0.75rem] text-muted hover:text-accent"
    >
      <span aria-hidden="true">{ICON[mode]}</span>
      {LABEL[mode]}
    </button>
  );
}
