import { useEffect } from 'react'

const BASE_URL = 'https://imageeditify.com'

const ROBOTS = 'index, follow, max-image-preview:large'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!content) {
    if (el) el.remove()
    return
  }
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function useSEO({ title, description, path = '/', type = 'website' } = {}) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | ImageEditify`
    } else {
      document.title = 'ImageEditify — Free Online Photo Editor | Crop, Resize, Filter & More'
    }
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', `${BASE_URL}${path}`)
    setMeta('property', 'og:type', type)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'robots', ROBOTS)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${BASE_URL}${path}`)
  }, [title, description, path, type])
}
