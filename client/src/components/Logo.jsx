export default function Logo({ className = 'h-9 w-9', light = false }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
        <rect width="40" height="40" rx="11" fill={light ? '#F8F3EA' : '#141210'} />
        <path
          d="M27.5 14.2c-1.7-2-4.2-3.2-7-3.2-5 0-9 4-9 9s4 9 9 9c2.8 0 5.3-1.2 7-3.2"
          fill="none"
          stroke="#C9552A"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <circle cx="28" cy="20" r="2.6" fill="#D9A441" />
      </svg>
      <span
        className={`font-display text-lg font-semibold tracking-tight ${
          light ? 'text-sand-100' : 'text-ink'
        }`}
      >
        Charubala
      </span>
    </span>
  )
}
