import { getEvents, getProjects } from '../lib/api'
import HeroSection from '../components/HeroSection'
import StatsTicker from '../components/StatsTicker'
import AboutSection from '../components/AboutSection.tsx'
import EventsSection from '../components/EventsSection'
import ProjectsSection from '../components/ProjectsSection'
import CTASection from '../components/CTASection'

export default function Home() {
  const events = getEvents(3)
  const projects = getProjects(2)

  return (
    <>
      <HeroSection />
      <StatsTicker />
      <AboutSection />
      <EventsSection events={events} />
      <ProjectsSection projects={projects} />
      <CTASection />
    </>
  )
}