import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { NAV_LINKS, MEGA_MENU } from '../data/navigation.js'

export default function MobileMenu({ open, onClose, onToggleMega, megaOpen }) {
  return (
    <div
      className={`overflow-hidden border-t border-line bg-white transition-all duration-300 ease-out lg:hidden ${
        open ? 'max-h-[80vh] opacity-100' : 'max-h-0 border-t-0 opacity-0'
      }`}
    >
      <nav
        className="space-y-1 overflow-y-auto overflow-x-hidden overscroll-contain px-4 py-4"
        aria-label="Mobile"
      >
        {NAV_LINKS.map((link, i) => (
          <Link key={link.label} to={link.path}
            onClick={onClose}
            style={{ animationDelay: `${i * 40}ms` }}
            className={`block rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-surface hover:text-primary ${
              open ? 'animate-fade-up' : ''
            }`}
          >
            {link.label}
          </Link>
        ))}

        <button
          type="button"
          onClick={onToggleMega}
          className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-surface hover:text-primary ${
            open ? 'animate-fade-up' : ''
          }`}
          style={{ animationDelay: `${NAV_LINKS.length * 40}ms` }}
        >
          More Tools
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${megaOpen ? 'rotate-180' : ''}`}
          />
        </button>

        <div
          className={`grid grid-cols-1 gap-2 overflow-hidden transition-all duration-300 sm:grid-cols-2 ${
            megaOpen ? 'max-h-[560px] pb-2 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {MEGA_MENU.flatMap((cat) =>
            cat.tools.map((tool) => (
              <Link
                key={tool.label}
                to={tool.path}
                onClick={onClose}
                className="flex w-full min-w-0 items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2.5 text-xs font-bold text-ink transition-all hover:border-primary/30 hover:text-primary"
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${cat.accent} text-white`}
                >
                  <tool.icon size={13} />
                </span>
                <span className="min-w-0 truncate">{tool.label}</span>
              </Link>
            )),
          )}
        </div>

        <Link
          to="/editor"
          onClick={onClose}
          className="mt-3 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-lime-300 to-emerald-400 px-4 py-3 text-sm font-extrabold text-[#012604] shadow-lift"
        >
          Launch Editor
        </Link>
      </nav>
    </div>
  )
}
