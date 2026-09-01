import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, Clock, Tag } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Reveal from '../components/Reveal.jsx'
import { BLOG_POSTS } from '../data/blog.js'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS

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
              <Breadcrumb items={[{ label: 'Blog' }]} />
            </div>
            <p className="col-span-12 text-sm font-medium leading-relaxed text-emerald-50/65 lg:col-span-6 lg:text-right">
              Tips, tutorials and guides for photographers and creators.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: 'radial-gradient(rgba(1,38,4,0.05) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-primary">
                The ImageEditify Blog
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Master photo editing,{' '}
                <span className="bg-gradient-to-r from-emerald-700 to-emerald-400 bg-clip-text text-transparent">
                  one guide at a time
                </span>
              </h1>
              <p className="mt-4 text-sm font-medium leading-relaxed text-gray-500 sm:text-base">
                Practical, step-by-step tutorials to help you edit, optimize and share better
                images — all using free, browser-based tools.
              </p>
            </div>
          </Reveal>

          {/* Featured post */}
          <Reveal>
            <Link
              to={`/blog/${featured.slug}`}
              className="group relative mb-10 flex flex-col gap-6 overflow-hidden rounded-3xl border border-line bg-white p-8 shadow-lift transition-all duration-300 hover:-translate-y-1 sm:flex-row sm:items-center"
            >
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(1,38,4,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(1,38,4,0.6) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              <div className="relative w-full overflow-hidden rounded-2xl sm:w-72 sm:shrink-0">
                <img
                  src={featured.image}
                  alt={featured.title}
                  loading="lazy"
                  className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="relative flex-1">
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary">
                  <Tag size={12} /> {featured.category}
                </span>
                <h2 className="text-xl font-extrabold leading-snug text-ink transition-colors group-hover:text-primary sm:text-2xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-sm font-medium leading-relaxed text-gray-500">
                  {featured.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-bold text-gray-400">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={14} /> {formatDate(featured.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} /> {featured.readTime} read
                  </span>
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-extrabold text-primary">
                  Read article <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Grid */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 70}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lift"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                  <span className="mb-3 inline-flex w-max items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary">
                    <Tag size={12} /> {post.category}
                  </span>
                  <h2 className="text-base font-extrabold leading-snug text-ink transition-colors group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm font-medium leading-relaxed text-gray-500">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400">
                      <CalendarDays size={13} /> {formatDate(post.date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400">
                      <Clock size={13} /> {post.readTime}
                    </span>
                  </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
