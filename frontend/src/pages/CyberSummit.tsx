import { useInView } from '../hooks/useInView'

interface ScheduleItem {
  time: string
  name: string
  desc: string
}

interface SponsorTier {
  name: string
  price: string
  color: string
  features: { label: string; value: string | boolean }[]
  highlight?: boolean
}

const PILLARS = [
  { icon: '◈', label: 'LEARN', desc: 'Workshops led by industry practitioners on real-world attack and defence techniques.' },
  { icon: '⬡', label: 'CONNECT', desc: 'Career fair and networking with Canada\'s top cybersecurity organizations.' },
  { icon: '◎', label: 'BUILD', desc: 'Capture the Flag challenges spanning cryptography, forensics, and web exploitation.' },
  { icon: '✦', label: 'CREATE', desc: 'Hands-on sessions where students design, prototype, and present security solutions.' },
]

const STATS = [
  { value: '1250+', label: 'Attendees Last Year' },
  { value: '4000+', label: 'Students in Community' },
  { value: '15+', label: 'Universities Represented' },
]

const DAY1: ScheduleItem[] = [
  { time: '9:00 AM',  name: 'Registration & Check-In',            desc: 'Pick up your badge and connect with fellow attendees' },
  { time: '10:00 AM', name: 'Opening Keynote',                    desc: 'Industry leader sets the stage for two days of exploration' },
  { time: '11:30 AM', name: 'Cybersecurity Workshops — Block 1',  desc: 'Hands-on sessions: web vulnerabilities, offensive tools, threat modelling' },
  { time: '1:00 PM',  name: 'Lunch & Career Fair',                desc: 'Meet recruiters from Canada\'s top cybersecurity organizations' },
  { time: '3:00 PM',  name: 'Cybersecurity Workshops — Block 2',  desc: 'Deep-dives into defensive security, forensics, and cloud security' },
  { time: '5:00 PM',  name: 'Networking Reception',               desc: 'Informal mixer with speakers, sponsors, and attendees' },
]

const DAY2: ScheduleItem[] = [
  { time: '9:30 AM',  name: 'Industry Panel',             desc: 'Professionals discuss careers, emerging threats, and red team operations' },
  { time: '11:00 AM', name: 'Capture the Flag Challenge', desc: 'Live CTF across crypto, forensics, web exploitation, and binary analysis' },
  { time: '1:00 PM',  name: 'Lunch Break',                desc: 'Recharge before the final push' },
  { time: '2:00 PM',  name: 'CTF Finals & Judging',       desc: 'Top teams compete for prizes as judges evaluate solutions' },
  { time: '3:30 PM',  name: 'Closing Keynote',            desc: 'Reflections on the summit and the future of cybersecurity' },
  { time: '5:00 PM',  name: 'Gala Dinner & Award Ceremony', desc: 'Celebrate top CTF teams and summit highlights' },
]

const MAJORS = [
  { label: 'Computer Science',    pct: 54.9 },
  { label: 'Business Technology', pct: 15.2 },
  { label: 'Computer Engineering', pct: 13.6 },
  { label: 'Other',               pct: 16.3 },
]

const YEARS = [
  { label: 'First Year',   pct: 20.1 },
  { label: 'Second Year',  pct: 27.7 },
  { label: 'Third Year',   pct: 22.8 },
  { label: 'Fourth Year',  pct: 19.0 },
  { label: 'Fifth Year+',  pct: 10.3 },
]

const PARTNERS = [
  'Toronto Metropolitan University',
  'Microsoft',
  'TCS',
  'BMO',
  'IBM',
  'Google',
  'Wealthsimple',
]

