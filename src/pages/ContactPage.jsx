import { useState } from 'react'
import { Mail, MessageSquare, Send, MapPin, Clock } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Reveal from '../components/Reveal.jsx'

const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'Email',
    value: 'support@pixelforge.studio',
    desc: 'We reply within 24 hours',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: '100% Remote',
    desc: 'We work from everywhere',
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Within 24 hours',
    desc: 'Monday to Friday',
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

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
              <Breadcrumb items={[{ label: 'Contact Us' }]} />
            </div>
            <p className="col-span-12 text-sm font-medium leading-relaxed text-emerald-50/65 lg:col-span-6 lg:text-right">
              Have a question or feedback? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative overflow-hidden bg-surface py-16">
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
            {/* Info cards */}
            <Reveal>
              <div className="space-y-5">
                {CONTACT_INFO.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lift"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-emerald-700 text-white">
                      <item.icon size={19} strokeWidth={2.1} />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{item.label}</p>
                      <p className="mt-0.5 text-sm font-extrabold text-ink">{item.value}</p>
                      <p className="mt-0.5 text-xs font-medium text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Contact form */}
            <Reveal delay={100}>
              <div className="rounded-3xl border border-line bg-white p-8 shadow-soft sm:p-10">
                {submitted ? (
                  <div className="flex flex-col items-center py-12 text-center">
                    <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Send size={28} />
                    </span>
                    <h3 className="text-xl font-extrabold text-ink">Message Sent!</h3>
                    <p className="mt-2 text-sm font-medium text-gray-500">
                      Thanks for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false)
                        setForm({ name: '', email: '', subject: '', message: '' })
                      }}
                      className="mt-6 rounded-xl bg-primary px-6 py-2.5 text-sm font-extrabold text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-700"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm font-semibold text-ink outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm font-semibold text-ink outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm font-semibold text-ink outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder="How can we help?"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
                        Message
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        className="w-full resize-none rounded-xl border border-line bg-surface px-4 py-3 text-sm font-semibold text-ink outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder="Tell us more..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-emerald-700 px-6 py-3.5 text-sm font-extrabold text-white shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                    >
                      <Send size={16} /> Send Message
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
