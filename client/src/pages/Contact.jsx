import { useState } from 'react'
import SEO from '../components/SEO'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import WhatsAppButton from '../components/WhatsAppButton'
import { useContent } from '../context/ContentContext'
import { apiPost } from '../api/client'

export default function Contact() {
  const { site } = useContent()

  const starters = [
    { label: 'I need a website', message: `Hi ${site.name}, I need a website for my business. Can we talk?` },
    {
      label: 'I want to sell online',
      message: `Hi ${site.name}, I'd like to start selling my products online. Where do we begin?`,
    },
    {
      label: 'My social media needs help',
      message: `Hi ${site.name}, my social media pages need managing. Can you help?`,
    },
    {
      label: 'I need branding & content',
      message: `Hi ${site.name}, I'm looking for branding and content work — logo, packaging, photos, video.`,
    },
  ]

  return (
    <>
      <SEO
        title="Contact"
        path="/contact"
        description={`Message Charubala LLC on WhatsApp. Serving ${site.serviceArea}.`}
      />

      <section className="container-x pt-14 sm:pt-20">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
            One message. That’s the whole process.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            WhatsApp is how we work — fastest way to reach us. If you’d rather not, the form below
            goes straight to our enquiry inbox.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="rounded-3xl bg-ink p-8 sm:p-10">
            <h2 className="font-display text-2xl font-semibold text-sand-50">
              Pick whichever is closest
            </h2>
            <p className="mt-2 text-sand-100/65">
              Each one opens WhatsApp with the message already written. Change it however you like.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {starters.map((s) => (
                <WhatsAppButton
                  key={s.label}
                  message={s.message}
                  variant="ghost"
                  className="!justify-start !border-sand-100/20 !text-left !text-sand-100 hover:!border-sand-100/50 hover:!bg-sand-100/5"
                >
                  {s.label}
                </WhatsAppButton>
              ))}
            </div>

            <div className="mt-8 border-t border-sand-100/15 pt-7">
              <WhatsAppButton className="w-full !py-4 !text-base sm:w-auto">
                Or just start a conversation
              </WhatsAppButton>
            </div>
          </Reveal>

          <div className="space-y-4">
            <Reveal className="card p-7">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
                Where we work
              </h2>
              <p className="mt-3 leading-relaxed text-ink-soft">{site.serviceArea}</p>
            </Reveal>

            <Reveal className="card p-7" delay={0.06}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
                Other ways
              </h2>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 flex items-center gap-2 font-medium text-clay-600 hover:text-clay-500"
              >
                {site.email}
                <Icon name="arrow" className="h-4 w-4" />
              </a>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {Object.entries(site.social || {}).map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="capitalize text-ink-soft hover:text-clay-600"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <EnquiryForm />
      </section>
    </>
  )
}

/** Posts to POST /api/leads — stored in MongoDB, readable from your enquiry inbox. */
function EnquiryForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    setError('')

    const form = new FormData(e.currentTarget)
    const payload = Object.fromEntries(form.entries())

    try {
      await apiPost('/leads', { ...payload, source: 'contact' })
      setStatus('sent')
      e.target.reset()
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <Reveal className="mt-6 rounded-3xl border border-moss-500/25 bg-moss-500/[.07] p-8 text-center">
        <h2 className="font-display text-2xl font-semibold text-moss-500">Got it — thank you.</h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-soft">
          Your enquiry is in our inbox. We usually reply the same day. If it’s urgent, WhatsApp is
          faster.
        </p>
        <WhatsAppButton className="mt-6">Message us instead</WhatsAppButton>
      </Reveal>
    )
  }

  const field =
    'w-full rounded-xl border border-ink/15 bg-white/70 px-4 py-3 text-ink placeholder:text-ink-muted/60 ' +
    'focus:border-clay-500 focus:outline-none focus:ring-2 focus:ring-clay-500/20'

  return (
    <Reveal className="mt-6 rounded-3xl border border-ink/10 bg-white/60 p-8 sm:p-10">
      <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
        Prefer to write it out?
      </h2>
      <p className="mt-2 max-w-lg leading-relaxed text-ink-muted">
        Tell us about your business and what you’re stuck on. No obligation — the first
        conversation is just us asking questions.
      </p>

      <form onSubmit={handleSubmit} className="mt-7 grid gap-4 sm:grid-cols-2">
        {/* honeypot — hidden from people, catches bots */}
        <input
          type="text"
          name="website"
          tabIndex="-1"
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-soft">Your name *</span>
          <input name="name" required maxLength={120} className={field} placeholder="Sourav Dutta" />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-soft">Business name</span>
          <input name="business" maxLength={160} className={field} placeholder="Mishti Corner Café" />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-soft">Phone</span>
          <input name="phone" type="tel" maxLength={40} className={field} placeholder="+91 …" />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-soft">Email</span>
          <input name="email" type="email" maxLength={160} className={field} placeholder="you@business.com" />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-ink-soft">
            What do you need? *
          </span>
          <textarea
            name="message"
            required
            rows={4}
            maxLength={3000}
            className={`${field} resize-y`}
            placeholder="We run a café and have nothing online at all…"
          />
        </label>

        <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
          <button type="submit" className="btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send enquiry'}
          </button>
          <span className="text-sm text-ink-muted">or</span>
          <WhatsAppButton variant="ghost">WhatsApp us</WhatsAppButton>
        </div>

        {status === 'error' && (
          <p className="text-sm text-clay-600 sm:col-span-2" role="alert">
            Couldn’t send that — {error}. Please try WhatsApp instead.
          </p>
        )}
      </form>
    </Reveal>
  )
}
