import { Board } from './components/Board';
import { site } from './content';

const YEAR = new Date().getFullYear();

export default function App() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <header className="flex items-baseline justify-between gap-4">
        <h1 className="text-2xl font-bold">{site.name}</h1>
        <nav className="flex gap-4 text-sm">
          <a className="text-blue-600 hover:underline" href={site.blog}>
            博客
          </a>
          <a className="text-blue-600 hover:underline" href={site.github}>
            GitHub
          </a>
        </nav>
      </header>

      <main className="mt-10">
        <Board />
      </main>

      <footer className="mt-16 border-t border-gray-200 pt-4 text-sm text-gray-500">
        © {YEAR} {site.name}
      </footer>
    </div>
  );
}
