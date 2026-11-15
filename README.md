# asinkLuno · 看板

一个纯文字的个人看板，用来展示在做的项目。React + Vite，构建成静态页面，发布在 GitHub Pages。

## 本地开发

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 产物在 dist/
npm run preview  # 预览构建结果
```

## 改内容

所有内容都在 `src/content.ts`：

- `projects`：每个项目的名称、状态（`released` / `building` / `planned`）、一句话说明、任务清单、链接。
- `columns`：三列看板的标题和副标题。
- `tasks`：卡片里的清单，勾上 `done: true` 就是完成。**进度条和 `done/total` 由这份清单算出来**，不用手填百分比。

「更新于」优先显示 GitHub API 返回的真实提交时间（`pushed_at`），拉不到或限流时退回到 `content.ts` 里手写的 `updated`。

## 发布

推送到 `main` 即触发 `.github/workflows/deploy.yml`，构建后发布到 GitHub Pages。

如果部署成**项目站点**（`username.github.io/repo/`），需要在构建时传子路径：

```bash
VITE_BASE_PATH=/repo/ npm run build
```

在 Actions 里则是给 build 步骤加 `env: VITE_BASE_PATH: /repo/`。
用户站点（`username.github.io`）保持默认 `/` 即可。
