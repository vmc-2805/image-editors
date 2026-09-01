import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Menu as MenuIcon, X } from 'lucide-react'
import { NAV_LINKS } from '../data/navigation.js'
import MegaMenu from './MegaMenu.jsx'
import MobileMenu from './MobileMenu.jsx'
import Logo from './Logo.jsx'

export default function Header() {
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimer = useRef(null)

  const openMega = () => {
    clearTimeout(closeTimer.current)
    setMegaOpen(true)
  }
  const scheduleClose = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140)
  }

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && (setMegaOpen(false), setMobileOpen(false))
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white text-ink shadow-soft">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} to={link.path}
              className="relative rounded-lg px-3 py-2 text-[13px] font-semibold uppercase tracking-wide text-ink transition-colors duration-200 hover:text-primary after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-gradient-to-r after:from-primary after:to-emerald-400 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {link.label}
            </Link>
          ))}

          <div className="relative" onMouseEnter={openMega} onMouseLeave={scheduleClose}>
            <button
              type="button"
              onClick={() => setMegaOpen((v) => !v)}
              aria-expanded={megaOpen}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-semibold uppercase tracking-wide transition-colors duration-200 ${
                megaOpen ? 'text-primary' : 'text-ink hover:text-primary'
              }`}
            >
              More Tools
              <ChevronDown
                size={15}
                className={`transition-transform duration-300 ${megaOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <MegaMenu open={megaOpen} onEnter={openMega} onLeave={scheduleClose} />
          </div>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/editor"
            className="hidden rounded-xl bg-gradient-to-r from-lime-300 to-emerald-400 px-4 py-2 text-sm font-extrabold text-[#012604] shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 sm:inline-flex"
          >
            Launch Editor
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-ink transition-colors hover:border-primary/40 hover:text-primary lg:hidden"
          >
            {mobileOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onToggleMega={() => setMegaOpen((v) => !v)}
        megaOpen={megaOpen}
      />
    </header>
  )
}
