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
      </header>

      <main>
        <p className="stats">
          <span>
            <b>{count('building')}</b> 进行中
          </span>
          <span>
            <b>{count('released')}</b> 已发布
          </span>
          <span>
            <b>{count('planned')}</b> 计划中
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
        <p className="colophon">
          React + Vite · GitHub Pages · © {YEAR} {site.name}
        </p>
      </footer>
    </div>
  );
}
