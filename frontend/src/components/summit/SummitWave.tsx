import { useId } from 'react'

interface Props {
  /** Flip vertically so the "tab" shape hangs from the top edge instead of rising from the bottom. */
  flip?: boolean
  className?: string
}

/** Green→blue folder-tab band used as a section divider, like the bottom of the keynote posts. */
export default function SummitWave({ flip = false, className = '' }: Props) {
  const id = useId()
  return (
    <svg
      aria-hidden
      className={`summit-wave ${flip ? '-scale-y-100' : ''} ${className}`}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3fe0a6" />
          <stop offset="35%" stopColor="#2a2cff" />
          <stop offset="70%" stopColor="#1a1fd6" />
          <stop offset="100%" stopColor="#3fe0a6" />
        </linearGradient>
      </defs>
      <path
        d="M0 120 L0 70 L360 70 L420 30 L620 30 L680 70 L1440 70 L1440 120 Z"
        fill={`url(#${id})`}
        fillOpacity="0.9"
      />
      <path d="M0 120 L0 92 L220 92 L270 62 L470 62 L520 92 L1440 92 L1440 120 Z" fill="#05060f" fillOpacity="0.55" />
    </svg>
  )
}
