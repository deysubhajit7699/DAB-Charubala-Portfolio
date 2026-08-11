import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import ProjectCard from '../components/ProjectCard'
import SectionHeading from '../components/SectionHeading'
import CTASection from '../components/CTASection'
import WhatsAppButton from '../components/WhatsAppButton'
import { useContent } from '../context/ContentContext'

export default function Home() {
  const { site, services, team, featuredProjects } = useContent()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.name,
    description: site.tagline,
    url: site.url,
    areaServed: site.serviceArea,
    serviceType: services.map((s) => s.title),
  }

  return (
    <>
      <SEO
        description="Charubala LLC builds websites, online stores, social media and brands for rural and urban businesses. Small team, real work, one WhatsApp message away."
        jsonLd={jsonLd}
      />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-40 -top-52 h-[34rem] w-[34rem] rounded-full bg-clay-400/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-52 top-24 h-96 w-96 rounded-full bg-moss-500/[.07] blur-3xl"
          aria-hidden="true"
        />

        <div className="container-x relative py-16 sm:py-24 lg:py-28">
          <div className="max-w-3xl">
            <p className="animate-fade-up eyebrow" style={{ animationDelay: '.05s' }}>
              A four-person studio · West Bengal
            </p>

            <h1
              className="animate-fade-up mt-5 font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]"
              style={{ animationDelay: '.12s' }}
            >
              We take good businesses{' '}
              <span className="relative whitespace-nowrap text-clay-500">
                online
                <svg
                  className="absolute -bottom-1.5 left-0 h-3 w-full text-gold/60"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M2 8c40-6 90-7 196-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>{' '}
              — properly.
            </h1>

            <p
              className="animate-fade-up mt-7 max-w-xl text-lg leading-relaxed text-ink-muted sm:text-xl"
              style={{ animationDelay: '.22s' }}
            >
              Websites, online stores, social media, branding and content. AI-powered, end to end,
              and built for real businesses — the café on the corner as readily as the brand
              scaling nationwide.
            </p>

            <div
              className="animate-fade-up mt-9 flex flex-wrap items-center gap-3"
              style={{ animationDelay: '.32s' }}
            >
              <WhatsAppButton className="!px-7 !py-3.5 !text-base">
                Talk to us on WhatsApp
              </WhatsAppButton>
              <Link to="/work" className="btn-ghost !px-6 !py-3.5 !text-base">
                See our work
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>

            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-ink/10 pt-8">
              {[
                ['End to end', 'Design, build, content, launch'],
                ['2–3 weeks', 'Typical website turnaround'],
                ['One number', 'WhatsApp, not a ticket queue'],
              ].map(([big, small]) => (
                <div key={big}>
                  <dt className="font-display text-[15px] font-semibold leading-tight text-ink sm:text-xl">
                    {big}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-ink-muted sm:text-sm">{small}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── What we do ─────────────────────────────────────── */}
      <section className="container-x mt-16 sm:mt-24">
        <SectionHeading
          eyebrow="What we do"
          title="Everything you need to exist online, under one roof."
          intro="No handing you off to three different vendors. The same four people design it, build it, film it and keep it running."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 4).map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.06}>
              <Link
                to={`/services#${service.slug}`}
                className="card group flex h-full flex-col p-6 hover:-translate-y-1 hover:border-clay-400/40 hover:shadow-lg hover:shadow-ink/5"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-clay-500/10 text-clay-600 transition-colors group-hover:bg-clay-500 group-hover:text-white">
                  <Icon name={service.icon} />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{service.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-clay-600">
                  Details
                  <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Featured work ──────────────────────────────────── */}
      <section className="container-x mt-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected work"
            title="Businesses that were invisible online. Then weren’t."
          />
          <Reveal>
            <Link to="/work" className="btn-ghost">
              All projects
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.slice(0, 3).map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.07}>
              <ProjectCard project={project} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Team teaser ────────────────────────────────────── */}
      <section className="container-x mt-24">
        <Reveal className="overflow-hidden rounded-3xl border border-ink/10 bg-white/60">
          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow">The team</p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-4xl">
                Four people. You’ll know all of their names.
              </h2>
              <p className="mt-4 max-w-lg leading-relaxed text-ink-muted">
                No account managers, no layers. The person who designs your site is the person you
                message when you want a price changed.
              </p>
              <Link to="/team" className="btn-dark mt-7">
                Meet the team
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {team.map((person) => (
                <li key={person.slug} className="rounded-2xl bg-sand-100 p-4">
                  <p className="font-display text-base font-semibold text-ink">{person.name}</p>
                  <p className="mt-1 text-xs leading-snug text-ink-muted">{person.role}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <CTASection />
    </>
  )
}
