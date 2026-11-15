import { Board } from './components/Board';
import { ThemeToggle } from './components/ThemeToggle';
import { site, projects } from './content';
import { useRepoMeta } from './lib/github';

const YEAR = new Date().getFullYear();

const count = (status: string) => projects.filter((p) => p.status === status).length;
const doneTasks = projects.reduce((n, p) => n + p.tasks.filter((t) => t.done).length, 0);
const allTasks = projects.reduce((n, p) => n + p.tasks.length, 0);

const navLink = 'text-muted no-underline hover:text-accent';

export default function App() {
  const meta = useRepoMeta('asinkLuno', projects.map((p) => p.id));

  return (
    <div className="mx-auto max-w-[76rem] px-6 py-8 md:px-10 md:py-12 lg:px-12">
      <header className="border-b border-rule pb-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h1 className="text-[1.45rem] leading-tight font-medium">{site.name}</h1>
          <nav className="flex items-baseline gap-5 font-mono text-[0.75rem] tracking-[0.02em]">
            <a className={navLink} href={site.blog}>
              博客
            </a>
            <a className={navLink} href={site.github}>
              GitHub
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main>
        <p className="my-6 flex flex-wrap gap-x-6 gap-y-1 border-y border-rule py-3 font-mono text-[0.72rem] tracking-[0.01em] text-muted">
          <span>
            <b className="font-normal text-ink tabular-nums">{count('building')}</b> 进行中
          </span>
          <span>
            <b className="font-normal text-ink tabular-nums">{count('released')}</b> 已发布
          </span>
          <span>
            <b className="font-normal text-ink tabular-nums">{count('planned')}</b> 计划中
          </span>
          <span>
            <b className="font-normal text-ink tabular-nums">
              {doneTasks}/{allTasks}
            </b>{' '}
            项任务
          </span>
        </p>

        <Board meta={meta} />
      </main>

      <footer className="mt-14 border-t border-rule pt-4">
        <p className="font-mono text-[0.7rem] tracking-[0.02em] text-muted">
          React + Vite · GitHub Pages · © {YEAR} {site.name}
        </p>
      </footer>
    </div>
  );
}
