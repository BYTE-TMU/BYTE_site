import { cloneElement, useEffect, useRef, useState, type ReactElement } from 'react'
import { useLocation, type RoutesProps } from 'react-router-dom'

const PAGE_NAMES: Record<string, string> = {
  '/': 'Home',
  '/events': 'Events',
  '/projects': 'Projects',
  '/team': 'Team',
  '/news': 'News',
  '/contact': 'Contact',
  '/cybersecurity': 'Cyber Summit',
  '/support': 'Support',
}

/* Timeline in ms. Keep in step with the percentages in the pageCurtain / pageLabel keyframes
   in index.css (DURATION = 100%, COVERED_AT = 24%, SWAP_AT = 68%):
     0 – COVERED_AT   curtain rises over the old page
     COVERED_AT – SWAP_AT   curtain holds and the page title shows
     SWAP_AT – DURATION     new page mounts and the curtain lifts to reveal it */
const DURATION = 2000
const COVERED_AT = 480
const SWAP_AT = 1360

interface Props {
  /** The <Routes> element. It is rendered against the page being shown, which trails the URL. */
  children: ReactElement<RoutesProps>
}

/**
 * Wraps <Routes> and sequences a route change as: title first, then the page.
 * The URL changes immediately, but the old page stays mounted until the curtain has covered it
 * and the title has had its moment. The new page only mounts as the curtain starts to lift, so
 * its scroll-reveal animations play in view instead of finishing behind the overlay.
 */
export default function PageTransition({ children }: Props) {
  const location = useLocation()
  const [shown, setShown] = useState(location)
  const shownPath = useRef(location.pathname)
  const [animating, setAnimating] = useState(false)
  const [label, setLabel] = useState('')
  const [run, setRun] = useState(0)

  useEffect(() => {
    if (location.pathname === shownPath.current) {
      // Same page (e.g. a query or hash change), or the user navigated back to the page that is
      // still showing mid-transition: nothing to sequence.
      setShown(location)
      setAnimating(false)
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      shownPath.current = location.pathname
      setShown(location)
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    setLabel(PAGE_NAMES[location.pathname] ?? '')
    setRun((r) => r + 1) // remounts the overlay so its CSS animation restarts on rapid navigation
    setAnimating(true)

    // Jump to the top while the curtain fully covers the screen, so there is no visible scroll.
    const scrollTimer = setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), COVERED_AT)
    const swapTimer = setTimeout(() => {
      shownPath.current = location.pathname
      setShown(location)
    }, SWAP_AT)
    const endTimer = setTimeout(() => setAnimating(false), DURATION)
    return () => {
      clearTimeout(scrollTimer)
      clearTimeout(swapTimer)
      clearTimeout(endTimer)
    }
  }, [location])

  return (
    <>
      {cloneElement(children, { location: shown })}
      {animating && (
        <div key={run} aria-hidden className="fixed inset-0 z-[9999] overflow-hidden">
          <div className="page-transition-curtain">
            <div className="page-transition-label flex flex-col items-center gap-3">
              <p className="font-mono text-xs tracking-widest text-accent uppercase">· BYTE ·</p>
              <p className="text-5xl font-black tracking-tight text-white md:text-7xl">{label}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
