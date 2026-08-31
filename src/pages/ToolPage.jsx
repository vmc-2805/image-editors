import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight, Info, Lock, Wand2 } from 'lucide-react'
import { TOOL_REGISTRY } from '../data/tools.js'
import EditorSection from '../editor/EditorSection.jsx'
import QuickTool from '../components/QuickTool.jsx'
import HtmlTool from '../components/HtmlTool.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Reveal from '../components/Reveal.jsx'

export default function ToolPage() {
  const { slug } = useParams()
  const tool = TOOL_REGISTRY[slug]
  if (!tool) return <Navigate to="/" replace />

  const isEditorTool = tool.mode === 'editor'

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
              <Breadcrumb items={[{ label: tool.title }]} />
            </div>
            <p className="col-span-12 text-sm font-medium leading-relaxed text-emerald-50/65 lg:col-span-6 lg:text-right">
              {tool.desc}
            </p>
          </div>
        </div>
      </section>

      {isEditorTool && (
        <EditorSection />
      )}

      {(tool.mode === 'convert' || tool.mode === 'compress' || tool.mode === 'upscale') && (
        <section className="relative overflow-hidden py-14">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(rgba(1,38,4,0.08) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          />
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[700px] -translate-x-1/2 rounded-full bg-emerald-300/30 blur-[110px]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <QuickTool tool={tool} />
            <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
              {[
                { icon: Wand2, text: 'High-quality canvas re-encoding' },
                { icon: Lock, text: 'Files never touch a server' },
                { icon: ArrowRight, text: 'Unlimited exports, always free' },
              ].map((f) => (
                <Reveal key={f.text}>
                  <div className="flex items-center gap-2.5 rounded-2xl border border-line bg-white px-4 py-3 shadow-soft">
                    <f.icon size={15} className="shrink-0 text-primary" />
                    <span className="text-xs font-bold text-gray-600">{f.text}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {tool.mode === 'html' && (
        <section className="relative overflow-hidden py-14">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(rgba(1,38,4,0.08) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          />
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[700px] -translate-x-1/2 rounded-full bg-emerald-300/30 blur-[110px]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <HtmlTool />
          </div>
        </section>
      )}

      {tool.mode === 'soon' && (
        <section className="py-20">
          <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
            <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Info size={28} />
            </span>
            <h2 className="text-2xl font-extrabold text-ink">Coming soon</h2>
            <ul className="mt-6 space-y-3 text-left">
              {[
                'Currently in private beta with select creators',
                'Built on the same privacy-first engine',
                'Join the waitlist from the editor page',
              ].map((p) => (
                <li key={p} className="flex items-start gap-2.5 rounded-2xl border border-line bg-white p-4 shadow-soft">
                  <Wand2 size={15} className="mt-0.5 shrink-0 text-primary" />
                  <span className="text-sm font-semibold text-gray-600">{p}</span>
                </li>
              ))}
            </ul>
            <Link to="/editor" className="btn-gradient mt-8">
              Explore the Editor meanwhile <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      )}
    </>
  )
}
