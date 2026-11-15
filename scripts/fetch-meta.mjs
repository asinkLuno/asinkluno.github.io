// 构建前抓一次 GitHub 元信息，产出 public/repo-meta.json。
// 这样页面本身是纯静态的：运行时不再调 api.github.com，也就不吃 60 次/小时的匿名限流。
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

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

  let version = release?.tag_name;
  if (!version) {
    const tags = await getJson(`${base}/tags?per_page=1`);
    version = tags?.[0]?.name;
  }

  out[repo] = {
    pushedAt: info?.pushed_at ?? null,
    language: info?.language ?? null,
    version: version ?? null,
  };
  console.log(`${repo.padEnd(16)} ${out[repo].version ?? '—'}  ${out[repo].pushedAt ?? '—'}`);
}

writeFileSync('public/repo-meta.json', `${JSON.stringify(out, null, 2)}\n`);
console.log('→ public/repo-meta.json');