const TIERS: SponsorTier[] = [
  {
    name: 'BRONZE', price: '$500', color: 'text-orange-400',
    features: [
      { label: 'Sponsor Booth',         value: true  },
      { label: 'Access to Resumes',     value: false },
      { label: 'Workshop Host',         value: false },
      { label: 'Opening Speech',        value: false },
      { label: 'Social Post',           value: true  },
      { label: 'Logo on Assets',        value: false },
      { label: 'On-Site Visibility',    value: false },
      { label: '3D Logo Distribution',  value: '—'   },
      { label: 'Hotel Nights',          value: '—'   },
    ],
  },
  {
    name: 'SILVER', price: '$1,000', color: 'text-gray-300',
    features: [
      { label: 'Sponsor Booth',         value: true  },
      { label: 'Access to Resumes',     value: true  },
      { label: 'Workshop Host',         value: false },
      { label: 'Opening Speech',        value: false },
      { label: 'Social Post',           value: true  },
      { label: 'Logo on Assets',        value: true  },
      { label: 'On-Site Visibility',    value: false },
      { label: '3D Logo Distribution',  value: '—'   },
      { label: 'Hotel Nights',          value: '—'   },
    ],
  },
  {
    name: 'GOLD', price: '$2,500', color: 'text-yellow-400',
    features: [
      { label: 'Sponsor Booth',         value: true     },
      { label: 'Access to Resumes',     value: true     },
      { label: 'Workshop Host',         value: true     },
      { label: 'Opening Speech',        value: false    },
      { label: 'Social Post',           value: true     },
      { label: 'Logo on Assets',        value: true     },
      { label: 'On-Site Visibility',    value: true     },
      { label: '3D Logo Distribution',  value: 'Single' },
      { label: 'Hotel Nights',          value: '—'      },
    ],
  },
  {
    name: 'PLATINUM', price: '$5,000', color: 'text-white', highlight: true,
    features: [
      { label: 'Sponsor Booth',         value: true    },
      { label: 'Access to Resumes',     value: true    },
      { label: 'Workshop Host',         value: true    },
      { label: 'Opening Speech',        value: true    },
      { label: 'Social Post',           value: true    },
      { label: 'Logo on Assets',        value: true    },
      { label: 'On-Site Visibility',    value: true    },
      { label: '3D Logo Distribution',  value: 'Top 5' },
      { label: 'Hotel Nights',          value: '1'     },
    ],
  },
  {
    name: 'DIAMOND', price: '$8,000+', color: 'text-accent',
    features: [
      { label: 'Sponsor Booth',         value: true       },
      { label: 'Access to Resumes',     value: true       },
      { label: 'Workshop Host',         value: true       },
      { label: 'Opening Speech',        value: true       },
      { label: 'Social Post',           value: true       },
      { label: 'Logo on Assets',        value: true       },
      { label: 'On-Site Visibility',    value: true       },
      { label: '3D Logo Distribution',  value: '50 Models'},
      { label: 'Hotel Nights',          value: '4'        },
    ],
  },
]

const TIER_DELAYS = ['', 'delay-75', 'delay-150', 'delay-200', 'delay-300'] as const

function FeatureValue({ value }: { value: string | boolean }) {
  if (value === true)  return <span className="text-accent">✓</span>
  if (value === false) return <span className="text-[#333333]">—</span>
  return <span className="font-mono text-xs text-muted">{value}</span>
}

