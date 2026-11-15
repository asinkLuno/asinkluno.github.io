/**
 * 看板数据。项目状态、任务清单都在这里改，push 之后自动发布。
 * progress 不手填：由 tasks 里的完成情况算出来，免得清单和进度条打架。
 */

export type Status = 'released' | 'building' | 'planned';

export type Task = { text: string; done: boolean };

export type Project = {
  id: string;
  name: string;
  status: Status;
  /** 一句话说明，卡片正文 */
  desc: string;
  /** 角标：版本号或阶段名 */
  badge?: string;
  lang: string;
  /** 最近更新日期，YYYY-MM-DD；运行时会被 GitHub 上的真实时间覆盖 */
  updated: string;
  tasks: Task[];
  link: string;
  demo?: string;
};

export const site = {
  name: 'asinkLuno',
  blog: 'https://asinkluno.github.io/asinkLuno/',
  github: 'https://github.com/asinkLuno',
};

export const columns: { status: Status; title: string }[] = [
  { status: 'released', title: '已发布' },
  { status: 'building', title: '进行中' },
  { status: 'planned', title: '计划中' },
];

export const projects: Project[] = [
  {
    id: 'MusicDan',
    name: 'MusicDan',
    status: 'released',
    badge: 'v0.1.4',
    desc: '网易云音乐的评论与歌词显示。',
    lang: 'TypeScript',
    updated: '2026-11-15',
    link: 'https://github.com/asinkLuno/MusicDan',
    demo: 'https://asinkluno.github.io/MusicDan/',
    tasks: [
      { text: '歌词逐行滚动与高亮', done: true },
      { text: '评论抓取与分页', done: true },
      { text: '弹幕渲染', done: true },
      { text: '发布到 GitHub Pages', done: true },
      { text: '移动端排版', done: false },
    ],
  },
  {
    id: 'base6-techo',
    name: 'base6-techo',
    status: 'building',
    desc: '基于 Tauri 2 + Tectonic 的 LaTeX 编辑/编译应用，桌面与 Android 真机都能跑。',
    lang: 'JavaScript / Rust',
    updated: '2026-11-12',
    link: 'https://github.com/asinkLuno/base6-techo',
    tasks: [
      { text: 'Tectonic 作为 Rust 依赖编入 Tauri', done: true },
      { text: 'vcpkg 交叉编译 HarfBuzz / FreeType / ICU（arm64-android）', done: true },
      { text: '离线宏包缓存：预热 → zip → 首启解压', done: true },
      { text: '真机 APK 跑通（无线调试）', done: true },
      { text: 'ICU 数据裁剪 33 MiB → 8.9 MiB', done: true },
      { text: '编辑器界面与 PDF 预览打磨', done: false },
      { text: '出第一个 release', done: false },
    ],
  },
  {
    id: 'biocn-reader',
    name: 'biocn-reader',
    status: 'building',
    badge: '重写中',
    desc: '把 bioCN 的仿生阅读搬进阅读器：EPUB 解析、分词着色、离线可读。',
    lang: 'TypeScript / Rust',
    updated: '2026-11-13',
    link: 'https://github.com/asinkLuno/biocn-reader',
    tasks: [
      { text: '确定重写方案：Tauri 2 + Android', done: true },
      { text: 'EPUB 解析与目录', done: false },
      { text: '接 HanLP / 断句规则做词组着色', done: false },
      { text: '阅读进度与书签', done: false },
      { text: 'Android 构建与打包', done: false },
    ],
  },
  {
    id: 'img2pixelart',
    name: 'img2pixelart',
    status: 'planned',
    desc: '把图片转成像素画。',
    lang: 'Python',
    updated: '2026-08-18',
    link: 'https://github.com/asinkLuno/img2pixelart',
    tasks: [
      { text: '调色板量化', done: true },
      { text: '抖动算法（Floyd–Steinberg / Bayer）', done: false },
    ],
  },
];
