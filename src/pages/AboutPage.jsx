import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Brush,
  Globe,
  Heart,
  Lock,
  Rocket,
  Sparkles,
  Target,
  Users,
  Zap,
} from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Reveal from '../components/Reveal.jsx'

const VALUES = [
  {
    icon: Lock,
    title: 'Privacy by Default',
    desc: 'Your images never leave your device. Every pixel is processed locally — no uploads, no servers, no exceptions.',
  },
  {
    icon: Zap,
    title: 'Speed Over Bloat',
    desc: 'No loading spinners, no rendering queues. Canvas operations happen in real-time with zero latency.',
  },
  {
    icon: Heart,
    title: 'Crafted for Creators',
    desc: 'Built by photographers and designers who wanted a lightweight tool that gets out of the way.',
  },
  {
    icon: Globe,
    title: 'Open to Everyone',
    desc: 'No sign-ups, no subscriptions, no hidden paywalls. Every tool is free and instantly available.',
  },
]

const MILESTONES = [
  { year: '2024', event: 'PixelForge concept born from frustration with heavy desktop editors' },
  { year: '2025', event: 'First public release with AI background removal, filters, and core editing tools' },
  { year: '2026', event: 'Expanded to 16+ tools, watermark studio, and meme generator' },
]

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#012604] py-10 text-white sm:py-12">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(133,191,143,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(133,191,143,0.07) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-emerald-500/20 blur-[110px]" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-lime-400/10 blur-[110px]" />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeLinecap="round"
          className="pointer-events-none absolute -right-16 -top-16 h-[300px] w-[300px] rotate-12 text-emerald-200/[0.06]"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" />
        </svg>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 items-center gap-x-8 gap-y-4">
            <div className="col-span-12 lg:col-span-6">
              <Breadcrumb items={[{ label: 'About Us' }]} />
            </div>
            <p className="col-span-12 text-sm font-medium leading-relaxed text-emerald-50/65 lg:col-span-6 lg:text-right">
              The photo editor that respects your privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="relative overflow-hidden bg-white py-20">
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div>
                <span className="mb-3 inline-block rounded-full bg-primary/10 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-primary">
                  Our Mission
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                  Powerful editing,{' '}
                  <span className="bg-gradient-to-r from-emerald-700 to-emerald-400 bg-clip-text text-transparent">
                    zero compromise
                  </span>
                </h2>
                <p className="mt-5 text-sm font-medium leading-relaxed text-gray-500 sm:text-base">
                  We believe photo editing shouldn't require a 2GB download, a monthly subscription, or
                  uploading your personal images to someone else's server. PixelForge was built to prove
                  that a browser-based tool can match — and even surpass — traditional desktop software.
                </p>
                <p className="mt-4 text-sm font-medium leading-relaxed text-gray-500 sm:text-base">
                  Every feature runs entirely on your device using modern web APIs like Canvas, WebAssembly,
                  and WebGL. Your photos stay yours. Always.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="relative rounded-3xl border border-line bg-surface p-8 shadow-soft">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Users, value: '10K+', label: 'Active Users' },
                    { icon: Target, value: '16+', label: 'Pro Tools' },
                    { icon: Globe, value: '100%', label: 'Browser-Based' },
                    { icon: Lock, value: '0', label: 'Files on Servers' },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="flex flex-col items-center rounded-2xl border border-line bg-white p-5 text-center shadow-soft"
                    >
                      <s.icon size={20} className="mb-2 text-primary" />
                      <p className="text-2xl font-extrabold text-ink">{s.value}</p>
                      <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden bg-surface py-20">
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-primary">
                Our Values
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                What drives every decision
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lift">
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-emerald-700 text-white shadow-lift transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                    <v.icon size={22} strokeWidth={2.1} />
                  </span>
                  <h3 className="text-lg font-extrabold text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-gray-500">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative overflow-hidden bg-white py-20">
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-primary">
                Our Journey
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">From idea to reality</h2>
            </div>
          </Reveal>
          <div className="relative space-y-8">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
            {MILESTONES.map((m, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="relative flex gap-6 pl-2">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-emerald-700 text-xs font-extrabold text-white shadow-lift">
                    {m.year.slice(2)}
                  </span>
                  <div className="pt-2">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-primary">{m.year}</p>
                    <p className="mt-1 text-sm font-semibold text-ink">{m.event}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tech */}
      <section className="relative overflow-hidden bg-surface py-20">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-3xl border border-line bg-white p-8 shadow-soft sm:p-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
                  <Rocket size={20} />
                </span>
                <h2 className="text-xl font-extrabold text-ink">Built With Modern Web Tech</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { name: 'React 18', desc: 'Component-driven UI with instant updates' },
                  { name: 'Canvas API', desc: 'Pixel-level image manipulation in the browser' },
                  { name: 'WebAssembly', desc: 'On-device AI neural network for bg removal' },
                  { name: 'Tailwind CSS', desc: 'Utility-first styling for consistent design' },
                  { name: 'Vite', desc: 'Lightning-fast dev server and bundler' },
                  { name: 'Lucide Icons', desc: 'Beautiful, consistent iconography' },
                ].map((t, i) => (
                  <div
                    key={t.name}
                    className="rounded-xl border border-line bg-surface p-4 transition-all duration-300 hover:border-primary/25"
                  >
                    <p className="text-sm font-extrabold text-ink">{t.name}</p>
                    <p className="mt-1 text-xs font-medium text-gray-400">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
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
              <div className="relative">
                <Brush size={28} className="mx-auto mb-4 text-lime-300" />
                <h2 className="mx-auto max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Ready to try it yourself?
                </h2>
                <p className="mx-auto mt-4 max-w-md text-sm font-medium text-emerald-50/65 sm:text-base">
                  No account needed. Open the editor, drop a photo and see the difference.
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
