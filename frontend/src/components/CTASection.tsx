import { useInView } from '../hooks/useInView'

export default function CTASection() {
  const [ref, inView] = useInView(0.2)

  return (
    <section className="border-t border-[#222222] px-6 py-32">
      <div ref={ref} className="mx-auto max-w-3xl text-center">
        <p className={`reveal delay-[0ms] ${inView ? 'visible' : ''} mb-4 font-mono text-xs tracking-widest text-accent uppercase`}>
          Join Us
        </p>
        <h2 className={`reveal delay-100 ${inView ? 'visible' : ''} mb-6 text-5xl font-black tracking-tight md:text-7xl`}>
          Ready to Build?
        </h2>
        <p className={`reveal delay-200 ${inView ? 'visible' : ''} mb-10 text-lg text-muted`}>
          BYTE is open to all TMU students. No experience required — just curiosity and a willingness to ship.
        </p>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdhPrWMuOerfjza3Wb_6noIe_of1Y_rr3Kmb5pi0l7k3N62QA/viewform"
          className={`reveal delay-300 ${inView ? 'visible' : ''} inline-block border border-accent bg-accent px-12 py-4 font-mono text-sm font-bold tracking-widest text-black uppercase transition-colors hover:bg-transparent hover:text-accent`}
        >
          Apply Now
        </a>
      </div>
    </section>
  )
}
