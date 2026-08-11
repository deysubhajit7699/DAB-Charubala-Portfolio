import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, intro, align = 'left', className = '' }) {
  const centered = align === 'center'

  return (
    <Reveal className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">{intro}</p>}
    </Reveal>
  )
}
