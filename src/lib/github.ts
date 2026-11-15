import { useEffect, useState } from 'react';

export type RepoMeta = {
  /** 最近一次 push（ISO） */
  pushedAt?: string | null;
  /** GitHub 自己算的主语言 */
  language?: string | null;
  /** 最新 release 的 tag，没有 release 就退到最新 tag */
  version?: string | null;
};

const CACHE_KEY = 'repo-meta:v1';
const TTL = 30 * 60 * 1000;

function readCache(): Record<string, RepoMeta> {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    const cache = JSON.parse(raw) as { at: number; data: Record<string, RepoMeta> };
    return Date.now() - cache.at > TTL ? {} : cache.data;
  } catch {
    return {};
  }
}

/**
 * 版本号与更新时间来自构建时生成的 repo-meta.json（见 scripts/fetch-meta.mjs）。
 * 拿不到就用 content.ts 里手写的数据兜底。
 */
export function useRepoMeta() {
  const [meta, setMeta] = useState<Record<string, RepoMeta>>(readCache);

  useEffect(() => {
    const cached = readCache();
    if (Object.keys(cached).length > 0) return;

    let alive = true;
    fetch(`${import.meta.env.BASE_URL}repo-meta.json`, { cache: 'no-cache' })
      .then((res) => (res.ok ? (res.json() as Promise<Record<string, RepoMeta>>) : {}))
      .then((data) => {
        if (!alive || Object.keys(data).length === 0) return;
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
        setMeta(data);
      })
      .catch(() => {
        /* 本地没跑脚本就静默用兜底数据 */
      });

    return () => {
      alive = false;
    };
  }, []);

  return meta;
}
