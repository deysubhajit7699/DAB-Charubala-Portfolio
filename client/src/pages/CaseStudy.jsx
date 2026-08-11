import { Link, Navigate, useParams } from 'react-router-dom'
import SEO from '../components/SEO'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import WhatsAppButton from '../components/WhatsAppButton'
import { toSlug } from './Work'
import { useContent } from '../context/ContentContext'

export default function CaseStudy() {
  const { slug } = useParams()
  const { site, projects, getProject } = useContent()
  const project = getProject(slug)

  if (!project) return <Navigate to="/work" replace />

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 2)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    about: project.category,
    description: project.hook,
    url: `${site.url}/work/${project.slug}`,
    creator: { '@type': 'Organization', name: site.name },
  }

  return (
    <>
      <SEO
        title={project.title}
        path={`/work/${project.slug}`}
        description={project.hook}
        image={project.thumbnail}
        jsonLd={jsonLd}
      />

      <article className="container-x pt-10 sm:pt-14">
        <Link
          to={`/work?category=${toSlug(project.category)}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
        >
          <Icon name="arrow" className="h-4 w-4 rotate-180" />
          Back to {project.category}
        </Link>

        {/* ── Header ─────────────────────────────────────── */}
        <header className="mt-7 max-w-3xl">
          <p className="eyebrow">
            {project.category} · {project.year}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft sm:text-xl">{project.hook}</p>
          {project.client && <p className="mt-4 text-sm text-ink-muted">{project.client}</p>}
        </header>

        {/* ── Hero image ─────────────────────────────────── */}
        <Reveal className="mt-10 overflow-hidden rounded-3xl border border-ink/10 bg-sand-200">
          <img
            src={project.thumbnail}
            alt={`${project.title} — main screen`}
            width="1600"
            height="1000"
            fetchpriority="high"
            decoding="async"
            className="aspect-[16/10] w-full object-cover"
          />
        </Reveal>

        {/* ── The story ──────────────────────────────────── */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div>
            <Section title="The problem" body={project.problem} />
            <Section title="What we built" body={project.solution} className="mt-10" />

            <Reveal className="mt-10 rounded-2xl border border-moss-500/20 bg-moss-500/[.06] p-7">
              <h2 className="eyebrow !text-moss-500">The outcome</h2>
              <p className="mt-3 text-lg leading-relaxed text-ink-soft">{project.outcome}</p>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Reveal className="card p-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
                What we used
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full bg-sand-200/70 px-3 py-1.5 text-xs font-medium text-ink-soft"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-ink/10 pt-5">
                <p className="text-sm leading-relaxed text-ink-muted">
                  Want the same for your business?
                </p>
                <WhatsAppButton
                  className="mt-4 w-full"
                  message={`Hi ${site.name}, I saw the ${project.title} case study on your site. Could we do something similar for my business?`}
                >
                  Ask about this
                </WhatsAppButton>
              </div>
            </Reveal>
          </aside>
        </div>

        {/* ── Gallery ────────────────────────────────────── */}
        {project.gallery?.length > 1 && (
          <section className="mt-16">
            <h2 className="eyebrow">A closer look</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {project.gallery.map((src, i) => (
                <Reveal key={src + i} delay={i * 0.06}>
                  <img
                    src={src}
                    alt={`${project.title} — screen ${i + 1}`}
                    width="1200"
                    height="750"
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10] w-full rounded-2xl border border-ink/10 bg-sand-200 object-cover"
                  />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ── Closing pitch — the line to read out loud in a meeting ── */}
        <Reveal className="mt-16 rounded-3xl bg-ink px-7 py-12 sm:px-12 sm:py-14">
          <p className="eyebrow !text-gold">This could work for you if…</p>
          <p className="mt-4 max-w-2xl font-display text-2xl font-medium leading-snug text-sand-100 sm:text-3xl">
            {project.fitNote}
          </p>
          <WhatsAppButton
            className="mt-8"
            message={`Hi ${site.name}, I read the ${project.title} case study — I think my business has the same problem.`}
          >
            That’s my business — let’s talk
          </WhatsAppButton>
        </Reveal>

        {/* ── Next projects ──────────────────────────────── */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="eyebrow">More work</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to={`/work/${p.slug}`}
                  className="card group flex min-w-0 items-center gap-5 p-4 hover:border-ink/25 hover:shadow-lg hover:shadow-ink/5"
                >
                  <img
                    src={p.thumbnail}
                    alt=""
                    width="160"
                    height="160"
                    loading="lazy"
                    decoding="async"
                    className="h-20 w-24 shrink-0 rounded-xl bg-sand-200 object-cover"
                  />
                  {/* block + min-w-0 so the flex child can actually shrink and truncate */}
                  <span className="block min-w-0 flex-1">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-clay-600">
                      {p.category}
                    </span>
                    <span className="mt-1 block font-display text-lg font-semibold text-ink">
                      {p.title}
                    </span>
                    <span className="mt-0.5 block truncate text-sm text-ink-muted">{p.hook}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  )
}

function Section({ title, body, className = '' }) {
  return (
    <Reveal className={className}>
      <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">{title}</h2>
      <p className="mt-3 text-base leading-relaxed text-ink-soft sm:text-lg">{body}</p>
    </Reveal>
  )
}
