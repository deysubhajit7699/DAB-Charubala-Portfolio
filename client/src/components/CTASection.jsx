import Reveal from './Reveal'
import WhatsAppButton from './WhatsAppButton'
import EmailButton from './EmailButton'

export default function CTASection({
  title = 'Let’s get your business found online.',
  body = 'One message — WhatsApp or email, whichever suits you. We’ll ask a few questions, tell you honestly what you need — and what you don’t.',
  message,
  emailSubject,
  emailBody,
}) {
  return (
    <section className="container-x mt-24">
      <Reveal className="relative overflow-hidden rounded-3xl bg-moss-500 px-7 py-14 text-center sm:px-14 sm:py-20">
        <div
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-clay-400/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-gold/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold leading-[1.15] tracking-tight text-sand-50 sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-sand-100/75">{body}</p>
          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <WhatsAppButton message={message}>Message us on WhatsApp</WhatsAppButton>
            <EmailButton variant="onDark" subject={emailSubject} body={emailBody}>
              Email us instead
            </EmailButton>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
