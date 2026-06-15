import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `font-mono text-xs tracking-widest uppercase transition-colors ${
    isActive ? 'text-accent' : 'text-muted hover:text-white'
  }`

export default function Navbar() {
  return (
    <nav className="animate-slide-down fixed top-0 left-0 right-0 z-50 border-b border-[#222222] bg-black/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="text-xl font-black tracking-tight text-white">
          <span className="text-accent">B</span>
          <span className="text-accent">Y</span>
          <span className="text-accent">T</span>
          <span className="text-accent">E</span>
        </NavLink>
        <div className="flex items-center gap-8">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/team" className={linkClass}>Team</NavLink>
          <NavLink to="/news" className={linkClass}>News</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          <NavLink to="/cybersecurity" className={linkClass}>Cyber Summit</NavLink>
        </div>
      </div>
    </nav>
  )
}