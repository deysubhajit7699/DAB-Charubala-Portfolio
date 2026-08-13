// Inline SVG icons — no icon library, no extra network request.
const paths = {
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.5a2 2 0 0 0 2-1.6L20.5 8H6" />
      <circle cx="10" cy="20" r="1.2" />
      <circle cx="18" cy="20" r="1.2" />
    </>
  ),
  chat: (
    <>
      <path d="M21 12a8 8 0 0 1-8 8H8l-5 3 1.4-4.4A8 8 0 1 1 21 12Z" />
      <path d="M8.5 11h7M8.5 14.5h4" />
    </>
  ),
  camera: (
    <>
      <path d="M3 8.5A2 2 0 0 1 5 6.5h2l1.4-2h7.2L17 6.5h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  spark: (
    <>
      <path d="M12 2.5 14.2 9l6.5 2.2-6.5 2.2L12 20l-2.2-6.6L3.3 11.2 9.8 9Z" />
      <path d="M19 3.5v3M17.5 5h3" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="m3.5 7 7.6 5.4a1.6 1.6 0 0 0 1.8 0L20.5 7" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="m5 13 4.5 4.5L19 7" />,
  whatsapp: null, // rendered separately below (filled, not stroked)
}

export default function Icon({ name, className = 'h-5 w-5', ...rest }) {
  if (name === 'whatsapp') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...rest}>
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35ZM12.04 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.35-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.19 4.23-9.41 9.43-9.41a9.37 9.37 0 0 1 9.42 9.42c0 5.19-4.23 9.41-9.43 9.41Zm8.02-17.43A11.29 11.29 0 0 0 12.04.75C5.81.75.75 5.81.75 12.03c0 1.99.52 3.93 1.51 5.64L.66 23.25l5.72-1.5a11.28 11.28 0 0 0 5.66 1.44h.01c6.23 0 11.29-5.06 11.29-11.28 0-3.01-1.18-5.85-3.3-7.98Z" />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {paths[name] ?? paths.spark}
    </svg>
  )
}
