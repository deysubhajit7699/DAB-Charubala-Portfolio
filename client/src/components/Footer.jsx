import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import Logo from './Logo'
import WhatsAppButton from './WhatsAppButton'

export default function Footer() {
  const { site } = useContent()

  return (
    <footer className="mt-24 bg-ink text-sand-200">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-sand-200/70">
              End-to-end online solutions for rural and urban businesses — websites, e-commerce,
              social media, branding and content.
            </p>
            <WhatsAppButton variant="primary" className="mt-7">
              Start a conversation
            </WhatsAppButton>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-sand-200/50">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                ['/work', 'Work'],
                ['/services', 'Services'],
                ['/team', 'Team'],
                ['/about', 'About'],
                ['/contact', 'Contact'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-sand-200/80 transition-colors hover:text-clay-400">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-sand-200/50">
              Reach us
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-sand-200/70">{site.serviceArea}</p>
            <div className="mt-4 flex gap-4 text-sm">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-clay-400">
                Instagram
              </a>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-clay-400">
                Facebook
              </a>
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-clay-400">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-sand-200/10 pt-6 text-xs text-sand-200/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Built by the team you'd be hiring.</p>
        </div>
      </div>
    </footer>
  )
}
