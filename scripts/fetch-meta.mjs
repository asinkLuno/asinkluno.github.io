// 构建前抓一次 GitHub 元信息，写进 src/data/repos.json。
// 数据在构建时被内联进 bundle：运行时零请求，也就不吃匿名 API 60 次/小时的限流，
// 也不会有「先空着再跳出文案」的抖动。文件是提交进仓库的，CI 每次构建前刷新它。
import { execSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';

const OWNER = process.env.REPO_OWNER ?? 'asinkLuno';
const REPOS = (process.env.REPO_LIST ?? 'MusicDan,base6-techo,biocn-reader,img2pixelart')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

function token() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  try {
    return execSync('gh auth token', { encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
}

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'asinkluno-site',
};
const auth = token();
if (auth) headers.Authorization = `Bearer ${auth}`;

async function getJson(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    console.warn(`  ! ${res.status} ${url.split('/repos/')[1] ?? url}`);
    return null;
  }
  return res.json();
}

const out = {};

for (const repo of REPOS) {
  const base = `https://api.github.com/repos/${OWNER}/${repo}`;
  const [info, release] = await Promise.all([
    getJson(base),
    getJson(`${base}/releases/latest`),
  ]);

  // 版本号优先取 release，没有 release 再退到最新的 tag
  let version = release?.tag_name;
  let releasedAt = release?.published_at ?? null;
  if (!version) {
    const tags = await getJson(`${base}/tags?per_page=1`);
    version = tags?.[0]?.name;
  }
  if (version) {
    // base6-techo-v0.1.0 这种前缀去掉，只留 v0.1.0
    version = version.replace(new RegExp(`^${repo}[-@/]`, 'i'), '');
  }

  out[repo] = {
    description: info?.description?.trim() || null,
    homepage: info?.homepage?.trim() || null,
    language: info?.language ?? null,
    version: version ?? null,
    releasedAt,
    pushedAt: info?.pushed_at ?? null,
  };
  console.log(
    `${repo.padEnd(16)} ${(out[repo].version ?? '—').padEnd(10)} ${out[repo].language ?? '—'}` +
      `  pushed ${out[repo].pushedAt ?? '—'}  released ${releasedAt ?? '—'}`,
  );
}

mkdirSync('src/data', { recursive: true });
writeFileSync('src/data/repos.json', `${JSON.stringify(out, null, 2)}\n`);
console.log('→ src/data/repos.json');
