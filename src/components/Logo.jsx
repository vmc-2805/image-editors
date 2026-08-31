import { Link } from 'react-router-dom'

export default function Logo({ compact = false }) {
  return (
    <Link
      to="/"
      aria-label="PixelForge home"
      className="group flex items-center gap-2.5"
    >
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-gradient-to-br from-emerald-950 via-[#012604] to-black shadow-lift ring-1 ring-emerald-300/25 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
        <svg
          viewBox="0 0 24 24"
          className="h-[22px] w-[22px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="9" className="text-emerald-100/90" />
          <g className="text-emerald-400">
            <path d="M14.31 8l5.74 9.94" />
            <path d="M9.69 8h11.48" />
            <path d="M7.38 12l5.74-9.94" />
          </g>
          <g className="text-white/85">
            <path d="M9.69 16L3.95 6.06" />
            <path d="M14.31 16H2.83" />
            <path d="M16.62 12l-5.74 9.94" />
          </g>
        </svg>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-lg font-extrabold tracking-tight text-white">
            Pixel
            <span className="bg-gradient-to-r from-emerald-300 to-lime-200 bg-clip-text text-transparent">
              Forge
            </span>
          </span>
          <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.24em] text-emerald-100/40">
            Photo Studio
          </span>
        </span>
      )}
    </Link>
  )
}
