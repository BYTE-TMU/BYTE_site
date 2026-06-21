import { useState } from 'react'
import { getEvents } from '../lib/api'
import type { Event } from '../lib/types'
import EventCard from '../components/EventCard'
import EventModal from '../components/EventModal'

export default function Events() {
  const events = getEvents()
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  return (
    <main className="mx-auto max-w-7xl px-6 pt-40 pb-24">
      <div className="mb-12">
        <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">What We Do</p>
        <h1 className="text-5xl font-black tracking-tight md:text-7xl">Events</h1>
        <p className="mt-4 text-lg text-muted">
          Workshops, hackathons, panels, and socials — there's always something happening at BYTE.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
        ))}
      </div>
      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </main>
  )
}
