import { useInView } from '../hooks/useInView'

export default function AboutSection() {
  const [ref, inView] = useInView(0.2)

  return (
    <section id="about" className="border-t border-[#222222] mx-auto max-w-7xl px-6 py-24">
      <div ref={ref}>
        <p className={`reveal delay-[0ms] ${inView ? 'visible' : ''} mb-2 font-mono text-xs tracking-widest text-accent uppercase`}>
          About
        </p>
        <h2 className={`reveal delay-100 ${inView ? 'visible' : ''} mb-6 text-4xl font-black tracking-tight md:text-5xl`}>
          What is BYTE?
        </h2>
        <div className={`reveal delay-200 ${inView ? 'visible' : ''} max-w-2xl space-y-4 text-lg text-muted`}>
          <p>
            BYTE is TMU's open-source student group that focuses on AI. By joining us, you'll get to gain hands-on experience in real-world AI development by working collaboratively on projects that make a difference.
          </p>
          <p>
            From weekly workshops to semester-long project teams, we give every TMU student the chance to go from zero to shipped — no experience required.
          </p>
        </div>
      </div>
    </section>
  )
}