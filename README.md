# asinkLuno · 看板

一个个人看板，用来展示在做的项目。React + Vite + Tailwind，构建成静态页面，发布在 GitHub Pages。

线上：https://asinkluno.github.io/

## 本地开发

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 产物在 dist/
npm run preview  # 预览构建结果
```

## 内容从哪来

`src/content.ts` 只剩下"展示哪些仓库、叫什么"：

- `projects`：仓库名（`id`，同时用来拼仓库地址）与显示名。
- `site`：站名、博客地址、GitHub 地址。

卡片上的一切都来自 GitHub 仓库本身：

- 简介 = 仓库的 `description`
- 网站 = 仓库的 `homepage`（没填就不显示）
- 语言 = `language`（带 GitHub 的语言色点）
- 版本号 = 最新 release 的 tag，没有 release 就退到最新 tag
- 更新时间 = `pushed_at`

想改卡片上的一句话，去改那个仓库的 About，不用动代码。

## 状态是算出来的

三列不由手填，`statusOf()` 按 GitHub 数据推：

- 发过 release → **已发布**
- 没发过 release，但最近 30 天有提交 → **进行中**
- 都没满足 → **计划中**

阈值在 `src/lib/meta.ts` 的 `STALE_DAYS`。列内按最近活动时间倒序，空列不显示。

## 版本号是构建时抓的

`scripts/fetch-meta.mjs` 在构建前把上面这些数据抓下来，写进 `src/data/repos.json`，构建时内联进 bundle。所以页面运行时**不发任何请求**，也不会被匿名 API 的 60 次/小时限流卡住。

```bash
node scripts/fetch-meta.mjs   # 需要 GITHUB_TOKEN，或本机 gh auth login
```

CI 里这个脚本用 `secrets.GITHUB_TOKEN`，每天 03:00 还有一次定时构建，顺手刷新版本号。`src/data/repos.json` 提交在仓库里，只为让本地不配 token 也能跑；CI 每次都会覆盖它。

## 发布

推送到 `main` 即触发 `.github/workflows/deploy.yml`，构建后发布到 GitHub Pages。

如果部署成**项目站点**（`username.github.io/repo/`），需要在构建时传子路径：

```bash
VITE_BASE_PATH=/repo/ npm run build
```

在 Actions 里则是给 build 步骤加 `env: VITE_BASE_PATH: /repo/`。用户站点（`username.github.io`）保持默认 `/` 即可。
