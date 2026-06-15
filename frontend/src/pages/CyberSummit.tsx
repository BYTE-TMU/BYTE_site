const FEATURES = [
  {
    icon: '◈',
    title: 'WORKSHOPS',
    desc: 'Hands-on technical sessions covering offensive security, defensive tools, web vulnerabilities, reverse engineering, and more — led by industry practitioners and student researchers.',
  },
  {
    icon: '⬡',
    title: 'CTF COMPETITION',
    desc: 'A live Capture The Flag competition with challenges spanning cryptography, forensics, web exploitation, and binary analysis. Open to all skill levels, with prizes for top teams.',
  },
  {
    icon: '◎',
    title: 'KEYNOTE SPEAKERS',
    desc: 'Industry professionals and security researchers sharing insights on careers, emerging threats, red team operations, and the future of cybersecurity.',
  },
]

export default function CyberSummit() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 pt-20 text-center">
        <p className="mb-6 font-mono text-xs tracking-widest text-accent uppercase">
          TMU × BYTE Presents
        </p>
        <h1 className="mb-4 text-6xl font-black tracking-tight md:text-9xl">
          TMU CYBER<br />SUMMIT
        </h1>
        <p className="mb-8 max-w-lg text-xl text-muted">
          Toronto's Premier Student Cybersecurity Conference
        </p>
        <div className="mb-10 border border-[#222222] px-4 py-2 font-mono text-xs tracking-widest text-muted uppercase">
          ◈ &nbsp;Coming Fall 2025&nbsp; ◈
        </div>

        {/* Classified redaction bars */}
        <div className="mb-10 space-y-2 opacity-15">
          <div className="mx-auto h-2 w-64 rounded bg-accent" />
          <div className="mx-auto h-2 w-48 rounded bg-accent" />
          <div className="mx-auto h-2 w-56 rounded bg-accent" />
        </div>

        <button
          disabled
          className="cursor-not-allowed border border-[#333333] px-8 py-3 font-mono text-sm tracking-widest text-muted uppercase"
        >
          Registration Opening Soon
        </button>
      </section>

      {/* About */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 font-mono text-xs tracking-widest text-accent uppercase">
            About the Summit
          </p>
          <p className="text-lg leading-relaxed text-muted">
            The TMU Cyber Summit is a student-organized cybersecurity conference hosted by BYTE at Toronto Metropolitan University. Designed for students of all skill levels, the summit brings together hands-on workshops, competitive challenges, and expert speakers from the cybersecurity industry — all under one roof on campus.
          </p>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <p className="mb-10 font-mono text-xs tracking-widest text-accent uppercase">
            What to Expect
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {FEATURES.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="border border-[#222222] bg-[#111111] p-8 transition-colors hover:border-accent"
              >
                <span className="mb-6 block font-mono text-3xl text-accent">{icon}</span>
                <h3 className="mb-3 font-mono text-sm tracking-widest text-white uppercase">{title}</h3>
                <p className="leading-relaxed text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-24 px-6 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-4 text-4xl font-black tracking-tight">STAY TUNED</h2>
          <p className="mb-8 text-muted">
            More details including the date, schedule, and speaker lineup will be announced soon. Follow BYTE on social media for updates.
          </p>
          <button
            disabled
            className="cursor-not-allowed border border-[#333333] px-8 py-3 font-mono text-sm tracking-widest text-muted uppercase"
          >
            Registration Opening Soon
          </button>
        </div>
      </section>

    </div>
  )
}
