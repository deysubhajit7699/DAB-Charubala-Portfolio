// ─────────────────────────────────────────────────────────────
// PORTFOLIO. Add a project = add an object to this array.
// `slug` becomes the URL: /work/<slug>
// `category` drives the filter chips on /work (must match categories below)
// `featured: true` puts it on the homepage (first 3 featured are shown)
// Images live in /public/img/ — reference them as "/img/filename.svg"
//
// ⚠️  THE 4 ENTRIES BELOW ARE ILLUSTRATIVE SAMPLES, NOT REAL CLIENTS.
//     Replace them with real work before showing this site to anyone.
// ─────────────────────────────────────────────────────────────

export const categories = [
  'Cafe & Restaurant',
  'Retail & E-commerce',
  'Social Media',
  'Branding & Content',
]

export const projects = [
  {
    slug: 'mishti-corner-cafe',
    title: 'Mishti Corner Café',
    client: 'Mishti Corner, Bardhaman',
    category: 'Cafe & Restaurant',
    year: '2025',
    hook: 'A café with no online presence now takes 40+ table bookings a month from Google.',
    thumbnail: '/img/work-cafe.svg',
    gallery: ['/img/work-cafe.svg', '/img/work-cafe-2.svg'],
    problem:
      'Mishti Corner had a loyal walk-in crowd but was invisible online. People searching "café near me" found their competitors. Their menu lived on a laminated card, so every price change meant a reprint, and they were fielding the same three questions on the phone all day: are you open, where are you, do you deliver.',
    solution:
      'A fast one-page site with the menu, live opening hours, a Google Maps embed and a WhatsApp booking button in the thumb zone. We set up and verified their Google Business Profile, photographed the food properly, and made the menu editable so the owner can change a price in under a minute.',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Google Business Profile', 'WhatsApp Business'],
    outcome:
      'Ranked in the local Google map pack within six weeks. 40+ bookings a month now arrive through the WhatsApp button, and phone interruptions during service dropped sharply because the site answers the basics.',
    fitNote:
      'If you run a café, restaurant or food stall and people still have to phone you to find out your hours, this is the exact setup that fixes it.',
    featured: true,
  },
  {
    slug: 'bengal-handloom-store',
    title: 'Bengal Handloom Store',
    client: 'A weaver co-operative, Nadia',
    category: 'Retail & E-commerce',
    year: '2025',
    hook: 'Took a village weaving collective from local-market-only to shipping saris nationwide.',
    thumbnail: '/img/work-shop.svg',
    gallery: ['/img/work-shop.svg', '/img/work-shop-2.svg'],
    problem:
      'A collective of handloom weavers sold only at weekly local markets, where middlemen took most of the margin. They had no way to reach buyers in other cities, no product photography, and no one on the team had ever processed an online order.',
    solution:
      'A clean storefront with proper product photography, UPI and card checkout, and a shipping flow simple enough to run from a phone. We wrote the product descriptions in English and Bengali, set up an Instagram shop feeding the same catalogue, and trained two members of the collective to add products themselves.',
    techStack: ['React', 'Storefront checkout', 'UPI payments', 'Instagram Shopping', 'Tailwind CSS'],
    outcome:
      'Orders now arrive from Kolkata, Delhi and Bangalore. Selling direct removed the middleman margin, so the weavers keep meaningfully more per sari — and the catalogue doubles as their wholesale pitch.',
    fitNote:
      'If you make or stock a physical product and your reach stops at your own town, this is what opens the rest of the country to you.',
    featured: true,
  },
  {
    slug: 'skyline-fitness-social',
    title: 'Skyline Fitness — Social Rebuild',
    client: 'Skyline Fitness, Kolkata',
    category: 'Social Media',
    year: '2024',
    hook: 'A dormant gym Instagram turned into their single biggest source of new memberships.',
    thumbnail: '/img/work-social.svg',
    gallery: ['/img/work-social.svg', '/img/work-social-2.svg'],
    problem:
      'Skyline posted sporadically — a blurry photo whenever someone remembered — and had stalled at a few hundred followers. Enquiries came in as DMs that went unanswered for days, and they had no idea which posts actually brought people in.',
    solution:
      'A month-by-month content calendar built on what their audience actually responds to: member transformations, 30-second form tips, trainer introductions. We took over shooting and editing Reels, standardised the visual identity, and set up a DM response flow so no enquiry sits longer than an hour.',
    techStack: ['Instagram', 'Reels', 'Meta Business Suite', 'Canva', 'Premiere Pro'],
    outcome:
      'Reach grew several times over in four months and their walk-in conversation now starts with "I saw your Reel." Social overtook referrals as their top source of new memberships.',
    fitNote:
      'If you already have a page but it has gone quiet — or you post and nothing happens — this is the rebuild that makes it earn its keep.',
    featured: true,
  },
  {
    slug: 'aranya-organics-brand',
    title: 'Aranya Organics — Brand & Packaging',
    client: 'Aranya Organics, Siliguri',
    category: 'Branding & Content',
    year: '2024',
    hook: 'A full brand identity that let a local honey producer sit on premium shelves.',
    thumbnail: '/img/work-brand.svg',
    gallery: ['/img/work-brand.svg'],
    problem:
      'Aranya sold excellent forest honey in unlabelled jars. Retailers liked the product but would not stock it — it looked homemade next to branded competitors, and customers had no reason to trust the quality or pay more for it.',
    solution:
      'A complete identity: logo, colour system, typography, label and jar packaging, plus a one-page brand site telling the sourcing story. We shot a short product film and a set of lifestyle photographs the retailers could use in their own marketing.',
    techStack: ['Brand identity', 'Packaging design', 'Product photography', 'Video editing', 'React'],
    outcome:
      'Picked up by several premium grocery stores that had previously declined, and the brand now supports a noticeably higher shelf price than the unbranded jars did.',
    fitNote:
      'If your product is genuinely good but does not look it yet, branding is usually the cheapest lever you have.',
    featured: false,
  },
]

export function getProject(slug) {
  return projects.find((p) => p.slug === slug)
}

export const featuredProjects = projects.filter((p) => p.featured)
