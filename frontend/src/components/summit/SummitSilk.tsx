import { useId } from 'react'

/** Decorative flowing light streaks, echoing the summit posters. Fills its positioned parent. */
export default function SummitSilk({ className = '' }: { className?: string }) {
  const id = useId()
  return (
    <svg
      aria-hidden
      className={`summit-silk ${className}`}
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a2cff" stopOpacity="0" />
          <stop offset="45%" stopColor="#3b82f6" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#c7d2fe" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3fe0a6" stopOpacity="0" />
          <stop offset="55%" stopColor="#3fe0a6" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#6a3df5" stopOpacity="0.5" />
        </linearGradient>
        <filter id={`${id}-blur`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <path
        d="M-80 120 C 240 40, 520 300, 820 220 S 1280 -40, 1560 200 L 1560 330 C 1260 130, 1000 420, 760 370 S 240 190, -80 300 Z"
        fill={`url(#${id}-a)`}
        filter={`url(#${id}-blur)`}
      />
      <path
        d="M-80 620 C 260 520, 560 760, 900 640 S 1300 460, 1560 560 L 1560 700 C 1300 600, 1060 790, 820 780 S 280 640, -80 740 Z"
        fill={`url(#${id}-b)`}
        filter={`url(#${id}-blur)`}
      />
      <path
        d="M-40 210 C 260 120, 520 380, 820 300 S 1300 40, 1500 230"
        fill="none"
        stroke={`url(#${id}-a)`}
        strokeWidth="1.5"
      />
    </svg>
  )
}
