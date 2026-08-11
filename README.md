# Charubala LLC — Agency Site (MERN)

MongoDB + Express + React + Node. Two apps in one repo:

- **`client/`** — React 18, Vite, Tailwind, React Router, Framer Motion
- **`server/`** — Express API + Mongoose models, talking to MongoDB

Content (projects, team, services, packages, site settings) lives in MongoDB and is served as
JSON. Enquiries submitted through the contact form are stored in Mongo too. WhatsApp is still the
primary CTA everywhere else.

## Run it

```bash
npm run install:all          # installs root + client + server
cp server/.env.example server/.env   # then edit MONGODB_URI / ADMIN_KEY
npm run seed                 # loads starter content into MongoDB
npm start                    # runs client (5173) + server (5000) together
```

Needs a MongoDB instance — either local (`mongodb://127.0.0.1:27017/charubala`) or a free
[Atlas](https://www.mongodb.com/atlas) cluster. Put the connection string in `server/.env`.

| Command | What it does |
|---|---|
| `npm start` / `npm run dev` | Both client and server, concurrently |
| `npm run dev:client` / `npm run dev:server` | Just one side |
| `npm run build` | Production client build → `client/dist/` |
| `npm run seed` | Upsert starter content into MongoDB (safe to re-run) |
| `npm run seed:fresh` | Wipe content collections first, then seed (leads untouched) |

---

## Before you show this to anyone

1. **`server/.env` → `ADMIN_KEY`** — still the placeholder. This key gates every write route
   (create/edit/delete project, read the leads inbox). Generate a real one:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
2. **The four seeded projects are illustrative samples, not real clients.** Replace them — see
   "Editing content" below — before any client meeting.
3. **`client/src/data/site.js` → `url` and `social`** — real domain and profile links (WhatsApp
   number and email are already set). Also update `client/public/sitemap.xml` and `robots.txt`.
4. **`client/public/img/og-default.svg`** — WhatsApp/Facebook don't render SVG link previews.
   Export a 1200×630 PNG, save as `og-default.png`, and point `SEO.jsx`'s default at it.

---

## Editing content

Two ways, same data:

**A — through the API** (works once deployed, no redeploy needed):
```bash
curl -X PUT http://localhost:5000/api/projects/mishti-corner-cafe \
  -H "Content-Type: application/json" -H "x-admin-key: <your ADMIN_KEY>" \
  -d '{"outcome": "Updated outcome text..."}'
```
Every resource (`/api/projects`, `/api/team`, `/api/services`, `/api/packages`, `/api/site`)
supports `GET` (public), and `POST` / `PUT /:slug` / `DELETE /:slug` (admin key required, header
`x-admin-key`). `PUT /api/site` updates WhatsApp number, email, socials, categories, etc.

**B — edit the seed data and re-run the seed** (good for bulk changes):
Edit `client/src/data/projects.js` / `team.js` / `services.js` / `site.js`, then:
```bash
npm run seed
```
It upserts by `slug` (or `name` for packages), so re-running is safe. These files also double as
the **offline fallback** — if the API is ever unreachable, the site renders from them instead of
showing a blank page.

Project shape (unchanged from before):
```js
{
  slug: 'client-name', title: 'Client Name', client: 'Client, Town',
  category: 'Cafe & Restaurant', year: '2026',
  hook: 'One line — the result, not the description.',
  thumbnail: '/img/client-name.jpg', gallery: ['/img/client-name.jpg'],
  problem: '...', solution: '...', techStack: ['React'], outcome: '...',
  fitNote: 'This could work for you if…', featured: true,
}
```
Images still live as static files in `client/public/img/`.

---

## The enquiry inbox

The Contact page has a form (in addition to WhatsApp) that posts to `POST /api/leads` — public,
rate-limited, with a honeypot field against bots. Read submissions:

```bash
curl http://localhost:5000/api/leads -H "x-admin-key: <your ADMIN_KEY>"
```

Update a lead's pipeline status (`new` → `contacted` → `won` / `closed`):
```bash
curl -X PUT http://localhost:5000/api/leads/<id> \
  -H "Content-Type: application/json" -H "x-admin-key: <your ADMIN_KEY>" \
  -d '{"status": "contacted"}'
```

---

## Using this in a client meeting

- **Deep links work**: `/work/mishti-corner-cafe`, `/work?category=cafe-restaurant`,
  `/work?category=cafe` (partial matches resolve), `/services#social-media`.
- **One network request per visit, not per page.** The client fetches `GET /api/content` once on
  load — every project/team/service/package — and every page renders from that in memory. Also
  cached to `localStorage` and backed by a bundled fallback, so a slow or dropped connection mid-demo
  never shows a blank screen.
- Filter chips are large tap targets, filter instantly, no reload.
- Every case study ends with a WhatsApp button pre-filled with that project's name.
- A sticky WhatsApp bar sits at the bottom on mobile.

---

## Architecture notes

- **Why one `/api/content` endpoint instead of REST-per-page:** this site gets navigated live, in
  person, sometimes on bad mobile data. One request on load beats five requests during a walkthrough.
  The admin CRUD routes (`/api/projects/:slug` etc.) still exist underneath for editing.
- **Why a bundled fallback:** if the API is cold-starting (free-tier hosting) or the network drops,
  the site still renders from `client/src/data/*.js` instead of showing nothing.
- **Why `ADMIN_KEY` and not real auth:** this is a 4-person team editing their own site, not a
  multi-tenant product. A shared secret in `server/.env` is the appropriately small amount of
  security for that — swap for real auth if the team grows or admin access needs to be revoked
  per-person.

## Deploying

**Client** → Vercel (static). `client/vercel.json` handles SPA rewrites. Set `VITE_API_URL` in
Vercel's env vars to your deployed API origin (e.g. `https://api.charubala.com`).

**Server** → any Node host with env vars support (Render, Railway, Fly.io). Set `MONGODB_URI`,
`ADMIN_KEY`, `CLIENT_ORIGIN` (your Vercel domain), `NODE_ENV=production`.

**Single-deployment option:** set `SERVE_CLIENT=true` on the server and run `npm run build` first —
Express will also serve `client/dist`, so one Node host runs the whole thing.

## Design system

Set in `client/tailwind.config.js`.

| Token | Value | Use |
|---|---|---|
| `ink` | `#141210` | Text, dark panels |
| `sand-50/100/200` | `#FDFBF7` → `#EFE6D7` | Backgrounds |
| `clay-500` | `#C9552A` | Primary accent, buttons |
| `moss-500` | `#1F4E46` | Secondary panels |
| `gold` | `#D9A441` | Highlights |

Reusable classes in `client/src/index.css`: `.container-x`, `.btn-primary`, `.btn-ghost`,
`.btn-dark`, `.eyebrow`, `.card`.
