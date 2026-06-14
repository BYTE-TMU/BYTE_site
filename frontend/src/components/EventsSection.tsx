import { Link } from 'react-router-dom'
import type { Event } from '../lib/types'
import EventCard from './EventCard'
import { useInView } from '../hooks/useInView'

interface Props {
  events: Event[]
}

export default function EventsSection({ events }: Props) {
  const [headingRef, headingInView] = useInView()
  const [cardsRef, cardsInView] = useInView(0.1)

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div ref={headingRef} className={`reveal ${headingInView ? 'visible' : ''} mb-12 flex items-end justify-between`}>
        <div>
          <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">What We Do</p>
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">Events</h2>
        </div>
        <Link
          to="/events"
          className="hidden font-mono text-xs tracking-widest text-muted uppercase transition-colors hover:text-accent sm:block"
        >
          All Events →
        </Link>
      </div>
      <div ref={cardsRef} className="grid gap-4 md:grid-cols-3">
        {events.map((event, i) => (
          <div
            key={event.id}
            className={`reveal ${i === 1 ? 'delay-150' : i === 2 ? 'delay-300' : ''} ${cardsInView ? 'visible' : ''}`}
          >
            <EventCard event={event} />
          </div>
        ))}
      </div>
      <div className="mt-8 sm:hidden">
        <Link
          to="/events"
          className="font-mono text-xs tracking-widest text-muted uppercase transition-colors hover:text-accent"
        >
          All Events →
        </Link>
      </div>
    </section>
  )
}
