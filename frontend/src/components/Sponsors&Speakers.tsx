import PartnerLogoBar from './PartnerLogoBar'
import Reveal from './Reveal'

export default function SponsorsAndSpeakers() {
  return (
    <section className="px-7 py-16">
      <div className="mx-auto max-w-8xl">
        <Reveal>
          <h2 className="mb-7 text-3xl font-black tracking-tight md:text-4xl">
            Our Past Sponsors &amp; Speakers
          </h2>
          <PartnerLogoBar />
        </Reveal>
      </div>
    </section>
  )
}
