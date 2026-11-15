import raw from '../data/repos.json';

export type RepoMeta = {
  /** 仓库简介，来自 GitHub repo description */
  description?: string | null;
  /** 仓库主页链接，GitHub 的 homepage 字段 */
  homepage?: string | null;
  /** 最近一次 push（ISO） */
  pushedAt?: string | null;
  /** GitHub 自己算的主语言 */
  language?: string | null;
  /** 最新 release 的 tag，没有 release 就退到最新 tag */
  version?: string | null;
};

/**
 * 版本号、简介、主页、更新时间都来自构建时抓取的 GitHub 数据
 * （scripts/fetch-meta.mjs → src/data/repos.json），运行时不再发任何请求。
 */
export const repoMeta = raw as Record<string, RepoMeta>;
