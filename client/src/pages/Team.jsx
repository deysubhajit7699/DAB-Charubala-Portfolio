import SEO from '../components/SEO'
import Reveal from '../components/Reveal'
import CTASection from '../components/CTASection'
import { useContent } from '../context/ContentContext'

function initials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function Team() {
  const { team } = useContent()

  return (
    <>
      <SEO
        title="Team"
        path="/team"
        description="Meet the four people behind Charubala LLC — Sourav Dutta, Gourango Ghosh, Subhajit Dey and Jyotirmoy."
      />

      <section className="container-x pt-14 sm:pt-20">
        <Reveal>
          <p className="eyebrow">The team</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
            Four people who’ll actually pick up the phone.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
            Small on purpose. You talk to the people doing the work, not to someone relaying
            messages between you and them.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {team.map((person, i) => (
            <Reveal key={person.slug} delay={i * 0.07}>
              <article className="card flex h-full flex-col p-7">
                <div className="flex items-center gap-4">
                  {person.photo ? (
                    <img
                      src={person.photo}
                      alt={person.name}
                      width="112"
                      height="112"
                      loading="lazy"
                      decoding="async"
                      className="h-16 w-16 rounded-2xl bg-sand-200 object-cover"
                    />
                  ) : (
                    <span
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-moss-500 font-display text-xl font-semibold text-sand-100"
                      aria-hidden="true"
                    >
                      {initials(person.name)}
                    </span>
                  )}
                  <div>
                    <h2 className="font-display text-xl font-semibold text-ink">{person.name}</h2>
                    <p className="mt-0.5 text-sm font-medium text-clay-600">{person.role}</p>
                  </div>
                </div>

                <p className="mt-5 flex-1 leading-relaxed text-ink-soft">{person.bio}</p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {person.focus.map((f) => (
                    <li
                      key={f}
                      className="rounded-full bg-sand-200/70 px-3 py-1.5 text-xs font-medium text-ink-soft"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Work with all four of us."
        body="Every project gets the whole team — the developer, the social lead, the content person and someone keeping it on schedule."
      />
    </>
  )
}
