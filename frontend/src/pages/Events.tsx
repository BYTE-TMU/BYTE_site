import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getEvents } from '../lib/api'
import type { Event } from '../lib/types'
import EventCard from '../components/EventCard'
import EventModal from '../components/EventModal'
import Reveal from '../components/Reveal'

const COLUMNS = 3 // matches lg:grid-cols-3, the widest breakpoint's column count

export default function Events() {
  const navigate = useNavigate()
  const events = getEvents()
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  function handleEventClick(event: Event) {
    if (event.detailsPath) navigate(event.detailsPath)
    else setSelectedEvent(event)
  }

  return (
    <main className="mx-auto max-w-7xl px-6 pt-40 pb-24">
      <Reveal className="mb-12">
        <p className="neon-green-text mb-2 font-mono text-sm tracking-widest uppercase">What We Do</p>
        <h1 className="text-5xl font-black tracking-tight md:text-7xl">Events</h1>
        <p className="mt-4 text-lg text-muted">
          Workshops, hackathons, panels, and socials. There's always something happening at BYTE.
        </p>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event, i) => (
          <Reveal key={event.id} className="h-full" threshold={0.1} delayMs={(i % COLUMNS) * 150}>
            <EventCard event={event} onClick={() => handleEventClick(event)} />
          </Reveal>
        ))}
      </div>
      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </main>
  )
}
