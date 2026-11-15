export type Project = {
  /** GitHub 仓库名，同时用来拼仓库地址 */
  id: string;
  name: string;
};

export const site = {
  name: 'asinkLuno',
  blog: 'https://asinkluno.github.io/asinkLuno/',
  github: 'https://github.com/asinkLuno',
};

/** 展示哪些仓库、叫什么名字。其余信息全部从 GitHub 读 */
export const projects: Project[] = [
  { id: 'MusicDan', name: 'MusicDan' },
  { id: 'base6-techo', name: 'base6-techo' },
  { id: 'biocn-reader', name: 'biocn-reader' },
  { id: 'img2pixelart', name: 'img2pixelart' },
];

export const repoUrl = (id: string) => `${site.github}/${id}`;
