/** ISO 日期 → 今天 / 昨天 / N 天前 / N 个月前 … */
export function relativeDate(iso: string, now = Date.now()): string {
  const then = new Date(`${iso.slice(0, 10)}T00:00:00+08:00`).getTime();
  if (Number.isNaN(then)) return iso;

  const days = Math.floor((now - then) / 86_400_000);
  if (days <= 0) return '今天';
  if (days === 1) return '昨天';
  if (days < 7) return `${days} 天前`;
  if (days < 30) return `${Math.floor(days / 7)} 周前`;
  if (days < 365) return `${Math.floor(days / 30)} 个月前`;
  return `${Math.floor(days / 365)} 年前`;
}
