import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { MEGA_MENU } from '../data/navigation.js'

export default function MegaMenu({ open, onEnter, onLeave }) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`fixed inset-x-0 top-[66px] z-50 mx-auto w-[min(94vw,980px)] ${
        open ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <div
        className={`overflow-hidden rounded-2xl border border-line bg-white shadow-mega transition-all duration-300 ease-out ${
          open
            ? 'translate-y-0 opacity-100 scale-100'
            : '-translate-y-2 opacity-0 scale-[0.98]'
        }`}
      >
        <div className="grid grid-cols-2 gap-1 p-5 sm:grid-cols-3 lg:grid-cols-5">
          {MEGA_MENU.map((category) => (
            <div key={category.title} className="min-w-0">
              <div className="mb-2 flex items-center gap-2 px-2">
                <span
                  className={`h-2 w-2 rounded-full bg-gradient-to-br ${category.accent}`}
                />
                <h3 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-gray-400">
                  {category.title}
                </h3>
              </div>
              <ul className="space-y-0.5">
                {category.tools.map((tool) => (
                  <li key={tool.label}>
                    <Link
                      to={tool.path}
                      className="group flex items-start gap-2.5 rounded-xl p-2 transition-all duration-200 hover:bg-surface hover:shadow-soft"
                    >
                      <span
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${category.accent} text-white shadow-sm transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6`}
                      >
                        <tool.icon size={15} strokeWidth={2.2} />
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center gap-1 text-[13px] font-bold text-ink">
                          {tool.label}
                          <ArrowUpRight
                            size={12}
                            className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                          />
                        </span>
                        <span className="block truncate text-[11px] font-medium text-gray-400">
                          {tool.desc}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-line bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 px-6 py-3">
          <p className="text-xs font-semibold text-gray-500">
            <span className="text-gradient font-extrabold">Pro tip:</span> every tool runs 100% in
            your browser — files never leave your device.
          </p>
          <Link
            to="/editor"
            className="shrink-0 text-xs font-extrabold uppercase tracking-wider text-primary transition-transform duration-200 hover:translate-x-0.5"
          >
            Open editor →
          </Link>
        </div>
      </div>
    </div>
  )
}
