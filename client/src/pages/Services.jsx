import SEO from '../components/SEO'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import CTASection from '../components/CTASection'
import WhatsAppButton from '../components/WhatsAppButton'
import { useContent } from '../context/ContentContext'

export default function Services() {
  const { site, services, packages } = useContent()

  return (
    <>
      <SEO
        title="Services"
        path="/services"
        description="Website development, e-commerce, social media management, content creation and branding — what's included, who it's for, and how long it takes."
      />

      <section className="container-x pt-14 sm:pt-20">
        <Reveal>
          <p className="eyebrow">Services</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
            Five things we do. All of them properly.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
            Take one, or take the lot. Most businesses start with a website and add social once
            people are actually finding them.
          </p>
        </Reveal>

        {/* Quick jump — useful when demoing a specific service live */}
        <div className="mt-8 flex flex-wrap gap-2">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="rounded-full border border-ink/15 bg-white/60 px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-ink/40 hover:bg-white"
            >
              {s.title}
            </a>
          ))}
        </div>
      </section>

      <div className="container-x mt-14 space-y-6">
        {services.map((service, i) => (
          <Reveal key={service.slug} delay={0.04}>
            <section
              id={service.slug}
              className="scroll-mt-24 overflow-hidden rounded-3xl border border-ink/10 bg-white/60"
            >
              <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_1.15fr]">
                <div>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-clay-500/10 text-clay-600">
                    <Icon name={service.icon} className="h-6 w-6" />
                  </span>
                  <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-ink-soft">{service.summary}</p>

                  <div className="mt-6 rounded-2xl bg-sand-100 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
                      Who it’s for
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{service.forWho}</p>
                  </div>

                  <p className="mt-5 text-sm text-ink-muted">
                    <span className="font-semibold text-ink">Typical timeline:</span>{' '}
                    {service.timeline}
                  </p>

                  <WhatsAppButton
                    variant="ghost"
                    className="mt-6"
                    message={`Hi ${site.name}, I'd like to know more about your ${service.title} service.`}
                  >
                    Ask about {service.title}
                  </WhatsAppButton>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:gap-10">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
                      What’s included
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {service.includes.map((item) => (
                        <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                          <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-clay-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
                      How it goes
                    </h3>
                    <ol className="mt-4 space-y-4">
                      {service.process.map((p, idx) => (
                        <li key={p.step} className="flex gap-3">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-[11px] font-bold text-sand-100">
                            {idx + 1}
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-ink">{p.step}</span>
                            <span className="mt-0.5 block text-sm leading-relaxed text-ink-muted">
                              {p.detail}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      {/* ── Packages ───────────────────────────────────────── */}
      <section className="container-x mt-24">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Packages</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-4xl">
            Or start from one of these.
          </h2>
          <p className="mt-4 leading-relaxed text-ink-muted">
            Rough shapes, not rigid boxes — we’ll adjust to what your business actually needs and
            quote once we understand it.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 0.07}>
              <div
                className={`flex h-full flex-col rounded-3xl p-7 ${
                  pkg.highlight
                    ? 'bg-ink text-sand-100 shadow-xl shadow-ink/20'
                    : 'border border-ink/10 bg-white/60'
                }`}
              >
                {pkg.highlight && (
                  <span className="mb-4 self-start rounded-full bg-clay-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    Most popular
                  </span>
                )}
                <h3
                  className={`font-display text-2xl font-semibold ${
                    pkg.highlight ? 'text-sand-50' : 'text-ink'
                  }`}
                >
                  {pkg.name}
                </h3>
                <p
                  className={`mt-1.5 text-sm leading-relaxed ${
                    pkg.highlight ? 'text-sand-100/65' : 'text-ink-muted'
                  }`}
                >
                  {pkg.best}
                </p>
                <p
                  className={`mt-5 font-display text-xl font-semibold ${
                    pkg.highlight ? 'text-gold' : 'text-clay-600'
                  }`}
                >
                  {pkg.price}
                </p>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {pkg.features.map((f) => (
                    <li
                      key={f}
                      className={`flex gap-2.5 text-sm leading-relaxed ${
                        pkg.highlight ? 'text-sand-100/80' : 'text-ink-soft'
                      }`}
                    >
                      <Icon
                        name="check"
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          pkg.highlight ? 'text-gold' : 'text-clay-500'
                        }`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <WhatsAppButton
                  variant={pkg.highlight ? 'primary' : 'ghost'}
                  className="mt-7 w-full"
                  message={`Hi ${site.name}, I'm interested in the ${pkg.name} package.`}
                >
                  Get a quote
                </WhatsAppButton>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Not sure which one you need?"
        body="Tell us about your business in a message. We’ll tell you what would actually move the needle — even if it’s the cheapest option."
      />
    </>
  )
}
