import { useEffect } from 'react'
import { useContent } from '../context/ContentContext'

/**
 * Per-page <title>, meta, canonical, OG/Twitter cards and optional JSON-LD.
 *
 * Written as a direct head-manipulation effect rather than using a helmet
 * library: this app is client-rendered, so a helmet adds a dependency and a
 * layer of indirection without adding any capability. Every tag it writes is
 * marked data-seo so it can be cleaned up on unmount.
 */

function upsert(selector, create, attrs) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = create()
    el.setAttribute('data-seo', '')
    document.head.appendChild(el)
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
  return el
}

function meta(nameOrProperty, content, isProperty = false) {
  const attr = isProperty ? 'property' : 'name'
  upsert(`meta[${attr}="${nameOrProperty}"]`, () => document.createElement('meta'), {
    [attr]: nameOrProperty,
    content,
  })
}

export default function SEO({ title, description, path = '', image = '/img/og-default.svg', jsonLd }) {
  const { site } = useContent()

  const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.tagline}`
  const desc = description || site.tagline
  const url = `${site.url}${path}`
  const imageUrl = `${site.url}${image}`

  useEffect(() => {
    document.title = fullTitle

    meta('description', desc)

    upsert('link[rel="canonical"]', () => document.createElement('link'), {
      rel: 'canonical',
      href: url,
    })

    meta('og:type', 'website', true)
    meta('og:site_name', site.name, true)
    meta('og:title', fullTitle, true)
    meta('og:description', desc, true)
    meta('og:url', url, true)
    meta('og:image', imageUrl, true)

    meta('twitter:card', 'summary_large_image')
    meta('twitter:title', fullTitle)
    meta('twitter:description', desc)
    meta('twitter:image', imageUrl)
  }, [fullTitle, desc, url, imageUrl, site.name])

  useEffect(() => {
    if (!jsonLd) return

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-seo', '')
    script.textContent = JSON.stringify(jsonLd)
    document.head.appendChild(script)

    return () => script.remove()
  }, [jsonLd])

  return null
}
