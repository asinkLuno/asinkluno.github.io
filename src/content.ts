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
  /** 起始日期 */
  since: string;
  tasks: Task[];
  link: string;
  demo?: string;
  note?: string;
};

export const site = {
  name: 'asinkLuno',
  tagline: '一个写字的地方，也是一张没画完的板子。',
  blog: 'https://asinkluno.github.io/asinkLuno/',
  github: 'https://github.com/asinkLuno',
};

export const columns: { status: Status; title: string; hint: string }[] = [
  { status: 'released', title: '已发布', hint: '能用，还在修。' },
  { status: 'building', title: '正在做', hint: '今天还开着的那几个窗口。' },
  { status: 'planned', title: '搁着', hint: '想清楚了再动。' },
];

export const projects: Project[] = [
  {
    id: 'MusicDan',
    name: 'MusicDan',
    status: 'released',
    badge: 'v0.1.4',
    desc: '网易云音乐的评论与歌词显示，一个安静的播放器界面。',
    lang: 'TypeScript',
    updated: '2026-11-15',
    since: '2026-11-01',
    link: 'https://github.com/asinkLuno/MusicDan',
    demo: 'https://asinkluno.github.io/MusicDan/',
    note: 'v0.1.4 把弹幕样式修回来了。接下来是移动端的排版。',
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
    since: '2026-08-25',
    link: 'https://github.com/asinkLuno/base6-techo',
    note: 'Tectonic 已经编进 libapp.so，离线宏包缓存也跑通了。剩下是编辑器和排版手感。',
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
    since: '2026-11-09',
    link: 'https://github.com/asinkLuno/biocn-reader',
    note: 'main 刚重置成空分支，Tauri Android 重写从零开始——所以进度条很短，这是故意的。',
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
    desc: '把图片折成像素画。参数不多，但每一个都值得调。',
    lang: 'Python',
    updated: '2026-08-18',
    since: '2026-08-18',
    link: 'https://github.com/asinkLuno/img2pixelart',
    note: '想加一层抖动算法，一直没排上。',
    tasks: [
      { text: '调色板量化', done: true },
      { text: '抖动算法（Floyd–Steinberg / Bayer）', done: false },
    ],
  },
];
