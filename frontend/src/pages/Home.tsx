import { getTeam, getEvents, getProjects } from '../lib/api'
import HeroSection from '../components/HeroSection'
import StatsTicker from '../components/StatsTicker'
import TeamSection from '../components/TeamSection'
import EventsSection from '../components/EventsSection'
import ImageCarousel from '../components/ImageCarousel'
import ProjectsSection from '../components/ProjectsSection'
import CTASection from '../components/CTASection'

export default function Home() {
  const team = getTeam()
  const events = getEvents(3)
  const projects = getProjects(2)

  return (
    <>
      <HeroSection />
      <StatsTicker />
      <TeamSection members={team} />
      <EventsSection events={events} />
      <ImageCarousel />
      <ProjectsSection projects={projects} />
      <CTASection />
    </>
  )
}
