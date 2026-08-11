// ─────────────────────────────────────────────────────────────
// Fallback site config.
//
// This is now SEED + FALLBACK data, not the live source of truth:
//   • `npm run seed` writes these values into MongoDB
//   • the running site reads them from the API via useContent()
//   • if the API is unreachable, the site falls back to what's here
//
// To change these for real, edit them in the database (PUT /api/site)
// or edit here and re-run the seed.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Charubala LLC',
  tagline: 'AI-powered online solutions for businesses that are ready to be found.',
  url: 'https://charubala.com', // TODO: replace with your real domain (used for SEO/OG tags)

  // Country code + number, digits only. 91 = India.
  whatsappNumber: '918436299320',

  email: 'dropinabox@charubala.com',
  serviceArea: 'West Bengal, India — working with clients across India and remotely worldwide',

  social: {
    instagram: 'https://instagram.com/', // TODO
    facebook: 'https://facebook.com/', // TODO
    linkedin: 'https://linkedin.com/', // TODO
  },
}

/**
 * Builds a wa.me deep link with a pre-filled message.
 * `number` comes from the live site config; falls back to the value above.
 */
export function whatsappLink(message, number = site.whatsappNumber, brand = site.name) {
  const text = message || `Hi ${brand}, I'd like to talk about getting my business online.`
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`
}
