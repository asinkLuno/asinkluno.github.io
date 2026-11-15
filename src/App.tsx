import { Board } from './components/Board';
import { projects, site } from './content';
import { useRepoMeta } from './lib/github';

const YEAR = new Date().getFullYear();
const count = (status: string) => projects.filter((p) => p.status === status).length;

export default function App() {
  const meta = useRepoMeta();

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <header className="flex flex-wrap items-baseline justify-between gap-4 border-b border-gray-200 pb-4 dark:border-gray-800">
          <h1 className="text-2xl font-semibold tracking-tight">{site.name}</h1>
          <nav className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
            <a className="hover:text-gray-900 dark:hover:text-gray-100" href={site.blog}>
              博客
            </a>
            <a className="hover:text-gray-900 dark:hover:text-gray-100" href={site.github}>
              GitHub
            </a>
          </nav>
        </header>

        <main className="py-8">
          <p className="mb-6 flex flex-wrap gap-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span>{count('building')} 个进行中</span>
            <span>{count('released')} 个已发布</span>
            <span>{count('planned')} 个计划中</span>
          </p>

          <Board meta={meta} />
        </main>

        <footer className="border-t border-gray-200 pt-4 text-xs text-gray-400 dark:border-gray-800 dark:text-gray-500">
          © {YEAR} {site.name}
        </footer>
      </div>
    </div>
  );
}
