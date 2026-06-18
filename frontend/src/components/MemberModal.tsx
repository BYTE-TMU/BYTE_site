import { useEffect, useState } from 'react'
import type { Member } from '../lib/teamData'

interface Props {
  member: Member | null
  onClose: () => void
}

export default function MemberModal({ member, onClose }: Props) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!member) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [member, onClose])

  useEffect(() => { setCopied(false) }, [member])

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
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${member.email}`}
                className="font-mono text-xs tracking-widest text-muted hover:text-white transition-colors uppercase"
              >
                {member.email}
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(member.email!)
                  setCopied(true)
                }}
                aria-label={copied ? 'Copied' : 'Copy email'}
                title={copied ? 'Copied' : 'Copy email'}
                className="text-accent hover:text-white transition-colors shrink-0"
              >
                {copied ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </button>
            </div>
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