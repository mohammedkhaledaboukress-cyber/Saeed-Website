# Saeed — Portfolio

A bilingual (Arabic / English) portfolio for a content operations lead, built
as a single long-form page per locale.

**Status: design preview.** The layout and design are finished. Every name,
number, video clip, quote and portrait is a placeholder waiting on real
material — see [`BRIEF.md`](./BRIEF.md) for the full list of what's needed.

---

## Run it

```bash
npm install
npm run dev          # http://localhost:3000 → redirects to /ar
```

```bash
npm run build && npm run start   # production build
npm run typecheck                # types only
```

Routes: `/ar` (default) and `/en`. `/` redirects to `/ar`.

---

## Where the content lives

**Everything is in [`content/site.ts`](./content/site.ts).** One file. No CMS,
no database. Each string carries both languages side by side:

```ts
title: { ar: "من يثق به.", en: "Who trusts him." }
```

Keeping the pair adjacent is deliberate — it's how the two languages stay in
sync instead of drifting apart over time.

That file opens with a checklist of everything still to be replaced. The last
item is `PLACEHOLDER = false`, which removes the preview banner. Don't flip it
until the rest is genuinely done.

### Replacing the videos

Drop real files into `public/video/` using the **same filenames** and nothing
else needs to change:

| File | What it is | Format |
|---|---|---|
| `reel.mp4` | the showreel (also the hero backdrop) | 16:9, 45–75s |
| `work-01…06.mp4` | vertical clips | 9:16, 10–20s |
| `work-07…08.mp4` | landscape clips | 16:9 |
| `ba-01/02-before.mp4` + `-after.mp4` | raw vs. graded pairs | 16:9 |
| `testimonial-01…03.mp4` | testimonial clips | 4:5 |

Put a matching poster frame in `public/img/` with the same name (`reel.jpg`),
so nothing pops in while loading. Export posters straight from the first frame.

H.264 MP4 is all that's needed — every current browser plays it.

---

## Design notes

Worth knowing before changing anything:

- **The type scale lives in `app/globals.css`**, not scattered through
  components. Two sizes do most of the work. Change it in one place.
- **Arabic gets zero letter-spacing.** Tracking breaks the cursive joins, so
  every display class resets it under `[dir="rtl"]`. If you add a new heading
  class, add it to that reset too.
- **Arabic runs looser leading** (1.85 vs 1.6) for the diacritics.
- **One accent colour**, a desaturated champagne, used only on numerals, active
  states and the CTA. Restraint is the whole effect — adding a second accent
  will cost more than it gains.
- **Every loop pauses off-screen.** With a dozen clips on one page, letting
  them all decode at once is what makes a video-heavy site feel cheap.
- Motion is short and eased, never bouncy, and fully disabled under
  `prefers-reduced-motion`.

---

## Deploying

Vercel, free tier:

1. Push the branch and import the repo at [vercel.com/new](https://vercel.com/new).
2. Framework preset: **Next.js**. No environment variables needed.
3. Add the domain under Project → Settings → Domains.

### One thing to watch

Self-hosted video is fine up to roughly **100 MB total**. Past that, move the
clips to a video CDN (Cloudflare Stream or Bunny, a few dollars a month) and
point the `src` fields at the CDN URLs. On Saudi mobile networks a buffering
hero video would undo the entire premium effect — speed is half of what makes
this design read as expensive.
