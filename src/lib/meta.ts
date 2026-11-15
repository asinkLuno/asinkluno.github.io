import raw from '../data/repos.json';

export type RepoMeta = {
  /** 仓库简介，来自 GitHub repo description */
  description?: string | null;
  /** 仓库主页链接，GitHub 的 homepage 字段 */
  homepage?: string | null;
  /** GitHub 自己算的主语言 */
  language?: string | null;
  /** 最新 release 的 tag，没有 release 就退到最新 tag */
  version?: string | null;
  /** 最新 release 的发布时间；没有 release 就是 null */
  releasedAt?: string | null;
  /** 最近一次 push（ISO） */
  pushedAt?: string | null;
};

/**
 * 版本号、简介、主页、语言、更新时间都来自构建时抓取的 GitHub 数据
 * （scripts/fetch-meta.mjs → src/data/repos.json），运行时不再发任何请求。
 */
export const repoMeta = raw as Record<string, RepoMeta>;

export type Status = 'planned' | 'building' | 'released';

/** 多久没提交就算凉了 */
const STALE_DAYS = 30;

/**
 * 状态不手填，由 GitHub 数据推出来：
 * 发过 release → 已发布；没发过但最近 30 天有提交 → 进行中；否则 → 计划中。
 */
export function statusOf(meta: RepoMeta | undefined, now = Date.now()): Status {
  if (meta?.releasedAt) return 'released';
  const pushed = meta?.pushedAt ? Date.parse(meta.pushedAt) : Number.NaN;
  if (!Number.isNaN(pushed) && now - pushed < STALE_DAYS * 86_400_000) return 'building';
  return 'planned';
}

/** 最近一次活动，用来在列里排序 */
export function activityAt(meta: RepoMeta | undefined, now = Date.now()): number {
  const pushed = meta?.pushedAt ? Date.parse(meta.pushedAt) : Number.NaN;
  if (!Number.isNaN(pushed)) return pushed;
  const released = meta?.releasedAt ? Date.parse(meta.releasedAt) : Number.NaN;
  return Number.isNaN(released) ? now : released;
}

/** GitHub 的语言色点 */
const LANGUAGE_COLOR: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572a5',
  Rust: '#dea584',
  Go: '#00add8',
  'C++': '#f34b7d',
  C: '#555555',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Lua: '#000080',
};

export function languageColor(language: string | null | undefined): string {
  return (language && LANGUAGE_COLOR[language]) || '#9ca3af';
}
