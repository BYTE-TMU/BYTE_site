import type { TeamMember } from '../lib/types'
import { useInView } from '../hooks/useInView'

interface Props {
  members: TeamMember[]
}

const STAGGER_DELAYS = [
  '',
  'delay-100',
  'delay-200',
  'delay-300',
  'delay-[400ms]',
  'delay-500',
  'delay-[600ms]',
  'delay-700',
] as const

export default function TeamSection({ members }: Props) {
  const preview = members.slice(0, 8)
  const [headingRef, headingInView] = useInView()
  const [gridRef, gridInView] = useInView(0.1)

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div ref={headingRef} className="mb-12 flex items-end justify-between">
        <div className={`reveal ${headingInView ? 'visible' : ''}`}>
          <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">The Team</p>
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">Who We Are</h2>
        </div>
      </div>
      <div ref={gridRef} className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:grid-cols-8">
        {preview.map((member, i) => (
          <div
            key={member.id}
            className={`reveal ${STAGGER_DELAYS[i]} ${gridInView ? 'visible' : ''} flex flex-col items-center gap-3 group`}
          >
            <div className="relative">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="h-16 w-16 rounded-full border-2 border-[#222222] object-cover transition-all duration-200 group-hover:border-accent group-hover:scale-105"
              />
            </div>
            <div className="text-center">
              {member.linkedinUrl ? (
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm font-semibold text-white hover:text-accent transition-colors leading-tight"
                >
                  {member.name}
                </a>
              ) : (
                <p className="text-sm font-semibold text-white leading-tight">{member.name}</p>
              )}
              <p className="mt-0.5 font-mono text-[10px] tracking-wider text-muted uppercase">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
