import { columns, projects } from '../content';
import type { RepoMeta } from '../lib/github';
import { ProjectCard } from './ProjectCard';

type Props = { meta: Record<string, RepoMeta> };

export function Board({ meta }: Props) {
  return (
    <div className="board">
      {columns.map((col) => {
        const items = projects.filter((p) => p.status === col.status);
        return (
          <section className="column" key={col.status} aria-label={col.title}>
            <header className="column-head">
              <h2>
                {col.title}
                <sup>{items.length}</sup>
              </h2>
              <p>{col.hint}</p>
            </header>

            {items.length === 0 ? (
              <p className="empty">空着。</p>
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
