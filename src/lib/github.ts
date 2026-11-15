import { useEffect, useState } from 'react';

export type RepoMeta = {
  pushedAt?: string;
  language?: string;
  stars?: number;
  homepage?: string;
};

type Cache = Record<string, { at: number; meta: RepoMeta }>;

const CACHE_KEY = 'gh-meta:v1';
const TTL = 1000 * 60 * 30;

function readCache(): Cache {
  try {
    return JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? '{}') as Cache;
  } catch {
    return {};
  }
}

function writeCache(cache: Cache) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    /* 隐身模式下会失败，无所谓 */
  }
}

/**
 * 从 GitHub 拉每个仓库的最近提交时间 / 语言 / star。
 * 拉不到就用 content.ts 里手写的数据，看板不会因此空掉。
 */
export function useRepoMeta(owner: string, repos: string[]) {
  const [meta, setMeta] = useState<Record<string, RepoMeta>>(() => {
    const cache = readCache();
    const out: Record<string, RepoMeta> = {};
    const now = Date.now();
    for (const id of repos) {
      const hit = cache[id];
      if (hit && now - hit.at < TTL) out[id] = hit.meta;
    }
    return out;
  });

  useEffect(() => {
    const cache = readCache();
    const now = Date.now();
    const stale = repos.filter((id) => {
      const hit = cache[id];
      return !hit || now - hit.at >= TTL;
    });
    if (stale.length === 0) return;

    const controller = new AbortController();
    let alive = true;

    Promise.all(
      stale.map(async (id) => {
        const res = await fetch(`https://api.github.com/repos/${owner}/${id}`, {
          signal: controller.signal,
          headers: { Accept: 'application/vnd.github+json' },
        });
        if (!res.ok) throw new Error(`${id}: ${res.status}`);
        const json = (await res.json()) as {
          pushed_at?: string;
          language?: string | null;
          stargazers_count?: number;
          homepage?: string | null;
        };
        const meta: RepoMeta = {
          pushedAt: json.pushed_at?.slice(0, 10),
          language: json.language ?? undefined,
          stars: json.stargazers_count,
          homepage: json.homepage || undefined,
        };
        cache[id] = { at: now, meta };
        return [id, meta] as const;
      }),
    )
      .then((entries) => {
        if (!alive) return;
        writeCache(cache);
        setMeta((prev) => ({ ...prev, ...Object.fromEntries(entries) }));
      })
      .catch(() => {
        /* 限流、离线，都退回到本地数据 */
      });

    return () => {
      alive = false;
      controller.abort();
    };
    // repos 来自静态常量，只需跑一次
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [owner]);

  return meta;
}
