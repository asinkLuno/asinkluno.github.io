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
    <div className={`grid gap-10 ${GRID[filled.length] ?? 'md:grid-cols-3'}`}>
      {filled.map((col) => (
        <section key={col.status}>
          <h2 className="border-b border-gray-200 pb-2 text-lg font-semibold">{col.title}</h2>

          <div className="mt-4 space-y-8">
            {col.items.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
