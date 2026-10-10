import type { ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'

// Full class names (not built from the variant) so Tailwind can see them.
const VARIANT_CLASS = {
  up: 'sr-up',
  zoom: 'sr-zoom',
  line: 'sr-line',
} as const

interface Props {
  children?: ReactNode
  className?: string
  variant?: keyof typeof VARIANT_CLASS
  /** Stagger in ms; use it to offset siblings that enter together. */
  delay?: number
  threshold?: number
}

/** Fades/slides its children in the first time they scroll into view. See `.sr` in index.css. */
export default function ScrollReveal({ children, className = '', variant = 'up', delay = 0, threshold = 0.12 }: Props) {
  // The negative bottom margin makes it fire once the element is a little way into the viewport,
  // rather than the instant its top edge appears.
  const [ref, inView] = useInView<HTMLDivElement>(threshold, '0px 0px -8% 0px')

  return (
    <div
      ref={ref}
      className={`sr ${VARIANT_CLASS[variant]} ${inView ? 'visible' : ''} ${className}`}
      style={delay ? { ['--sr-delay' as string]: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
