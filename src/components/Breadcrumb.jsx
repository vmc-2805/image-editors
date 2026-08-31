import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="animate-fade-in">
      <ol className="inline-flex flex-wrap items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] px-2 py-2 backdrop-blur">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-emerald-50/70 transition-colors duration-200 hover:text-lime-300"
          >
            <Home size={12} />
            Home
          </Link>
        </li>
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-1">
              <ChevronRight size={13} className="text-emerald-200/30" />
              {last ? (
                <span aria-current="page" className="px-2 py-1 text-xs font-extrabold text-white">
                  {item.label}
                </span>
              ) : (
                <span aria-disabled="true" className="px-2 py-1 text-xs font-bold text-emerald-50/45">
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
