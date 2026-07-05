import type { ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

interface RevealProps {
  children: ReactNode
  className?: string
  threshold?: number
  delayMs?: number
}

export default function Reveal({ children, className = '', threshold = 0.15, delayMs = 0 }: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>(threshold)

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'visible' : ''} ${className}`}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  )
}
