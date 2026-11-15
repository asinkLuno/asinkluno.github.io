import type { Project } from '../content';
import { repoUrl } from '../content';
import { repoMeta } from '../lib/meta';
import { relativeDate } from '../lib/format';

type Props = { project: Project };

const chip =
  'inline-flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1 text-xs font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-950 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white';

export function ProjectCard({ project }: Props) {
  const meta = repoMeta[project.id];
  const description = meta?.description?.trim();
  const homepage = meta?.homepage?.trim();
  const version = meta?.version ?? project.version;
  const updated = meta?.pushedAt ?? project.updated;

  return (
    <article className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700">
      <div className="flex items-start justify-between gap-3">
        <h3 className="leading-snug font-semibold text-gray-900 dark:text-gray-100">
          {project.name}
        </h3>
        {version && (
          <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 font-mono text-[11px] text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            {version}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {description}
        </p>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
        <a className={chip} href={repoUrl(project.id)} target="_blank" rel="noreferrer">
          GitHub
          <span aria-hidden="true" className="text-[10px] opacity-60">
            ↗
          </span>
        </a>
        {homepage && (
          <a className={chip} href={homepage} target="_blank" rel="noreferrer">
            网站
            <span aria-hidden="true" className="text-[10px] opacity-60">
              ↗
            </span>
          </a>
        )}
      </div>

      <p className="mt-3 flex flex-wrap items-center gap-x-1.5 border-t border-gray-100 pt-2.5 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-500">
        <span>{project.lang}</span>
        <span aria-hidden="true">·</span>
        <span>更新于 {relativeDate(updated)}</span>
      </p>
    </article>
  );
}
