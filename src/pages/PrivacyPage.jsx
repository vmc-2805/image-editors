import { Shield } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Reveal from '../components/Reveal.jsx'
import { useSEO } from '../hooks/useSEO.js'

const SECTIONS = [
  {
    title: '1. Privacy-First Architecture',
    content:
      'ImageEditify is built on a privacy-first architecture. All image processing — including AI background removal, filters, adjustments, cropping, and export — happens entirely within your web browser. No image data is ever uploaded to, stored on, or transmitted to any external server.',
  },
  {
    title: '2. Information We Collect',
    content:
      'ImageEditify does not collect any personal information. We do not require account creation, login, or any personally identifiable information (PII) to use the Service. The only data processed is the images you choose to load into the editor, and this processing occurs entirely on your device.',
  },
  {
    title: '3. Cookies and Tracking',
    content:
      'ImageEditify uses only essential technical cookies required for the Service to function properly (such as remembering your editor preferences). We do not use advertising cookies, tracking pixels, or any third-party analytics that tracks your browsing behavior across websites.',
  },
  {
    title: '4. Local Storage',
    content:
      'ImageEditify may use your browser\'s local storage and IndexedDB to save your editor preferences, recent projects, and undo history. This data never leaves your device and is stored only on your local machine. You can clear this data at any time through your browser settings.',
  },
  {
    title: '5. Third-Party Services',
    content:
      'ImageEditify does not integrate with any third-party advertising, analytics, or data collection services. The only external resource loaded is Google Fonts for typography, which is subject to Google\'s own privacy policy.',
  },
  {
    title: '6. AI Background Removal',
    content:
      'The AI Background Removal feature uses a neural network model (@imgly/background-removal) that runs entirely in your browser via WebAssembly. The model is downloaded once and cached locally. Your image data is never sent to any external API or server during this process.',
  },
  {
    title: '7. Data Sharing',
    content:
      'We do not sell, trade, rent, or share any user data with third parties because we do not collect any user data in the first place. There is simply no data to share.',
  },
  {
    title: '8. Children\'s Privacy',
    content:
      'ImageEditify does not knowingly collect any information from children under 13 years of age. Since we do not collect any personal data, the Service is safe for users of all ages.',
  },
  {
    title: '9. Changes to This Policy',
    content:
      'We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated "Last updated" date. We encourage you to review this page periodically to stay informed about how we protect your privacy.',
  },
  {
    title: '10. Your Rights',
    content:
      'Since ImageEditify does not collect, store, or process any of your personal data on external servers, there is no personal data for you to request access to, modify, or delete. Your images and data remain entirely under your control at all times.',
  },
  {
    title: '11. Contact',
    content:
      'If you have any questions or concerns about this Privacy Policy, please reach out to us through our Contact Us page or via email at support@imageeditify.com.',
  },
]

export default function PrivacyPage() {
  useSEO({
    title: 'Privacy Policy',
    description:
      "ImageEditify's privacy policy: your images never leave your device. No uploads, no tracking, no personal data collected. 100% browser-based.",
    path: '/privacy',
  })
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
              <Breadcrumb items={[{ label: 'Privacy Policy' }]} />
            </div>
            <p className="col-span-12 text-sm font-medium leading-relaxed text-emerald-50/65 lg:col-span-6 lg:text-right">
              How we protect your data and respect your privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative overflow-hidden bg-surface py-16">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-3xl border border-line bg-white p-8 shadow-soft sm:p-12">
              <div className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
                <p className="text-sm font-bold text-emerald-800">
                  TL;DR — ImageEditify runs 100% in your browser. Your images never leave your device. We
                  collect zero data.
                </p>
              </div>
              <div className="space-y-10">
                {SECTIONS.map((section, i) => (
                  <Reveal key={i} delay={i * 40}>
                    <div>
                      <h2 className="text-lg font-extrabold text-ink">{section.title}</h2>
                      <p className="mt-3 text-sm font-medium leading-relaxed text-gray-500">
                        {section.content}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
