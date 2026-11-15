import { useEffect, useState } from 'react';
import type { Project } from '../content';
import type { RepoMeta } from '../lib/github';
import { relativeDate } from '../lib/format';

type Props = { project: Project; meta?: RepoMeta };

export function ProjectCard({ project, meta }: Props) {
  const [entered, setEntered] = useState(false);
  const done = project.tasks.filter((t) => t.done).length;
  const total = project.tasks.length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const updated = meta?.pushedAt ?? project.updated;
  const isNew = relativeDate(updated).includes('天') || relativeDate(updated) === '今天';

  useEffect(() => {
    const id = window.setTimeout(() => setEntered(true), 120);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <article className="card" data-status={project.status}>
      <div className="card-head">
        <a className="card-name" href={project.link} target="_blank" rel="noreferrer">
          {project.name}
        </a>
        {project.badge && <span className="badge">{project.badge}</span>}
      </div>

      <p className="card-desc">{project.desc}</p>

      <div
        className="progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
        aria-label={`${project.name} 进度：${done}/${total} 项完成，${pct}%`}
      >
        <div className="bar">
          <i style={{ width: entered ? `${pct}%` : 0 }} />
        </div>
        <span className="pct">
          {done}/{total}
          <span className="pct-num">{pct}%</span>
        </span>
      </div>

      <ul className="tasks">
        {project.tasks.map((task) => (
          <li key={task.text} data-done={task.done}>
            <span className="mark" aria-hidden="true">
              {task.done ? '✓' : '○'}
            </span>
            {task.text}
          </li>
        ))}
      </ul>


      <div className="card-meta">
        <span>{project.lang}</span>
        <span className="dot">·</span>
        <span className={isNew ? 'fresh' : undefined}>更新于 {relativeDate(updated)}</span>
        {project.demo && (
          <>
            <span className="dot">·</span>
            <a href={project.demo} target="_blank" rel="noreferrer">
              打开 ↗
            </a>
          </>
        )}
      </div>
    </article>
  );
}
