import { useContent } from '../context/ContentContext'
import Icon from './Icon'

/**
 * Email counterpart to WhatsAppButton. Opens the visitor's mail client with
 * the subject and body already written, same as the WhatsApp deep link does.
 */
export function emailLink(email, subject, body) {
  // encodeURIComponent, not URLSearchParams — the latter encodes spaces as "+",
  // which mail clients show literally in the subject and body.
  const parts = []
  if (subject) parts.push(`subject=${encodeURIComponent(subject)}`)
  if (body) parts.push(`body=${encodeURIComponent(body)}`)

  return `mailto:${email}${parts.length ? `?${parts.join('&')}` : ''}`
}

export default function EmailButton({
  subject,
  body,
  children = 'Email us',
  variant = 'ghost',
  className = '',
}) {
  const { site } = useContent()

  const variants = {
    primary: 'btn-primary',
    dark: 'btn-dark',
    ghost: 'btn-ghost',
    // For use on the dark green CTA panel — outlined, light text
    onDark:
      'btn border border-sand-100/30 text-sand-100 hover:border-sand-100/60 hover:bg-sand-100/10',
  }

  const defaultSubject = `Enquiry for ${site.name}`
  const defaultBody = `Hi ${site.name},\n\nI'd like to talk about getting my business online.\n\nMy business:\nWhat I need:\n\nThanks,\n`

  return (
    <a
      href={emailLink(site.email, subject || defaultSubject, body || defaultBody)}
      className={`${variants[variant] || variants.ghost} ${className}`}
    >
      <Icon name="mail" className="h-[18px] w-[18px]" />
      {children}
    </a>
  )
}
