import { Link } from 'react-router-dom'
import Icon from './Icon'

export default function ProjectCard({ project, priority = false }) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className="card group overflow-hidden hover:-translate-y-1 hover:border-ink/20 hover:shadow-xl hover:shadow-ink/[.07]"
    >
      <div className="aspect-[16/10] overflow-hidden bg-sand-200">
        <img
          src={project.thumbnail}
          alt={`${project.title} — project thumbnail`}
          width="800"
          height="500"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="p-6">
        <span className="eyebrow">{project.category}</span>
        <h3 className="mt-2.5 font-display text-xl font-semibold leading-snug text-ink">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{project.hook}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-clay-600">
          See the case study
          <Icon name="arrow" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
