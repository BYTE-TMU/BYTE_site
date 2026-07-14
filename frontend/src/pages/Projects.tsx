import { useNavigate } from 'react-router-dom'
import { getProjects } from '../lib/api'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'

const COLUMNS = 2 // matches md:grid-cols-2

export default function Projects() {
  const projects = getProjects()
  const navigate = useNavigate()

  return (
    <main className="mx-auto max-w-7xl px-6 pt-40 pb-24">
      <Reveal className="mb-12">
        <p className="neon-green-text mb-2 font-mono text-sm tracking-widest uppercase">What We Build</p>
        <h1 className="text-5xl font-black tracking-tight md:text-7xl">Projects</h1>
        <p className="mt-4 text-lg text-muted">
          Real products built by BYTE members. We ship, iterate, and open-source everything we can.
        </p>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.id} className="h-full" threshold={0.1} delayMs={(i % COLUMNS) * 150}>
            <ProjectCard project={project} onClick={() => navigate(`/projects/${project.slug}`)} />
          </Reveal>
        ))}
      </div>
    </main>
  )
}
