import { useEffect } from 'react'
import type { Member } from '../lib/teamData'

interface Props {
  member: Member | null
  onClose: () => void
}

export default function MemberModal({ member, onClose }: Props) {
  useEffect(() => {
    if (!member) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [member, onClose])

  if (!member) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md border border-[#222222] bg-black p-8"
        onClick={e => e.stopPropagation()}
      >
        {/* close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 font-mono text-xs tracking-widest text-muted hover:text-white transition-colors"
        >
          ESC
        </button>

        {/* photo + name */}
        <div className="flex items-center gap-5 mb-6">
          <img
            src={member.profilePicUrl}
            alt={member.name}
            className="h-20 w-20 rounded-full border-2 border-accent object-cover shrink-0"
          />
          <div>
            <h3 className="text-xl font-black tracking-tight text-white">{member.name}</h3>
            <p className="font-mono text-xs tracking-widest text-accent uppercase mt-1">
              {member.position}
            </p>
          </div>
        </div>

        {/* description */}
        <p className="text-sm text-muted leading-relaxed mb-6">
          {member.roleDescription}
        </p>

        {/* links */}
        <div className="flex flex-col gap-2">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="font-mono text-xs tracking-widest text-muted hover:text-white transition-colors uppercase"
            >
              {member.email}
            </a>
          )}
          {member.linkedInUrl && (
            <a
              href={member.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-widest text-accent hover:text-white transition-colors uppercase"
            >
              LinkedIn →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}