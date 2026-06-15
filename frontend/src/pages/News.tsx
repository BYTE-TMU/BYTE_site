import { useState } from 'react'
import { getAnnouncements } from '../lib/api'
import type { Announcement } from '../lib/types'
import AnnouncementModal from '../components/AnnouncementModal'

export default function News() {
  const announcements = getAnnouncements()
  const [selected, setSelected] = useState<Announcement | null>(null)

  return (
    <main className="mx-auto max-w-7xl px-6 pt-32 pb-24">
      <div className="mb-12">
        <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">Latest</p>
        <h1 className="text-5xl font-black tracking-tight md:text-7xl">News</h1>
        <p className="mt-4 text-lg text-muted">
          Updates, announcements, and stories from the BYTE community.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {announcements.map((announcement) => (
          <article
            key={announcement.id}
            className="flex flex-col h-full border border-[#222222] bg-surface cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-[#3a3a3a]"
            onClick={() => setSelected(announcement)}
          >
            {announcement.imageUrl && (
              <img
                src={announcement.imageUrl}
                alt={announcement.title}
                className="h-48 w-full object-cover"
              />
            )}
            <div className="flex flex-col flex-1 p-6">
              <p className="mb-3 font-mono text-xs tracking-widest text-muted uppercase">
                {announcement.date}
              </p>
              <h2 className="mb-3 text-xl font-bold leading-tight text-white">
                {announcement.title}
              </h2>
              <p className="text-sm leading-relaxed text-muted line-clamp-3">{announcement.body}</p>
            </div>
          </article>
        ))}
      </div>
      <AnnouncementModal announcement={selected} onClose={() => setSelected(null)} />
    </main>
  )
}
