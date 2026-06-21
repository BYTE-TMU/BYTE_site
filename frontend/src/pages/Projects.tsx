import { useState } from 'react'
import { getProjects } from '../lib/api'
import type { Project } from '../lib/types'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'

export default function Projects() {
  const projects = getProjects()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <main className="mx-auto max-w-7xl px-6 pt-40 pb-24">
      <div className="mb-12">
        <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">What We Build</p>
        <h1 className="text-5xl font-black tracking-tight md:text-7xl">Projects</h1>
        <p className="mt-4 text-lg text-muted">
          Real products built by BYTE members. We ship, iterate, and open-source everything we can.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
        ))}
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  )
}
