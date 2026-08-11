import { useSearchParams } from 'react-router-dom'
import SEO from '../components/SEO'
import Reveal from '../components/Reveal'
import ProjectCard from '../components/ProjectCard'
import CTASection from '../components/CTASection'
import { useContent } from '../context/ContentContext'

const ALL = 'All'

/** Turns "Cafe & Restaurant" into "cafe-restaurant" for clean, typeable URLs. */
export function toSlug(category) {
  return category
    .toLowerCase()
    .replace(/&/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function Work() {
  const { projects, categories } = useContent()
  const [params, setParams] = useSearchParams()
  const raw = params.get('category')

  // Match on the slug, but also accept the full category name so that both
  // /work?category=cafe-restaurant and /work?category=Cafe%20%26%20Restaurant work.
  const active =
    categories.find((c) => toSlug(c) === raw || c.toLowerCase() === raw?.toLowerCase()) ||
    // Loose prefix match so a half-remembered /work?category=cafe still lands right
    categories.find((c) => raw && toSlug(c).startsWith(toSlug(raw))) ||
    ALL

  const visible = active === ALL ? projects : projects.filter((p) => p.category === active)

  const select = (category) => {
    if (category === ALL) setParams({}, { replace: true })
    else setParams({ category: toSlug(category) }, { replace: true })
  }

  return (
    <>
      <SEO
        title="Work"
        path="/work"
        description="Case studies from Charubala LLC — cafés, retail and e-commerce, social media rebuilds and brand identities for businesses across India."
      />

      <section className="container-x pt-14 sm:pt-20">
        <Reveal>
          <p className="eyebrow">Our work</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
            Real businesses. Real problems. Here’s what we actually built.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
            Pick the category closest to your business — the story will sound familiar.
          </p>
        </Reveal>

        {/* Filter chips — big tap targets, instant, no page reload */}
        <div className="mt-9 flex flex-wrap gap-2.5" role="group" aria-label="Filter projects by category">
          {[ALL, ...categories].map((category) => {
            const isActive = active === category
            return (
              <button
                key={category}
                type="button"
                onClick={() => select(category)}
                aria-pressed={isActive}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-95 ${
                  isActive
                    ? 'border-ink bg-ink text-sand-100'
                    : 'border-ink/15 bg-white/60 text-ink-soft hover:border-ink/40 hover:bg-white'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>

        <p className="mt-5 text-sm text-ink-muted" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'project' : 'projects'}
          {active !== ALL && ` in ${active}`}
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i * 0.06, 0.24)}>
              <ProjectCard project={project} priority={i < 3} />
            </Reveal>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-12 rounded-2xl border border-dashed border-ink/20 p-10 text-center text-ink-muted">
            Nothing published in this category yet — but we’ve almost certainly built something
            close. Ask us on WhatsApp.
          </p>
        )}
      </section>

      <CTASection
        title="See something that looks like your business?"
        body="Tell us which one caught your eye and we’ll tell you what the same approach would look like for you."
      />
    </>
  )
}
