import { projects } from '../content';
import { activityAt, repoMeta, statusOf } from '../lib/meta';
import type { Status } from '../lib/meta';
import { ProjectCard } from './ProjectCard';

const COLUMNS: { status: Status; title: string }[] = [
  { status: 'planned', title: '计划中' },
  { status: 'building', title: '进行中' },
  { status: 'released', title: '已发布' },
];

// 空列不占位置，但列数一变就得换一套栅格类（Tailwind 不能拼类名）
const GRID: Record<number, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
};

const NOW = Date.now();

export function Board() {
  const filled = COLUMNS.map((col) => ({
    ...col,
    items: projects
      .filter((p) => statusOf(repoMeta[p.id], NOW) === col.status)
      .sort((a, b) => activityAt(repoMeta[b.id], NOW) - activityAt(repoMeta[a.id], NOW)),
  })).filter((col) => col.items.length > 0);

  return (
    <div className={`grid gap-6 ${GRID[filled.length] ?? 'md:grid-cols-3'}`}>
      {filled.map((col) => (
        <section key={col.status} className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
            {col.title}
            <span className="ml-2 font-normal text-gray-400 dark:text-gray-500">
              {col.items.length}
            </span>
          </h2>

          {col.items.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </section>
      ))}
    </div>
  );
}
