import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { apiGet } from '../api/client'

// Bundled fallback — the same data that seeds the database. If the API is
// cold, slow or unreachable, the site still renders instead of showing a
// spinner in front of a client.
import { projects as fallbackProjects, categories as fallbackCategories } from '../data/projects'
import { team as fallbackTeam } from '../data/team'
import { services as fallbackServices, packages as fallbackPackages } from '../data/services'
import { site as fallbackSite } from '../data/site'

const CACHE_KEY = 'charubala:content:v1'

const fallback = {
  site: fallbackSite,
  categories: fallbackCategories,
  projects: fallbackProjects,
  team: fallbackTeam.map(({ id, ...rest }) => ({ slug: id, ...rest })),
  services: fallbackServices,
  packages: fallbackPackages,
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const ContentContext = createContext({ ...fallback, source: 'fallback', loading: false })

export function ContentProvider({ children }) {
  // Start from cache if we have it, otherwise the bundled data. Either way the
  // first paint is instant — the network request only ever upgrades it.
  const cached = readCache()
  const [content, setContent] = useState(cached || fallback)
  const [source, setSource] = useState(cached ? 'cache' : 'fallback')
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    apiGet('/content')
      .then((data) => {
        if (cancelled || !data?.projects?.length) return
        setContent(data)
        setSource('api')
        setError(null)
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(data))
        } catch {
          // storage full or blocked — not worth failing over
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo(
    () => ({
      ...content,
      source,
      error,
      featuredProjects: content.projects.filter((p) => p.featured),
      getProject: (slug) => content.projects.find((p) => p.slug === slug),
      getService: (slug) => content.services.find((s) => s.slug === slug),
    }),
    [content, source, error]
  )

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent() {
  return useContext(ContentContext)
}
