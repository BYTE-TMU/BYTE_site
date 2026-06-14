import type { Event } from '../lib/types'

interface Props {
  event: Event
}

export default function EventCard({ event }: Props) {
  return (
    <article className="flex flex-col border border-[#222222] bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#3a3a3a]">
      <div className="mb-4 flex items-center gap-3">
        <span className="font-mono text-xs tracking-widest text-accent uppercase">
          {event.category}
        </span>
        <span className="text-[#333333]">·</span>
        <span className="font-mono text-xs tracking-widest text-muted uppercase">{event.date}</span>
      </div>
      <h3 className="mb-3 text-xl font-bold leading-tight text-white">{event.title}</h3>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-muted">{event.description}</p>
      {event.registrationUrl && (
        <a
          href={event.registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start border border-[#222222] px-4 py-2 font-mono text-xs tracking-widest text-white uppercase transition-colors hover:border-accent hover:text-accent"
        >
          Register →
        </a>
      )}
    </article>
  )
}
