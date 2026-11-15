import type { Project } from '../content';
import { repoUrl } from '../content';
import { repoMeta } from '../lib/meta';
import { relativeDate } from '../lib/format';

type Props = { project: Project };

export function ProjectCard({ project }: Props) {
  const meta = repoMeta[project.id];
  const description = meta?.description?.trim();
  const homepage = meta?.homepage?.trim();
  const version = meta?.version?.trim();
  const language = meta?.language;
  const updated = meta?.pushedAt ?? meta?.releasedAt;

  return (
    <article>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-semibold">{project.name}</h3>
        {version && <span className="text-sm text-gray-500">{version}</span>}
      </div>

      {description && <p className="mt-1 text-gray-700">{description}</p>}

      <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-500">
        <a className="text-blue-600 hover:underline" href={repoUrl(project.id)} target="_blank" rel="noreferrer">
          GitHub
        </a>
        {homepage && (
          <a className="text-blue-600 hover:underline" href={homepage} target="_blank" rel="noreferrer">
            网站
          </a>
        )}
        {language && <span>{language}</span>}
        {updated && <span>更新于 {relativeDate(updated)}</span>}
      </p>
    </article>
  );
}
