import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import CTASection from '../components/CTASection'
import { useContent } from '../context/ContentContext'

const values = [
  {
    title: 'The village and the city get the same work',
    body: 'A weaver in a small town deserves the same build quality as a brand in Kolkata. We don’t keep a cheaper, worse version of ourselves for smaller clients.',
  },
  {
    title: 'Plain language, always',
    body: 'No jargon in meetings, no jargon in invoices. If we can’t explain why something is worth paying for, you shouldn’t pay for it.',
  },
  {
    title: 'Built to survive a bad connection',
    body: 'Most of your customers are on a phone, on mobile data, in a hurry. Everything we build is designed for that reality first.',
  },
  {
    title: 'We hand you the keys',
    body: 'You own your site, your accounts, your photos, your files. No lock-in, no hostage situations.',
  },
]

export default function About() {
  const { site } = useContent()

  return (
    <>
      <SEO
        title="About"
        path="/about"
        description="Why we started Charubala LLC — helping rural and urban businesses across India build a real online presence, without the agency runaround."
      />

      <section className="container-x pt-14 sm:pt-20">
        <Reveal>
          <p className="eyebrow">About us</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
            We started this because good businesses kept losing to worse ones online.
          </h1>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <Reveal className="prose-body max-w-2xl text-lg">
            <p>
              You know the shop. The food is better, the work is better, the owner has been at it
              for twenty years. And then someone opens up down the road with half the skill, a good
              Instagram page and a website that shows up on Google — and the customers go there.
            </p>
            <p>
              That gap has almost nothing to do with quality. It’s a gap in visibility, and it is
              entirely fixable. That’s the whole reason Charubala exists.
            </p>
            <p>
              We’re four people from West Bengal — a founder, a developer, a social media manager
              and a content creator. Between us we can take a business from having no online
              presence at all to a proper website, a working online store, an active social feed
              and a brand that looks like it belongs. All of it in-house, without handing you off
              to three different vendors who don’t talk to each other.
            </p>
            <p>
              We work with rural businesses and urban ones, and we mean that literally — the
              handloom co-operative outside Nadia and the gym in central Kolkata get the same team
              and the same standard. The internet is one of the few places where a village workshop
              can reach a customer in Delhi on equal footing. Our job is to make sure our clients
              can actually use that.
            </p>
            <p>
              We use AI throughout our process — for research, drafting, editing, and moving faster
              than a four-person team should be able to. That’s how we keep this affordable for a
              café owner without cutting the quality. It speeds up the work; it doesn’t replace the
              judgement.
            </p>
          </Reveal>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Reveal className="rounded-3xl bg-moss-500 p-7 text-sand-100">
              <h2 className="font-display text-xl font-semibold text-sand-50">What we're for</h2>
              <p className="mt-3 leading-relaxed text-sand-100/75">
                Making sure that whether a business sits on a highway or down a village lane, the
                people looking for it can find it.
              </p>
              <p className="mt-5 border-t border-sand-100/15 pt-5 text-sm text-sand-100/60">
                {site.serviceArea}
              </p>
            </Reveal>
          </aside>
        </div>

        <div className="mt-20">
          <Reveal>
            <p className="eyebrow">How we work</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Four things we don’t compromise on.
            </h2>
          </Reveal>

          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="card h-full p-7">
                  <h3 className="font-display text-lg font-semibold leading-snug text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-muted">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-12">
          <Link to="/team" className="btn-ghost">
            Meet the four of us
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      <CTASection />
    </>
  )
}
