import { whatsappLink } from '../data/site'
import { useContent } from '../context/ContentContext'
import Icon from './Icon'

/** The primary contact action on the site. Number comes from the live site config. */
export default function WhatsAppButton({
  message,
  children = 'Talk to us on WhatsApp',
  variant = 'primary',
  className = '',
}) {
  const { site } = useContent()

  const variants = {
    primary: 'btn-primary',
    dark: 'btn-dark',
    ghost: 'btn-ghost',
  }

  return (
    <a
      href={whatsappLink(message, site.whatsappNumber, site.name)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${variants[variant]} ${className}`}
    >
      <Icon name="whatsapp" className="h-[18px] w-[18px]" />
      {children}
    </a>
  )
}

/** Fixed mobile-only bar so the CTA is always one thumb-tap away during a demo. */
export function WhatsAppFloating() {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 px-5 sm:hidden">
      <WhatsAppButton className="w-full shadow-xl shadow-clay-600/30">
        Start a conversation
      </WhatsAppButton>
    </div>
  )
}
