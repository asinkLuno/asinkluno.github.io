import { Board } from './components/Board';
import { ThemeToggle } from './components/ThemeToggle';
import { site, projects } from './content';
import { useRepoMeta } from './lib/github';
import './styles.css';

const YEAR = new Date().getFullYear();

const count = (status: string) => projects.filter((p) => p.status === status).length;
const doneTasks = projects.reduce((n, p) => n + p.tasks.filter((t) => t.done).length, 0);
const allTasks = projects.reduce((n, p) => n + p.tasks.length, 0);

export default function App() {
  const meta = useRepoMeta('asinkLuno', projects.map((p) => p.id));

  return (
    <div className="page">
      <header className="site-head">
        <div className="head-row">
          <h1>{site.name}</h1>
          <nav className="head-nav">
            <a href={site.blog}>博客</a>
            <a href={site.github}>GitHub</a>
            <ThemeToggle />
          </nav>
        </div>
        <p className="tagline">{site.tagline}</p>
      </header>

      <main>
        <p className="lede">
          这里不写简历。板子上是 {projects.length} 件我自己要用的小东西——进度条不是 KPI，
          只是“这件事走到哪一步了”。
        </p>

        <p className="stats">
          <span>
            <b>{count('building')}</b> 在写
          </span>
          <span>
            <b>{count('released')}</b> 已发布
          </span>
          <span>
            <b>{count('planned')}</b> 搁着
          </span>
          <span>
            <b>
              {doneTasks}/{allTasks}
            </b>{' '}
            项任务
          </span>
        </p>

        <Board meta={meta} />
      </main>

      <footer className="site-foot">
        <p>
          板子是静态的：状态写在 <code>src/content.ts</code> 里，push 一次就更新。
          “更新于”优先取 GitHub 上的真实提交时间，拉不到就退回手写日期。
        </p>
        <p className="colophon">
          React + Vite，托管在 GitHub Pages · 无统计、无广告 · © {YEAR}{' '}
          {site.name}
        </p>
      </footer>
    </div>
  );
}