export default function CyberSummit() {
  const [heroRef,     heroInView]     = useInView(0.05)
  const [aboutRef,    aboutInView]    = useInView(0.1)
  const [statsRef,    statsInView]    = useInView(0.1)
  const [agendaRef,   agendaInView]   = useInView(0.05)
  const [demoRef,     demoInView]     = useInView(0.05)
  const [galleryRef,  galleryInView]  = useInView(0.1)
  const [partnersRef, partnersInView] = useInView(0.1)
  const [tiersRef,    tiersInView]    = useInView(0.03)
  const [ctaRef,      ctaInView]      = useInView(0.1)

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-16 text-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(74,222,128,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.025) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      >
        <div ref={heroRef} className="flex flex-col items-center">
          <p className={`reveal ${heroInView ? 'visible' : ''} mb-6 font-mono text-xs tracking-widest text-accent uppercase`}>
            TMU × BYTE Presents
          </p>
          <h1 className={`reveal delay-100 ${heroInView ? 'visible' : ''} mb-4 text-6xl font-black tracking-tight leading-none md:text-[9rem]`}>
            TMU CYBER<br />SUMMIT
          </h1>
          <p className={`reveal delay-200 ${heroInView ? 'visible' : ''} mb-6 max-w-lg text-lg text-muted`}>
            Toronto's Premier Student Cybersecurity Conference · Downtown Toronto
          </p>
          <div className={`reveal delay-300 ${heroInView ? 'visible' : ''} mb-10 border border-[#222222] px-5 py-2 font-mono text-xs tracking-widest text-muted uppercase`}>
            ◈ &nbsp;October 3 – 4, 2026&nbsp; ◈
          </div>
          <div className={`reveal delay-[400ms] ${heroInView ? 'visible' : ''} flex flex-col items-center gap-4 sm:flex-row`}>
            <a
              href="mailto:byte.tmu@gmail.com?subject=Cyber Summit - Attendee Interest"
              className="bg-accent px-8 py-3 font-mono text-sm tracking-widest text-black uppercase transition-opacity hover:opacity-80"
            >
              Register as Attendee
            </a>
            <a
              href="#sponsor-tiers"
              className="border border-[#444444] px-8 py-3 font-mono text-sm tracking-widest text-white uppercase transition-colors hover:border-accent hover:text-accent"
            >
              Become a Sponsor
            </a>
          </div>
        </div>

        {/* Hero image placeholder */}
        <div className={`reveal delay-500 ${heroInView ? 'visible' : ''} mt-16 w-full max-w-4xl border border-dashed border-[#222222] bg-[#111111] aspect-video flex flex-col items-center justify-center gap-3`}>
          <span className="text-4xl text-[#2a2a2a]">⬚</span>
          <p className="font-mono text-xs tracking-widest text-[#2a2a2a] uppercase">Hero Image Coming Soon</p>
        </div>
      </section>

      {/* ── What is TMU Cyber Summit? ── */}
      <section className="border-t border-[#222222] py-24 px-6">
        <div ref={aboutRef} className="mx-auto max-w-7xl">
          <p className={`reveal ${aboutInView ? 'visible' : ''} mb-4 font-mono text-xs tracking-widest text-accent uppercase`}>
            About the Summit
          </p>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className={`reveal delay-100 ${aboutInView ? 'visible' : ''} mb-6 text-4xl font-black tracking-tight md:text-5xl`}>
                What is TMU<br />Cyber Summit?
              </h2>
              <p className={`reveal delay-200 ${aboutInView ? 'visible' : ''} mb-4 leading-relaxed text-muted`}>
                TMU Cyber Summit is a two-day, student-led cybersecurity conference in downtown Toronto, connecting ambitious students and early career professionals with Canada's top cybersecurity organizations.
              </p>
              <p className={`reveal delay-300 ${aboutInView ? 'visible' : ''} leading-relaxed text-muted`}>
                The conference brings together workshops, panels, recruiting opportunities, technical challenges, and an exclusive closing gala — all organized by BYTE at Toronto Metropolitan University.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {PILLARS.map(({ icon, label, desc }, i) => (
                <div
                  key={label}
                  className={`reveal ${i === 0 ? 'delay-100' : i === 1 ? 'delay-200' : i === 2 ? 'delay-300' : 'delay-[400ms]'} ${aboutInView ? 'visible' : ''} border border-[#222222] bg-[#111111] p-6 transition-colors hover:border-accent`}
                >
                  <span className="mb-4 block font-mono text-2xl text-accent">{icon}</span>
                  <h3 className="mb-2 font-mono text-xs tracking-widest text-white uppercase">{label}</h3>
                  <p className="text-sm leading-relaxed text-muted">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Impact Stats ── */}
      <section className="border-t border-[#222222] py-24 px-6">
        <div ref={statsRef} className="mx-auto max-w-7xl">
          <p className={`reveal ${statsInView ? 'visible' : ''} mb-2 font-mono text-xs tracking-widest text-accent uppercase`}>
            TMU Tech Week Impact
          </p>
          <h2 className={`reveal delay-100 ${statsInView ? 'visible' : ''} mb-12 text-3xl font-black tracking-tight`}>
            Our Reach
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {STATS.map(({ value, label }, i) => (
              <div
                key={label}
                className={`reveal ${i === 1 ? 'delay-150' : i === 2 ? 'delay-300' : ''} ${statsInView ? 'visible' : ''} border border-[#222222] bg-[#111111] p-8 text-center`}
              >
                <p className="mb-2 text-5xl font-black text-accent">{value}</p>
                <p className="font-mono text-xs tracking-widest text-muted uppercase">{label}</p>
              </div>
            ))}
          </div>
          <p className={`reveal delay-300 ${statsInView ? 'visible' : ''} mt-4 text-center text-xs text-muted`}>
            Stats from TMU Tech Week — the flagship event series organized by BYTE
          </p>
        </div>
      </section>

      {/* ── 2-Day Agenda ── */}
      <section className="border-t border-[#222222] py-24 px-6">
        <div ref={agendaRef} className="mx-auto max-w-7xl">
          <p className={`reveal ${agendaInView ? 'visible' : ''} mb-2 font-mono text-xs tracking-widest text-accent uppercase`}>
            The Experience
          </p>
          <h2 className={`reveal delay-100 ${agendaInView ? 'visible' : ''} mb-12 text-3xl font-black tracking-tight`}>
            2-Day Summit Agenda
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <div className={`reveal delay-200 ${agendaInView ? 'visible' : ''} border border-[#222222] bg-[#111111] p-8`}>
              <p className="mb-1 font-mono text-xs tracking-widest text-muted uppercase">Day 1</p>
              <h3 className="mb-8 text-xl font-black text-accent tracking-tight">Learn &amp; Connect</h3>
              <ul className="space-y-6">
                {DAY1.map((item) => (
                  <li key={item.name} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
                      <span className="mt-1 w-px flex-1 bg-[#222222]" />
                    </div>
                    <div className="pb-2">
                      <p className="mb-0.5 font-mono text-xs text-muted">{item.time}</p>
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="mt-0.5 text-sm text-muted">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`reveal delay-300 ${agendaInView ? 'visible' : ''} border border-[#222222] bg-[#111111] p-8`}>
              <p className="mb-1 font-mono text-xs tracking-widest text-muted uppercase">Day 2</p>
              <h3 className="mb-8 text-xl font-black text-accent tracking-tight">Build &amp; Celebrate</h3>
              <ul className="space-y-6">
                {DAY2.map((item) => (
                  <li key={item.name} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
                      <span className="mt-1 w-px flex-1 bg-[#222222]" />
                    </div>
                    <div className="pb-2">
                      <p className="mb-0.5 font-mono text-xs text-muted">{item.time}</p>
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="mt-0.5 text-sm text-muted">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── Demographics ── */}
      <section className="border-t border-[#222222] py-24 px-6">
        <div ref={demoRef} className="mx-auto max-w-7xl">
          <p className={`reveal ${demoInView ? 'visible' : ''} mb-2 font-mono text-xs tracking-widest text-accent uppercase`}>
            Why Partner With Us
          </p>
          <h2 className={`reveal delay-100 ${demoInView ? 'visible' : ''} mb-4 text-3xl font-black tracking-tight`}>
            Our Demographic
          </h2>
          <p className={`reveal delay-200 ${demoInView ? 'visible' : ''} mb-12 max-w-2xl text-muted leading-relaxed`}>
            TMU Cyber Summit gives partners direct access to a highly engaged, diverse technical talent pool — designed for authentic recruiting conversations and long-term relationship building.
          </p>

          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { value: '100+', label: 'Students per Summit' },
              { value: '84%',  label: 'Majors with Tech Expertise' },
              { value: '80%',  label: 'Ready for Real-World Tech' },
            ].map(({ value, label }, i) => (
              <div
                key={label}
                className={`reveal ${i === 1 ? 'delay-150' : i === 2 ? 'delay-300' : ''} ${demoInView ? 'visible' : ''} border border-[#222222] bg-[#111111] p-6 text-center`}
              >
                <p className="mb-1 text-4xl font-black text-accent">{value}</p>
                <p className="font-mono text-xs tracking-widest text-muted uppercase">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className={`reveal delay-[400ms] ${demoInView ? 'visible' : ''} border border-[#222222] bg-[#111111] p-8`}>
              <h3 className="mb-6 font-mono text-xs tracking-widest text-white uppercase">Major Breakdown</h3>
              <ul className="space-y-4">
                {MAJORS.map(({ label, pct }) => (
                  <li key={label}>
                    <div className="mb-1 flex justify-between">
                      <span className="text-sm text-muted">{label}</span>
                      <span className="font-mono text-xs text-accent">{pct}%</span>
                    </div>
                    <div className="h-px w-full bg-[#222222]">
                      <div
                        className="h-px bg-accent transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`reveal delay-500 ${demoInView ? 'visible' : ''} border border-[#222222] bg-[#111111] p-8`}>
              <h3 className="mb-6 font-mono text-xs tracking-widest text-white uppercase">Year of Study</h3>
              <ul className="space-y-4">
                {YEARS.map(({ label, pct }) => (
                  <li key={label}>
                    <div className="mb-1 flex justify-between">
                      <span className="text-sm text-muted">{label}</span>
                      <span className="font-mono text-xs text-accent">{pct}%</span>
                    </div>
                    <div className="h-px w-full bg-[#222222]">
                      <div
                        className="h-px bg-accent transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Event Gallery Placeholder ── */}
      <section className="border-t border-[#222222] py-24 px-6">
        <div ref={galleryRef} className="mx-auto max-w-7xl">
          <p className={`reveal ${galleryInView ? 'visible' : ''} mb-2 font-mono text-xs tracking-widest text-accent uppercase`}>
            Event Gallery
          </p>
          <h2 className={`reveal delay-100 ${galleryInView ? 'visible' : ''} mb-12 text-3xl font-black tracking-tight`}>
            From the Summit Floor
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`reveal ${i === 1 ? 'delay-150' : i === 2 ? 'delay-300' : ''} ${galleryInView ? 'visible' : ''} aspect-video border border-dashed border-[#222222] bg-[#111111] flex flex-col items-center justify-center gap-3`}
              >
                <span className="text-3xl text-[#2a2a2a]">⬚</span>
                <p className="font-mono text-xs tracking-widest text-[#2a2a2a] uppercase">Photo Coming Soon</p>
              </div>
            ))}
          </div>
          <p className={`reveal delay-300 ${galleryInView ? 'visible' : ''} mt-6 text-center text-xs text-muted`}>
            — Summit photos will appear here after the event —
          </p>
        </div>
      </section>

      {/* ── Previous Partners ── */}
      <section className="border-t border-[#222222] py-24 px-6">
        <div ref={partnersRef} className="mx-auto max-w-7xl">
          <p className={`reveal ${partnersInView ? 'visible' : ''} mb-2 font-mono text-xs tracking-widest text-accent uppercase`}>
            Community Support
          </p>
          <h2 className={`reveal delay-100 ${partnersInView ? 'visible' : ''} mb-12 text-3xl font-black tracking-tight`}>
            Previous Partners
          </h2>
          {/* Replace text with <img> tags once logo assets are supplied */}
          <div className={`reveal delay-200 ${partnersInView ? 'visible' : ''} grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7`}>
            {PARTNERS.map((name) => (
              <div
                key={name}
                className="border border-[#222222] bg-[#111111] flex items-center justify-center p-6 text-center transition-colors hover:border-accent"
              >
                <span className="font-bold text-sm leading-tight text-muted">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sponsorship Tiers ── */}
      <section id="sponsor-tiers" className="border-t border-[#222222] py-24 px-6">
        <div ref={tiersRef} className="mx-auto max-w-7xl">
          <p className={`reveal ${tiersInView ? 'visible' : ''} mb-2 font-mono text-xs tracking-widest text-accent uppercase`}>
            Partnership Packages
          </p>
          <h2 className={`reveal delay-100 ${tiersInView ? 'visible' : ''} mb-4 text-3xl font-black tracking-tight`}>
            Sponsorship Tiers
          </h2>
          <p className={`reveal delay-200 ${tiersInView ? 'visible' : ''} mb-12 max-w-2xl text-muted leading-relaxed`}>
            Every tier includes direct access to an engaged technical talent pool. Custom packages are available upon request.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {TIERS.map((tier, i) => (
              <div
                key={tier.name}
                className={`reveal ${TIER_DELAYS[i]} ${tiersInView ? 'visible' : ''} flex flex-col border bg-[#111111] p-6 transition-colors hover:border-[#444444] ${
                  tier.highlight
                    ? 'border-accent ring-1 ring-accent ring-offset-1 ring-offset-black'
                    : 'border-[#222222]'
                }`}
              >
                {tier.highlight && (
                  <p className="mb-3 font-mono text-xs tracking-widest text-accent uppercase">Most Popular</p>
                )}
                <p className={`mb-1 font-mono text-xs tracking-widest uppercase ${tier.color}`}>{tier.name}</p>
                <p className="mb-6 text-3xl font-black text-white">{tier.price}</p>
                <ul className="flex-1 space-y-3">
                  {tier.features.map(({ label, value }) => (
                    <li key={label} className="flex items-center justify-between gap-2">
                      <span className="text-xs text-muted">{label}</span>
                      <FeatureValue value={value} />
                    </li>
                  ))}
                </ul>
                <a
                  href={`mailto:byte.tmu@gmail.com?subject=Cyber Summit Sponsorship - ${tier.name}`}
                  className="mt-8 block border border-[#333333] py-2 text-center font-mono text-xs tracking-widest text-muted uppercase transition-colors hover:border-accent hover:text-accent"
                >
                  Inquire
                </a>
              </div>
            ))}
          </div>

          <p className={`reveal delay-300 ${tiersInView ? 'visible' : ''} mt-8 text-center font-mono text-xs text-muted`}>
            Custom sponsorship packages are available upon request · byte.tmu@gmail.com
          </p>
        </div>
      </section>

      {/* ── Dual CTA ── */}
      <section className="border-t border-[#222222] py-32 px-6">
        <div ref={ctaRef} className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-px border border-[#222222] md:grid-cols-2">
            <div className={`reveal ${ctaInView ? 'visible' : ''} flex flex-col items-start justify-between gap-8 bg-[#111111] p-12`}>
              <div>
                <p className="mb-3 font-mono text-xs tracking-widest text-accent uppercase">For Students</p>
                <h2 className="mb-4 text-3xl font-black tracking-tight">Are You a Student?</h2>
                <p className="leading-relaxed text-muted">
                  Join 1,250+ attendees at Toronto's premier cybersecurity event. Learn from industry leaders, compete in CTF challenges, and connect with your next employer.
                </p>
              </div>
              <a
                href="mailto:byte.tmu@gmail.com?subject=Cyber Summit - Attendee Interest"
                className="bg-accent px-8 py-3 font-mono text-sm tracking-widest text-black uppercase transition-opacity hover:opacity-80"
              >
                Register Interest
              </a>
            </div>

            <div className={`reveal delay-150 ${ctaInView ? 'visible' : ''} flex flex-col items-start justify-between gap-8 bg-black p-12`}>
              <div>
                <p className="mb-3 font-mono text-xs tracking-widest text-accent uppercase">For Organizations</p>
                <h2 className="mb-4 text-3xl font-black tracking-tight">Ready to Reach Top Tech Talent?</h2>
                <p className="leading-relaxed text-muted">
                  Start a conversation about partnership. Every tier puts your brand in front of a highly engaged, technically skilled audience across two action-packed days.
                </p>
              </div>
              <a
                href="mailto:byte.tmu@gmail.com?subject=Cyber Summit - Sponsorship Inquiry"
                className="border border-[#444444] px-8 py-3 font-mono text-sm tracking-widest text-white uppercase transition-colors hover:border-accent hover:text-accent"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
