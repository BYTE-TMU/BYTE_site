import { Link } from 'react-router-dom'
import type { Project } from '../lib/types'
import ProjectCard from './ProjectCard'
import { useInView } from '../hooks/useInView'

interface Props {
  projects: Project[]
}

export default function ProjectsSection({ projects }: Props) {
  const [headingRef, headingInView] = useInView()
  const [cardsRef, cardsInView] = useInView(0.1)

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div ref={headingRef} className={`reveal ${headingInView ? 'visible' : ''} mb-12 flex items-end justify-between`}>
        <div>
          <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">What We Build</p>
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">Projects</h2>
        </div>
        <Link
          to="/projects"
          className="hidden font-mono text-xs tracking-widest text-muted uppercase transition-colors hover:text-accent sm:block"
        >
          More Projects →
        </Link>
      </div>
      <div ref={cardsRef} className="grid gap-4 md:grid-cols-2">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className={`reveal ${i === 1 ? 'delay-150' : ''} ${cardsInView ? 'visible' : ''}`}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
      <div className="mt-8 sm:hidden">
        <Link
          to="/projects"
          className="font-mono text-xs tracking-widest text-muted uppercase transition-colors hover:text-accent"
        >
          More Projects →
        </Link>
      </div>
    </section>
  )
}
