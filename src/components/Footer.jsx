import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import Logo from './Logo.jsx'
import { MEGA_MENU } from '../data/navigation.js'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#012604] text-white">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(133,191,143,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(133,191,143,0.06) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <div className="pointer-events-none absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-emerald-600/15 blur-[120px]" />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
        className="pointer-events-none absolute -right-16 -top-20 h-[380px] w-[380px] -rotate-12 text-emerald-100/[0.05]"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo variant="dark" />
            <p className="mt-4 max-w-xs text-sm font-medium leading-relaxed text-emerald-50/55">
              A privacy-first photo studio that lives entirely in your browser. Crafted for
              creators who value speed and simplicity.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-lime-300/25 bg-white/5 px-3.5 py-1.5 text-[11px] font-extrabold text-lime-200">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-300" />
              All systems local — nothing leaves your device
            </span>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {MEGA_MENU.map((cat) => (
              <div key={cat.title}>
                <h4 className="mb-3 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/45">
                  <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${cat.accent}`} />
                  {cat.title}
                </h4>
                <ul className="space-y-2">
                  {cat.tools.map((t) => (
                    <li key={t.label}>
                      <Link
                        to={t.path}
                        className="text-[13px] font-semibold text-emerald-50/70 transition-all duration-200 hover:pl-1 hover:text-lime-300"
                      >
                        {t.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs font-semibold text-emerald-100/40">
            © {new Date().getFullYear()} ImageEditify. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/blog" className="text-[11px] font-bold text-emerald-100/40 transition-colors hover:text-lime-300">
              Blog
            </Link>
            <Link to="/about" className="text-[11px] font-bold text-emerald-100/40 transition-colors hover:text-lime-300">
              About
            </Link>
            <Link to="/contact" className="text-[11px] font-bold text-emerald-100/40 transition-colors hover:text-lime-300">
              Contact
            </Link>
            <Link to="/terms" className="text-[11px] font-bold text-emerald-100/40 transition-colors hover:text-lime-300">
              Terms
            </Link>
            <Link to="/privacy" className="text-[11px] font-bold text-emerald-100/40 transition-colors hover:text-lime-300">
              Privacy
            </Link>
          </div>
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-100/40">
            Made with <Heart size={12} className="fill-rose-400 text-rose-400" /> for photographers
            everywhere
          </p>
        </div>
      </div>
    </footer>
  )
}
