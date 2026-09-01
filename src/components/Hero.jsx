import { Link } from 'react-router-dom'
import { ArrowRight, Brush, Wand2 } from 'lucide-react'

const STATS = [
  { value: '16+', label: 'Smart tools' },
  { value: '100%', label: 'In-browser' },
  { value: '0', label: 'Uploads to servers' },
  { value: 'Free', label: 'Forever' },
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-[#012604] text-white">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(133,191,143,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(133,191,143,0.07) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <div className="pointer-events-none absolute -left-40 -top-48 h-[520px] w-[520px] rounded-full bg-emerald-500/20 blur-[130px] animate-float-slow" />
      <div className="pointer-events-none absolute -right-36 top-32 h-[460px] w-[460px] rounded-full bg-lime-400/10 blur-[120px] animate-float-slow [animation-delay:2.5s]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-[900px] -translate-x-1/2 rounded-full bg-emerald-800/30 blur-[110px]" />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeLinecap="round"
        className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rotate-12 text-emerald-200/[0.05]"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
        <span
          className="inline-flex items-center gap-2 rounded-full border border-lime-300/25 bg-white/5 px-4 py-1.5 text-xs font-extrabold text-lime-200 backdrop-blur animate-fade-up"
          style={{ animationDelay: '60ms' }}
        >
          <Wand2 size={13} />
          New — AI Background Remover built in
        </span>

        <h1
          className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl animate-fade-up"
          style={{ animationDelay: '140ms' }}
        >
          Edit your images perfectly{' '}
          <span className="bg-gradient-to-r from-lime-300 via-emerald-300 to-emerald-400 bg-clip-text text-transparent">
            without leaving your browser
          </span>
        </h1>

        <p
          className="mx-auto mt-5 max-w-xl text-base font-medium leading-relaxed text-emerald-50/65 animate-fade-up sm:text-lg"
          style={{ animationDelay: '220ms' }}
        >
          Crop, resize, retouch, remove backgrounds and watermark in seconds. No sign-up walls, no
          watermarks on export, no files ever uploaded.
        </p>

        <div
          className="mt-9 flex flex-wrap items-center justify-center gap-3 animate-fade-up"
          style={{ animationDelay: '300ms' }}
        >
          <Link
            to="/editor"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-lime-300 to-emerald-400 px-7 py-3 text-base font-extrabold text-[#012604] shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
          >
            <Brush size={18} /> Start Editing
            <ArrowRight size={17} />
          </Link>
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-base font-bold text-emerald-50 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-lime-300/40 hover:bg-white/10"
          >
            <Wand2 size={17} /> Explore Tools
          </a>
        </div>

        <div
          className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4 animate-fade-up"
          style={{ animationDelay: '380ms' }}
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-lime-300/30 hover:bg-white/[0.09]"
            >
              <p className="text-xl font-extrabold text-lime-300 sm:text-2xl">{s.value}</p>
              <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-emerald-100/45">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
