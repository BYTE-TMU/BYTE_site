import { useEffect } from 'react'
import type { Project } from '../lib/types'

interface Props {
  project: Project | null
  onClose: () => void
}

const STATUS_LABELS: Record<Project['status'], string> = {
  live: 'Live',
  'in dev': 'In Dev',
  archived: 'Archived',
}

const STATUS_DOT_COLORS: Record<Project['status'], string> = {
  live: 'bg-accent',
  'in dev': 'bg-yellow-400',
  archived: 'bg-[#444444]',
}

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [project, onClose])

  if (!project) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg border border-[#222222] bg-black p-8 animate-modal-in"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 font-mono text-xs tracking-widest text-muted hover:text-white transition-colors"
        >
          ESC
        </button>

        <div className="mb-2 flex items-center gap-2">
          {project.status === 'live' ? (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
          ) : (
            <span className={`h-2 w-2 rounded-full ${STATUS_DOT_COLORS[project.status]}`} />
          )}
          <span className="font-mono text-xs tracking-widest text-muted uppercase">
            {STATUS_LABELS[project.status]}
          </span>
        </div>

        <h2 className="mb-4 text-2xl font-black tracking-tight text-white leading-tight">
          {project.name}
        </h2>

        <p className="mb-6 text-sm leading-relaxed text-muted">{project.description}</p>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="border border-[#222222] px-2 py-0.5 font-mono text-[10px] tracking-widest text-muted uppercase"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-xs tracking-widest text-muted uppercase transition-colors hover:text-accent"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub →
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase transition-colors hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
