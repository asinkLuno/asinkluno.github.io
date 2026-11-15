export type Status = 'planned' | 'building' | 'released';

export type Project = {
  /** GitHub 仓库名，同时用来拼仓库地址 */
  id: string;
  name: string;
  status: Status;
  /** 自己写的语言标签比 GitHub 的主语言判断更准 */
  lang: string;
  /** GitHub 拿不到更新时间时的兜底（ISO） */
  updated: string;
  /** GitHub 拿不到版本号时的兜底 */
  version?: string;
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
    lang: 'TypeScript',
    updated: '2026-11-15',
    version: 'v0.1.4',
  },
  {
    id: 'base6-techo',
    name: 'base6-techo',
    status: 'building',
    lang: 'JavaScript / Rust',
    updated: '2026-11-12',
    version: 'v0.1.0',
  },
  {
    id: 'biocn-reader',
    name: 'biocn-reader',
    status: 'building',
    lang: 'TypeScript / Rust',
    updated: '2026-11-13',
    version: '重写中',
  },
  {
    id: 'img2pixelart',
    name: 'img2pixelart',
    status: 'planned',
    lang: 'Python',
    updated: '2026-08-18',
    version: 'v0.2.0',
  },
];

export const repoUrl = (id: string) => `${site.github}/${id}`;
