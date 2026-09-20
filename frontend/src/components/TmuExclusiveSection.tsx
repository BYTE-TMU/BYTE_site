import { useInView } from '../hooks/useInView'

interface Props {
  live: boolean
  url: string
  discountLabel: string
  signUpUrl: string
}

const CTA_CLASS =
  'bg-accent px-8 py-3 font-mono text-sm tracking-widest text-black uppercase transition-opacity hover:opacity-80'

export default function TmuExclusiveSection({ live, url, discountLabel, signUpUrl }: Props) {
  const [ref, inView] = useInView(0.1)

  return (
    <section id="tmu" className="scroll-mt-24 border-t border-[#222222] py-24 px-6">
      <div ref={ref} className="mx-auto max-w-5xl">
        <div className={`reveal ${inView ? 'visible' : ''} border border-[#222222] bg-[#111111] p-12`}>
          {live ? (
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="neon-green-text mb-3 font-mono text-sm tracking-widest uppercase">
                  TMU Students · Exclusive
                </p>
                <h2 className="mb-4 text-3xl font-black tracking-tight md:text-4xl">
                  TMU Students Get {discountLabel}
                </h2>
                <p className="mb-6 max-w-xl leading-relaxed text-muted">
                  Toronto Metropolitan University students get {discountLabel} their Cyber Summit ticket through
                  this exclusive link. Two days of workshops, CTF challenges, and recruiting — on your campus, at a
                  student price.
                </p>
                <div className="inline-block border border-[#222222] px-5 py-2 font-mono text-xs tracking-widest text-muted uppercase">
                  ◈ &nbsp;Exclusive access ends October 1, 2026&nbsp; ◈
                </div>
              </div>
              <a href={url} target="_blank" rel="noopener noreferrer" className={`${CTA_CLASS} shrink-0`}>
                Claim TMU Discount
              </a>
            </div>
          ) : (
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="mb-3 font-mono text-sm tracking-widest text-muted uppercase">
                  TMU Students · Exclusive
                </p>
                <h2 className="mb-4 text-3xl font-black tracking-tight md:text-4xl">
                  TMU Exclusive Pricing Has Ended
                </h2>
                <p className="max-w-xl leading-relaxed text-muted">
                  The TMU-exclusive offer closed on October 1, 2026. General registration is still open.
                </p>
              </div>
              <a href={signUpUrl} target="_blank" rel="noopener noreferrer" className={`${CTA_CLASS} shrink-0`}>
                Register as Attendee
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
