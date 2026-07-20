import { EVENT_PARTNERS, type EventPartner } from '../lib/partnerData'

type PartnerLogoCardProps = {
  partner: EventPartner
  interactive: boolean
}

function PartnerLogoCard({ partner, interactive }: PartnerLogoCardProps) {
  const content = (
    <>
      <div className="tech-week-partner-card flex h-24 w-24 items-center justify-center p-2 sm:h-28 sm:w-28">
        <div className="tech-week-partner-logo-frame flex h-full w-full items-center justify-center p-2">
          <img
            src={partner.logo}
            alt={interactive ? partner.name : ''}
            className={`h-full w-full object-contain ${partner.imageClassName ?? ''}`}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.visibility = 'hidden'
            }}
          />
        </div>
      </div>
      <span className="mt-3 block w-24 truncate text-center text-sm font-semibold text-muted sm:w-28">
        {partner.displayName ?? partner.name}
      </span>
    </>
  )

  const className = 'partner-logo-item block w-24 shrink-0 sm:w-28'

  if (partner.link && interactive) {
    return (
      <a
        href={partner.link}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        data-tier={partner.tier.toLowerCase()}
        aria-label={`${partner.name}, ${partner.tier} partner`}
        title={`${partner.name} · ${partner.tier}`}
      >
        {content}
      </a>
    )
  }

  return (
    <div
      className={className}
      data-tier={partner.tier.toLowerCase()}
      title={interactive ? `${partner.name} · ${partner.tier}` : undefined}
    >
      {content}
    </div>
  )
}

export default function PartnerLogoBar() {
  return (
    <div>
      <h3 className="mb-7 text-xl font-bold tracking-tight sm:text-2xl">
        Event Partners
      </h3>

      <div className="overflow-hidden py-6" aria-label="Event partners">
        <div className="ticker-track partner-logo-track">
          {[0, 1].map((copyIndex) => (
            <div
              key={copyIndex}
              className="flex shrink-0 gap-10 pr-10 sm:gap-12 sm:pr-12"
              aria-hidden={copyIndex === 1 ? true : undefined}
            >
              {EVENT_PARTNERS.map((partner) => (
                <PartnerLogoCard
                  key={partner.name}
                  partner={partner}
                  interactive={copyIndex === 0}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
