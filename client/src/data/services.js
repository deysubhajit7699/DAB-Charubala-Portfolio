// ─────────────────────────────────────────────────────────────
// SERVICES + PACKAGE TIERS.
// `icon` maps to a key in src/components/Icon.jsx
// ─────────────────────────────────────────────────────────────

export const services = [
  {
    slug: 'website-development',
    icon: 'globe',
    title: 'Website Development',
    summary: 'A fast, mobile-first website that makes people trust you before they ever call.',
    forWho:
      'Cafés, clinics, salons, workshops, service businesses — anyone who currently exists only on WhatsApp and word of mouth.',
    includes: [
      'Custom design — no recycled templates',
      'Mobile-first build that stays fast on 3G',
      'Google Business Profile setup and local SEO',
      'WhatsApp enquiry button wired in',
      'Content and copywriting for every page',
      'One year of hosting and small changes included',
    ],
    process: [
      { step: 'Conversation', detail: 'We sit down and work out what the site actually has to do for you.' },
      { step: 'Design', detail: 'You see the layout before a line of code is written.' },
      { step: 'Build', detail: 'We develop, you review at the halfway point.' },
      { step: 'Launch', detail: 'Live, indexed on Google, and we show you how to run it.' },
    ],
    timeline: '2–3 weeks',
  },
  {
    slug: 'ecommerce',
    icon: 'cart',
    title: 'E-commerce',
    summary: 'Sell beyond your own street — online payments, delivery and stock you can run from a phone.',
    forWho: 'Shops, artisans, producers and brands with a physical product to sell.',
    includes: [
      'Product catalogue with proper photography',
      'UPI, card and cash-on-delivery checkout',
      'Order and stock management you can use on a phone',
      'Shipping and delivery integration',
      'Instagram and WhatsApp catalogue sync',
      'Hands-on training for your team',
    ],
    process: [
      { step: 'Catalogue', detail: 'We photograph and write up your products properly.' },
      { step: 'Store build', detail: 'Storefront, checkout and payments configured end to end.' },
      { step: 'Test orders', detail: 'We run real orders through before going live.' },
      { step: 'Handover', detail: 'You learn to add products and fulfil orders yourself.' },
    ],
    timeline: '3–5 weeks',
  },
  {
    slug: 'social-media',
    icon: 'chat',
    title: 'Social Media Management',
    summary: 'Consistent posting, real replies, and content built around what your audience responds to.',
    forWho: 'Any business with a page that has gone quiet — or one that posts and hears nothing back.',
    includes: [
      'Monthly content calendar',
      'Post and Reel design, shooting and editing',
      'Caption and hashtag strategy',
      'Comment and DM management',
      'Monthly performance report in plain language',
      'Optional paid promotion management',
    ],
    process: [
      { step: 'Audit', detail: 'We look at what you have and what your competitors are doing.' },
      { step: 'Plan', detail: 'A month of content mapped out and approved by you.' },
      { step: 'Produce', detail: 'We shoot, edit, schedule and publish.' },
      { step: 'Report', detail: 'Monthly numbers, and what we are changing because of them.' },
    ],
    timeline: 'Ongoing, monthly',
  },
  {
    slug: 'content-creation',
    icon: 'camera',
    title: 'Content Creation & Editing',
    summary: 'Photography, video and copy that makes a small business look like a serious one.',
    forWho: 'Businesses that need real assets — not stock photos — for their site, ads and social.',
    includes: [
      'On-location product and premises photography',
      'Short-form video: Reels, Shorts, stories',
      'Professional editing, colour and sound',
      'Copywriting in English and Bengali',
      'A reusable asset library you own outright',
    ],
    process: [
      { step: 'Brief', detail: 'We agree the shot list and what each asset is for.' },
      { step: 'Shoot', detail: 'A day on location at your business.' },
      { step: 'Edit', detail: 'Cut, graded and delivered in every format you need.' },
      { step: 'Deliver', detail: 'Full-resolution files, yours to keep and reuse.' },
    ],
    timeline: '1–2 weeks per shoot',
  },
  {
    slug: 'branding',
    icon: 'spark',
    title: 'Branding',
    summary: 'A name, a look and a voice that hold up next to businesses ten times your size.',
    forWho: 'New businesses launching, and established ones that have outgrown how they look.',
    includes: [
      'Logo design and full identity system',
      'Colour palette and typography',
      'Packaging and label design',
      'Signage and print collateral',
      'Brand guidelines document',
      'Social media templates you can reuse',
    ],
    process: [
      { step: 'Discovery', detail: 'Who you are, who you sell to, who you are up against.' },
      { step: 'Concepts', detail: 'Two or three directions to react to.' },
      { step: 'Refine', detail: 'We take the one you like and sharpen it.' },
      { step: 'Deliver', detail: 'Every file and format, plus the rules for using them.' },
    ],
    timeline: '2–4 weeks',
  },
]

// Optional package tiers. Prices are deliberately left as ranges —
// edit `price` to whatever you actually quote, or set it to 'On request'.
export const packages = [
  {
    name: 'Starter',
    price: 'On request',
    best: 'A small local business getting online for the first time',
    features: [
      'One-page website, mobile-first',
      'Google Business Profile setup',
      'WhatsApp enquiry button',
      'Basic photography (half-day shoot)',
      '1 year hosting included',
    ],
    highlight: false,
  },
  {
    name: 'Growth',
    price: 'On request',
    best: 'A business that needs a site and a social presence working together',
    features: [
      'Multi-page website or small online store',
      'Social media management, 2 platforms',
      '12 posts + 4 Reels a month',
      'Full-day content shoot each month',
      'Monthly performance reporting',
    ],
    highlight: true,
  },
  {
    name: 'Full-Service',
    price: 'On request',
    best: 'A brand that wants the whole online presence handled',
    features: [
      'Full e-commerce build',
      'Complete brand identity and packaging',
      'Social media across all platforms',
      'Ongoing content production',
      'Paid ads management',
      'Priority support',
    ],
    highlight: false,
  },
]

export function getService(slug) {
  return services.find((s) => s.slug === slug)
}
