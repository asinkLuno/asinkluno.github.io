import { columns, projects } from '../content';
import { ProjectCard } from './ProjectCard';

export function Board() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {columns.map((col) => {
        const items = projects.filter((p) => p.status === col.status);
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
              items.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            )}
          </section>
        );
      })}
    </div>
  );
}
