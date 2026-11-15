export type Status = 'planned' | 'building' | 'released';

export type Project = {
  id: string;
  name: string;
  status: Status;
  desc: string;
  version?: string;
  lang: string;
  updated: string;
  link: string;
  demo?: string;
};

export const site = {
  name: 'asinkLuno',
  blog: 'https://asinkluno.github.io/asinkLuno/',
  github: 'https://github.com/asinkLuno',
};

export const columns: { status: Status; title: string }[] = [
  { status: 'planned', title: '计划中' },
  { status: 'building', title: '进行中' },
  { status: 'released', title: '已发布' },
];

export const projects: Project[] = [
  {
    id: 'MusicDan',
    name: 'MusicDan',
    status: 'released',
    desc: '网易云音乐的评论与歌词显示。',
    version: 'v0.1.4',
    lang: 'TypeScript',
    updated: '2026-11-15',
    link: 'https://github.com/asinkLuno/MusicDan',
    demo: 'https://asinkluno.github.io/MusicDan/',
  },
  {
    id: 'base6-techo',
    name: 'base6-techo',
    status: 'building',
    desc: '基于 Tauri 2 + Tectonic 的 LaTeX 编辑/编译应用，桌面与 Android 真机都能跑。',
    version: 'v0.1.0',
    lang: 'JavaScript / Rust',
    updated: '2026-11-12',
    link: 'https://github.com/asinkLuno/base6-techo',
  },
  {
    id: 'biocn-reader',
    name: 'biocn-reader',
    status: 'building',
    desc: '把 bioCN 的仿生阅读搬进阅读器：EPUB 解析、分词着色、离线可读。',
    version: '重写中',
    lang: 'TypeScript / Rust',
    updated: '2026-11-13',
    link: 'https://github.com/asinkLuno/biocn-reader',
  },
  {
    id: 'img2pixelart',
    name: 'img2pixelart',
    status: 'planned',
    desc: '把图片转成像素画。',
    version: 'v0.2.0',
    lang: 'Python',
    updated: '2026-08-18',
    link: 'https://github.com/asinkLuno/img2pixelart',
  },
];
