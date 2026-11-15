const DAY = 86_400_000;

/** 2026-11-15 → 3 天前 / 今天 / 上个月 */
export function relativeDate(iso: string, now = Date.now()) {
  const then = Date.parse(`${iso}T00:00:00+08:00`);
  if (Number.isNaN(then)) return iso;
  const days = Math.max(0, Math.round((now - then) / DAY));
  if (days === 0) return '今天';
  if (days === 1) return '昨天';
  if (days < 7) return `${days} 天前`;
  if (days < 30) return `${Math.floor(days / 7)} 周前`;
  if (days < 365) return `${Math.floor(days / 30)} 个月前`;
  return `${Math.floor(days / 365)} 年前`;
}

/** 2026-09-07 → 2026.09.07 */
export function dotted(iso: string) {
  return iso.replaceAll('-', '.');
}
