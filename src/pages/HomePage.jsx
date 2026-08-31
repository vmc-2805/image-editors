import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Brush,
  ChevronDown,
  Crop,
  Eraser,
  Filter,
  Layers,
  Lock,
  Maximize2,
  MousePointerClick,
  MoveHorizontal,
  ShieldCheck,
  Sliders,
  Sparkles,
  Stamp,
  Type,
  UploadCloud,
  Wand2,
  Zap,
} from 'lucide-react'
import Hero from '../components/Hero.jsx'
import Reveal from '../components/Reveal.jsx'
import { TOOL_REGISTRY, FAQS } from '../data/tools.js'

const BENTO = [
  {
    icon: Eraser,
    title: 'AI Background Remover',
    desc: 'A compact neural network runs on your device and lifts subjects off any background in seconds — hair, fur and glass edges included.',
    path: '/tool/remove-background',
    big: true,
    tint: 'from-emerald-800 to-emerald-500',
  },
  {
    icon: Sliders,
    title: 'Precision Adjustments',
    desc: 'Brightness, contrast, saturation, hue, blur and film grain-style looks with live preview.',
    tint: 'from-emerald-700 to-emerald-500',
  },
  {
    icon: Wand2,
    title: '8 Signature Filters',
    desc: 'Hand-tuned presets from Mono to Drama, stacked non-destructively.',
    tint: 'from-gray-600 to-gray-800',
  },
  {
    icon: Maximize2,
    title: 'Pixel-Perfect Geometry',
    desc: 'Crop with live rulers, resize with aspect lock, rotate and flip instantly.',
    tint: 'from-teal-700 to-green-600',
  },
  {
    icon: Stamp,
    title: 'Watermark Studio',
    desc: 'Protect your work with custom text marks, opacity and smart placement.',
    tint: 'from-primary to-emerald-800',
  },
]

const STEPS = [
  {
    icon: UploadCloud,
    num: '01',
    title: 'Drop your photo',
    desc: 'Drag & drop or browse — JPG, PNG, WEBP and GIF all welcome up to 25MP.',
  },
  {
    icon: MousePointerClick,
    num: '02',
    title: 'Edit live',
    desc: 'Every slider, filter and stroke renders instantly on canvas. Undo anything, anytime.',
  },
  {
    icon: ArrowRight,
    num: '03',
    title: 'Export & done',
    desc: 'Download crisp PNG or tuned JPG straight to your device. No watermark, ever.',
  },
]

const BAND_STATS = [
  { value: 16, suffix: '+', label: 'Pro-grade tools' },
  { value: 0, suffix: '', label: 'Files uploaded to servers' },
  { value: 100, suffix: '%', label: 'Browser-based editing' },
  { value: 25, suffix: 'MP+', label: 'Images handled smoothly' },
]

function useCountUp(target, started, duration = 1400) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!started) return
    let raf
    const t0 = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration)
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, target, duration])
  return val
}

function StatItem({ stat, started }) {
  const v = useCountUp(stat.value, started)
  return (
    <div className="text-center">
      <p className="text-4xl font-extrabold text-lime-300 sm:text-5xl">
        {v}
        {stat.suffix}
      </p>
      <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-100/50">
        {stat.label}
      </p>
    </div>
  )
}

function StatsBand() {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setStarted(true), io.disconnect()),
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="relative overflow-hidden bg-[#012604] py-16 text-white sm:py-20">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(133,191,143,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(133,191,143,0.06) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600/20 blur-[100px]" />
      <div
        ref={ref}
        className="relative mx-auto grid max-w-5xl grid-cols-2 gap-10 px-4 sm:grid-cols-4 sm:px-6 lg:px-8"
      >
        {BAND_STATS.map((s) => (
          <StatItem key={s.label} stat={s} started={started} />
        ))}
      </div>
    </section>
  )
}

