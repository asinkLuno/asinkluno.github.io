import { useEffect, useState } from 'react';
import type { Project } from '../content';
import type { RepoMeta } from '../lib/github';
import { relativeDate } from '../lib/format';

type Props = { project: Project; meta?: RepoMeta };

const FILL: Record<Project['status'], string> = {
  released: 'bg-ok',
  building: 'bg-accent',
  planned: 'bg-muted',
};

export function ProjectCard({ project, meta }: Props) {
  const [entered, setEntered] = useState(false);
  const done = project.tasks.filter((t) => t.done).length;
  const total = project.tasks.length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const updated = meta?.pushedAt ?? project.updated;
  const rel = relativeDate(updated);
  const isFresh = rel === '今天' || rel === '昨天' || rel.includes('天前');

  useEffect(() => {
    const id = window.setTimeout(() => setEntered(true), 120);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <article className="-mx-2 border-b border-rule px-2 py-5 transition-colors last:border-b-0 hover:bg-track/40">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <a
          className="border-b border-rule font-mono text-[0.95rem] tracking-[-0.01em] no-underline hover:border-current hover:text-accent"
          href={project.link}
          target="_blank"
          rel="noreferrer"
        >
          {project.name}
        </a>
        {project.badge && (
          <span className="rounded-[2px] border border-rule px-1.5 py-px font-mono text-[0.65rem] tracking-[0.02em] text-muted">
            {project.badge}
          </span>
        )}
      </div>

      <p className="mt-2 text-[0.92rem] leading-[1.75] text-pretty">{project.desc}</p>

      <div
        className="mt-4 flex items-center gap-3"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
        aria-label={`${project.name} 进度：${done}/${total} 项完成，${pct}%`}
      >
        <div className="h-1 flex-1 overflow-hidden bg-track">
          <i
            className={`block h-full transition-[width] duration-[900ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none ${FILL[project.status]}`}
            style={{ width: entered ? `${pct}%` : 0 }}
          />
        </div>
        <span className="flex shrink-0 gap-1.5 whitespace-nowrap font-mono text-[0.68rem] text-muted tabular-nums">
          {done}/{total}
          <span className="text-ink">{pct}%</span>
        </span>
      </div>

      <ul className="mt-3 list-none space-y-0 p-0 text-[0.84rem] leading-[1.9]">
        {project.tasks.map((task) => (
          <li key={task.text} className={`flex gap-2 ${task.done ? 'text-muted' : 'text-ink'}`}>
            <span
              aria-hidden="true"
              className={`w-[1em] shrink-0 font-mono text-[0.8em] ${task.done ? 'text-ok' : 'text-accent'}`}
            >
              {task.done ? '✓' : '○'}
            </span>
            {task.text}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap items-baseline gap-x-1.5 font-mono text-[0.68rem] tracking-[0.01em] text-muted">
        <span>{project.lang}</span>
        <span className="text-rule">·</span>
        <span className={isFresh ? 'text-accent' : undefined}>更新于 {rel}</span>
        {project.demo && (
          <>
            <span className="text-rule">·</span>
            <a
              className="text-muted no-underline hover:text-accent"
              href={project.demo}
              target="_blank"
              rel="noreferrer"
            >
              打开 ↗
            </a>
          </>
        )}
      </div>
    </article>
  );
}
