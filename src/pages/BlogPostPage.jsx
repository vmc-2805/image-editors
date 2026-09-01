import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CalendarDays, Clock, Tag, Wand2 } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Reveal from '../components/Reveal.jsx'
import { BLOG_POSTS, getPost } from '../data/blog.js'
import { TOOL_REGISTRY } from '../data/tools.js'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = getPost(slug)
  if (!post) return <Navigate to="/blog" replace />

  const idx = BLOG_POSTS.findIndex((p) => p.slug === slug)
  const prev = BLOG_POSTS[idx - 1]
  const next = BLOG_POSTS[idx + 1]
  const relatedTools = post.relatedTools
    .map((s) => ({ key: s, ...TOOL_REGISTRY[s] }))
    .filter((t) => t.title)

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

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Blog', path: '/blog' }, { label: post.title }]} />
          <div className="mt-6">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-lime-200">
              <Tag size={12} /> {post.category}
            </span>
            <h1 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-bold text-emerald-100/60">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={14} /> {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} /> {post.readTime} read
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-14">
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative mb-10 overflow-hidden rounded-3xl border border-line shadow-soft">
              <img
                src={post.image}
                alt={post.title}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal>
            <p className="text-lg font-medium leading-relaxed text-ink sm:text-xl">
              {post.excerpt}
            </p>
          </Reveal>

          <div className="mt-10 space-y-8">
            {post.content.map((section, i) => (
              <Reveal key={i} delay={i * 40}>
                <div>
                  <h2 className="text-xl font-extrabold text-ink">{section.heading}</h2>
                  <p className="mt-3 text-[15px] font-medium leading-relaxed text-gray-600">
                    {section.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Related tools */}
          {relatedTools.length > 0 && (
            <Reveal>
              <div className="mt-12 rounded-3xl border border-line bg-surface p-7 shadow-soft">
                <span className="mb-4 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary">
                  <Wand2 size={14} /> Related free tools
                </span>
                <div className="flex flex-wrap gap-3">
                  {relatedTools.map((tool) => (
                    <Link
                      key={tool.title}
                      to={tool.mode === 'editor' && tool.title === 'Photo Editor' ? '/editor' : `/tool/${tool.key}`}
                      className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-extrabold text-ink shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary"
                    >
                      {tool.title}
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* Article navigation */}
          {(prev || next) && (
            <div className="mt-12 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
              {prev ? (
                <Link
                  to={`/blog/${prev.slug}`}
                  className="group flex flex-col rounded-2xl border border-line bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift"
                >
                  <span className="flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
                    <ArrowLeft size={13} /> Previous
                  </span>
                  <span className="mt-2 text-sm font-extrabold text-ink group-hover:text-primary">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link
                  to={`/blog/${next.slug}`}
                  className="group flex flex-col rounded-2xl border border-line bg-white p-5 text-right shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift"
                >
                  <span className="flex items-center justify-end gap-1 text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
                    Next <ArrowRight size={13} />
                  </span>
                  <span className="mt-2 text-sm font-extrabold text-ink group-hover:text-primary">
                    {next.title}
                  </span>
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
