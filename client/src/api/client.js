// In dev, Vite proxies /api to the Express server (see vite.config.js).
// In production set VITE_API_URL to the deployed API origin.
const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

export const apiUrl = (path) => `${BASE}/api${path}`

export async function apiGet(path, { timeout = 8000 } = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)

  try {
    const res = await fetch(apiUrl(path), {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
    return await res.json()
  } finally {
    clearTimeout(timer)
  }
}

export async function apiPost(path, body) {
  const res = await fetch(apiUrl(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `${res.status} ${res.statusText}`)
  return data
}
