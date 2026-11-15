import type { Project } from '../content';
import type { RepoMeta } from '../lib/github';
import { relativeDate } from '../lib/format';

type Props = { project: Project; meta?: RepoMeta };

export function ProjectCard({ project, meta }: Props) {
  const version = meta?.version ?? project.version;
  const updated = meta?.pushedAt ?? project.updated;
  // 自己写的语言标签比 GitHub 的主语言判断更准，优先用它
  const language = project.lang || meta?.language;

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700">
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-gray-900 hover:underline dark:text-gray-100"
        >
          {project.name}
        </a>
        {version && (
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            {version}
          </span>
        )}
      </div>

      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{project.desc}</p>

      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
        <span>{language}</span>
        <span>·</span>
        <span>更新于 {relativeDate(updated)}</span>
        {project.demo && (
          <>
            <span>·</span>
            <a href={project.demo} target="_blank" rel="noreferrer" className="hover:underline">
              打开
            </a>
          </>
        )}
      </div>
    </article>
  );
}
