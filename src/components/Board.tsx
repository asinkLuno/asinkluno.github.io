import { projects } from '../content';
import { activityAt, repoMeta, statusOf } from '../lib/meta';
import type { Status } from '../lib/meta';
import { ProjectCard } from './ProjectCard';

const COLUMNS: { status: Status; title: string }[] = [
  { status: 'planned', title: '计划中' },
  { status: 'building', title: '进行中' },
  { status: 'released', title: '已发布' },
];

const NOW = Date.now();

export function Board() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {COLUMNS.map((col) => {
        const items = projects
          .filter((p) => statusOf(repoMeta[p.id], NOW) === col.status)
          .sort((a, b) => activityAt(repoMeta[b.id], NOW) - activityAt(repoMeta[a.id], NOW));

        return (
          <section key={col.status} className="flex flex-col gap-3">
            <h2 className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
              {col.title}
              <span className="ml-2 font-normal text-gray-400 dark:text-gray-500">
                {items.length}
              </span>
            </h2>

            {items.length === 0 ? (
              <p className="rounded-lg border border-dashed border-gray-200 p-4 text-sm text-gray-400 dark:border-gray-800 dark:text-gray-600">
                暂无
              </p>
            ) : (
              items.map((project) => <ProjectCard key={project.id} project={project} />)
            )}
          </section>
        );
      })}
    </div>
  );
}
