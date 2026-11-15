import { columns, projects } from '../content';
import type { RepoMeta } from '../lib/github';
import { ProjectCard } from './ProjectCard';

type Props = { meta: Record<string, RepoMeta> };

export function Board({ meta }: Props) {
  return (
    <div className="grid grid-cols-1 border-t border-rule md:grid-cols-3 md:divide-x md:divide-rule">
      {columns.map((col) => {
        const items = projects.filter((p) => p.status === col.status);
        return (
          <section
            key={col.status}
            aria-label={col.title}
            className="border-b border-rule last:border-b-0 md:border-b-0 md:px-6 md:first:pl-0 md:last:pr-0"
          >
            <header className="border-b border-rule pt-5 pb-4">
              <h2 className="font-sans text-[0.8rem] font-semibold tracking-[0.18em]">
                {col.title}
                <sup className="ml-2 align-super font-mono text-[0.6rem] font-normal tracking-normal text-muted">
                  {items.length}
                </sup>
              </h2>
            </header>

            {items.length === 0 ? (
              <p className="py-5 text-[0.85rem] text-muted">空着。</p>
            ) : (
              items.map((project) => (
                <ProjectCard key={project.id} project={project} meta={meta[project.id]} />
              ))
            )}
          </section>
        );
      })}
    </div>
  );
}
