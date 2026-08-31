import { FileText } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Reveal from '../components/Reveal.jsx'

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    content:
      'By accessing or using PixelForge ("the Service"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must discontinue use of the Service immediately.',
  },
  {
    title: '2. Description of Service',
    content:
      'PixelForge is a free, browser-based photo editing tool that processes images entirely on your device. No images are uploaded to any server. All editing, filters, AI background removal, and export operations happen locally in your web browser using HTML5 Canvas and WebAssembly technology.',
  },
  {
    title: '3. User Responsibilities',
    content:
      'You are solely responsible for the images you load into PixelForge. You must ensure that you have the legal right to edit and use any image you process through the Service. PixelForge does not claim ownership of any user content.',
  },
  {
    title: '4. Intellectual Property',
    content:
      'All software, code, design, logos, and branding associated with PixelForge are the intellectual property of PixelForge Studio. You may not copy, modify, distribute, or reverse-engineer any part of the Service without prior written consent.',
  },
  {
    title: '5. Prohibited Uses',
    content:
      'You agree not to use the Service for any unlawful purpose, to process images that violate the rights of others, to attempt to exploit or overload the Service, or to use automated tools to access the Service without explicit permission.',
  },
  {
    title: '6. Disclaimer of Warranties',
    content:
      'PixelForge is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the Service will be uninterrupted, error-free, or free of harmful components.',
  },
  {
    title: '7. Limitation of Liability',
    content:
      'In no event shall PixelForge Studio be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of or inability to use the Service. Our total liability shall not exceed the amount you paid us (which is zero for the free tier).',
  },
  {
    title: '8. Service Availability',
    content:
      'We reserve the right to modify, suspend, or discontinue the Service at any time without notice. We shall not be liable for any modification, suspension, or discontinuance of the Service.',
  },
  {
    title: '9. Third-Party Links',
    content:
      'The Service may contain links to third-party websites or services. PixelForge Studio does not endorse and is not responsible for the content or practices of any third-party sites.',
  },
  {
    title: '10. Changes to Terms',
    content:
      'We reserve the right to update these Terms and Conditions at any time. Continued use of the Service after changes constitutes acceptance of the new terms. We encourage you to review this page periodically.',
  },
  {
    title: '11. Governing Law',
    content:
      'These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms shall be resolved in the appropriate courts of jurisdiction.',
  },
  {
    title: '12. Contact',
    content:
      'If you have any questions about these Terms and Conditions, please contact us through our Contact Us page or via email at support@pixelforge.studio.',
  },
]

export default function TermsPage() {
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
              <Breadcrumb items={[{ label: 'Terms & Conditions' }]} />
            </div>
            <p className="col-span-12 text-sm font-medium leading-relaxed text-emerald-50/65 lg:col-span-6 lg:text-right">
              Our terms of service and usage guidelines for PixelForge.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative overflow-hidden bg-surface py-16">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-3xl border border-line bg-white p-8 shadow-soft sm:p-12">
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
