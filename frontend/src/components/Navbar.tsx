import { useState, useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import fullLogo from '../assets/byte_full-logo-white_s26-18.png'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `font-mono text-xs tracking-widest uppercase transition-colors ${
    isActive ? 'text-accent' : 'text-muted hover:text-white'
  }`

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block py-3 font-mono text-sm tracking-widest uppercase transition-colors ${
    isActive ? 'text-accent' : 'text-muted hover:text-white'
  }`

interface NavbarProps {
  onEasterEgg?: () => void
}

export default function Navbar({ onEasterEgg }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const tapCountRef = useRef(0)
  const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleLogoTap() {
    tapCountRef.current += 1
    if (tapTimerRef.current) clearTimeout(tapTimerRef.current)
    tapTimerRef.current = setTimeout(() => { tapCountRef.current = 0 }, 2000)
    if (tapCountRef.current >= 5) {
      tapCountRef.current = 0
      onEasterEgg?.()
    }
  }

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <nav className="animate-slide-down fixed top-0 left-0 right-0 z-50 border-b border-[#222222] bg-black/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <NavLink to="/" className="flex items-center" onClick={handleLogoTap}>
          <img src={fullLogo} alt="BYTE" className="h-24 w-auto" />
        </NavLink>
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/team" className={linkClass}>Team</NavLink>
          <NavLink to="/news" className={linkClass}>News</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          <NavLink to="/cybersecurity" className={linkClass}>Cyber Summit</NavLink>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center border border-[#222222] text-white transition-colors hover:border-accent hover:text-accent md:hidden"
        >
          {open ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      {open && (
        <div className="flex flex-col divide-y divide-[#222222] border-t border-[#222222] px-6 md:hidden">
          <NavLink to="/" end className={mobileLinkClass} onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/team" className={mobileLinkClass} onClick={() => setOpen(false)}>
            Team
          </NavLink>
          <NavLink to="/news" className={mobileLinkClass} onClick={() => setOpen(false)}>
            News
          </NavLink>
          <NavLink to="/contact" className={mobileLinkClass} onClick={() => setOpen(false)}>
            Contact
          </NavLink>
          <NavLink to="/cybersecurity" className={mobileLinkClass} onClick={() => setOpen(false)}>
            Cyber Summit
          </NavLink>
        </div>
      )}
    </nav>
  )
}