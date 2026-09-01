import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const BASE_URL = 'https://imageeditify.com'

const tools = [
  'photo-editor', 'compress-image', 'upscale', 'remove-background',
  'meme-generator', 'resize-image', 'crop-image', 'rotate-image',
  'convert-to-jpg', 'convert-from-jpg', 'html-to-image',
  'watermark-image', 'blur-face',
]

const staticPages = [
  { path: '/', priority: '1.0', freq: 'weekly' },
  { path: '/editor', priority: '0.9', freq: 'monthly' },
]

const toolPages = tools.map((slug) => ({
  path: `/tool/${slug}`,
  priority: '0.8',
  freq: 'monthly',
}))

const infoPages = [
  { path: '/blog', priority: '0.7', freq: 'weekly' },
  { path: '/about', priority: '0.5', freq: 'monthly' },
  { path: '/contact', priority: '0.5', freq: 'monthly' },
  { path: '/terms', priority: '0.3', freq: 'yearly' },
  { path: '/privacy', priority: '0.3', freq: 'yearly' },
]

const urls = [...staticPages, ...toolPages, ...infoPages]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${BASE_URL}${u.path}</loc>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const outDir = resolve(__dirname, '..', 'public')
mkdirSync(outDir, { recursive: true })
writeFileSync(resolve(outDir, 'sitemap.xml'), sitemap, 'utf-8')
console.log('sitemap.xml generated')