function FaqItem({ faq, open, onToggle }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        open ? 'border-primary/30 bg-white shadow-lift' : 'border-line bg-white hover:border-primary/25'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className={`text-sm font-extrabold sm:text-base ${open ? 'text-primary' : 'text-ink'}`}>
          {faq.q}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            open ? 'rotate-180 bg-primary text-white' : 'bg-surface text-gray-500'
          }`}
        >
          <ChevronDown size={16} />
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-sm font-medium leading-relaxed text-gray-500">{faq.a}</p>
        </div>
      </div>
    </div>
  )
}

function Faq() {
  const [openIdx, setOpenIdx] = useState(0)
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {FAQS.map((f, i) => (
        <Reveal key={f.q} delay={i * 60}>
          <FaqItem faq={f} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
        </Reveal>
      ))}
    </div>
  )
}

function SectionHeading({ kicker, title, sub }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <span className="mb-3 inline-block rounded-full bg-primary/10 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-primary">
        {kicker}
      </span>
      <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {sub && <p className="mt-3 text-sm font-medium leading-relaxed text-gray-500 sm:text-base">{sub}</p>}
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Features bento */}
      <section id="features" className="relative scroll-mt-20 overflow-hidden py-20">
        <div className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-emerald-200/40 blur-[110px]" />
        <div className="pointer-events-none absolute -left-20 bottom-10 h-64 w-64 rounded-full bg-lime-200/40 blur-[100px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              kicker="Features"
              title={
                <>
                  A studio-grade toolkit,{' '}
                  <span className="bg-gradient-to-r from-emerald-700 to-emerald-400 bg-clip-text text-transparent">
                    zero learning curve
                  </span>
                </>
              }
              sub="Everything you expect from desktop software — rebuilt to run instantly in a browser tab."
            />
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {BENTO.map((f, i) => (
              <Reveal key={f.title} delay={i * 70} className={f.big ? 'md:col-span-2 lg:col-span-2' : ''}>
                <Link
                  to={f.path || '/editor'}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lift"
                >
                  {f.big && (
                    <>
                      <div
                        className="absolute inset-0 opacity-[0.35]"
                        style={{
                          backgroundImage: 'radial-gradient(rgba(1,38,4,0.08) 1px, transparent 1px)',
                          backgroundSize: '18px 18px',
                        }}
                      />
                      <svg viewBox="0 0 200 120" className="absolute -right-6 bottom-0 h-32 w-56 text-emerald-100" fill="none">
                        <path d="M20 100 Q60 20 100 55 T190 40" stroke="currentColor" strokeWidth="14" strokeLinecap="round" />
                      </svg>
                    </>
                  )}
                  <span className={`relative mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lift transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${f.tint}`}>
                    <f.icon size={22} strokeWidth={2.1} />
                  </span>
                  <h3 className="relative text-lg font-extrabold text-ink">{f.title}</h3>
                  <p className="relative mt-2 max-w-md text-sm font-medium leading-relaxed text-gray-500">
                    {f.desc}
                  </p>
                  <span className="relative mt-auto pt-5 text-xs font-extrabold uppercase tracking-wider text-primary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    Try it now →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative overflow-hidden bg-white py-20">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: 'radial-gradient(rgba(1,38,4,0.06) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              kicker="Workflow"
              title="From drop to download in three moves"
              sub="No timelines, no layers panel, no tutorials. PixelForge keeps the magic under the hood."
            />
          </Reveal>
          <div className="relative grid gap-6 md:grid-cols-3">
            <div className="absolute left-[16%] right-[16%] top-14 hidden h-px bg-gradient-to-r from-emerald-200 via-primary/40 to-emerald-200 md:block" />
            {STEPS.map((s, i) => (
              <Reveal key={s.num} delay={i * 120}>
                <div className="group relative rounded-3xl border border-line bg-white/90 p-7 text-center shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lift">
                  <span className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-emerald-700 text-white shadow-lift transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <s.icon size={23} strokeWidth={2.1} />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-lime-300 text-[10px] font-extrabold text-[#012604] ring-2 ring-white">
                      {i + 1}
                    </span>
                  </span>
                  <h3 className="text-base font-extrabold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-gray-500">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-emerald-200/40 blur-[110px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              kicker="All tools"
              title="One toolbox for every image job"
              sub="Each tool is a focused mini-app — click any card to jump straight into it."
            />
          </Reveal>
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
            {Object.entries(TOOL_REGISTRY).map(([slug, tool], i) => (
              <Reveal key={slug} delay={(i % 4) * 70}>
                <Link
                  to={tool.mode === 'editor' && slug === 'photo-editor' ? '/editor' : `/tool/${slug}`}
                  className="group flex h-full flex-col items-start gap-3 rounded-2xl border border-line bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lift"
                >
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${tool.accent} text-white shadow-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110`}>
                    <tool.icon size={19} strokeWidth={2.1} />
                  </span>
                  <span>
                    <span className="block text-sm font-extrabold text-ink group-hover:text-primary">
                      {tool.title}
                    </span>
                    <span className="mt-0.5 block text-xs font-medium text-gray-400">{tool.tagline}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <StatsBand />

      {/* FAQ */}
      <section className="relative overflow-hidden bg-white py-20">
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-emerald-200/40 blur-[110px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              kicker="FAQ"
              title="Questions, answered honestly"
              sub="Everything people usually ask before trusting an online editor."
            />
          </Reveal>
          <Faq />
        </div>
      </section>

      {/* CTA band */}
      <section className="relative overflow-hidden py-20">
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-[#012604] px-6 py-16 text-center text-white shadow-mega sm:px-12">
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(133,191,143,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(133,191,143,0.08) 1px, transparent 1px)',
                  backgroundSize: '36px 36px',
                }}
              />
              <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-emerald-500/25 blur-[100px] animate-float-slow" />
              <div className="pointer-events-none absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-lime-400/15 blur-[110px]" />
              <div className="relative">
                <Sparkles size={28} className="mx-auto mb-4 text-lime-300" />
                <h2 className="mx-auto max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Your next edit is{' '}
                  <span className="bg-gradient-to-r from-lime-300 to-emerald-300 bg-clip-text text-transparent">
                    one click away
                  </span>
                </h2>
                <p className="mx-auto mt-4 max-w-md text-sm font-medium text-emerald-50/65 sm:text-base">
                  Open the studio, drop a photo and see why thousands of creators ditched heavyweight
                  desktop apps.
                </p>
                <Link
                  to="/editor"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-lime-300 to-emerald-400 px-8 py-3.5 text-base font-extrabold text-[#012604] shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
                >
                  <Brush size={18} /> Launch Photo Editor
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
