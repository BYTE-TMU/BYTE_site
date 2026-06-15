import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

const PAGE_NAMES: Record<string, string> = {
  '/': 'Home',
  '/events': 'Events',
  '/projects': 'Projects',
  '/team': 'Team',
  '/news': 'News',
  '/support': 'Support',
}

export default function PageTransition() {
  const location = useLocation()
  const prevPath = useRef(location.pathname)
  const [animating, setAnimating] = useState(false)
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (location.pathname === prevPath.current) return
    prevPath.current = location.pathname
    setLabel(PAGE_NAMES[location.pathname] ?? '')
    setAnimating(true)
    const timer = setTimeout(() => setAnimating(false), 1500)
    return () => clearTimeout(timer)
  }, [location.pathname])

  if (!animating) return null

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      <div className="page-transition-curtain">
        <div className="page-transition-label flex flex-col items-center gap-3">
          <p className="font-mono text-xs tracking-widest text-accent uppercase">· BYTE ·</p>
          <p className="text-5xl font-black tracking-tight text-white md:text-7xl">{label}</p>
        </div>
      </div>
    </div>
  )
}
