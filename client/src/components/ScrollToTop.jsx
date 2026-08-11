import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Jump to top on route change — but not when only the query string changed
 *  (portfolio filtering shouldn't yank the page around mid-demo). */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
