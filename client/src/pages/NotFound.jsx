import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Icon from '../components/Icon'
import WhatsAppButton from '../components/WhatsAppButton'

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <SEO title="Page not found" />
      <p className="font-display text-6xl font-semibold text-clay-500">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink">
        That page isn’t here.
      </h1>
      <p className="mt-3 max-w-md text-ink-muted">
        It may have moved. Try the work we’ve published, or just message us.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/work" className="btn-dark">
          See our work
          <Icon name="arrow" className="h-4 w-4" />
        </Link>
        <WhatsAppButton variant="ghost">Message us</WhatsAppButton>
      </div>
    </section>
  )
}
