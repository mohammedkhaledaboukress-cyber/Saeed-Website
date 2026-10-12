# Saeed — Portfolio Site: Intake Brief

**Purpose of the site:** when a prospective client asks Saeed "who are you, what do you
actually do, and who vouches for you" — he sends one link instead of a folder of WeTransfers.

**Target quality bar:** Apple-level. See "What 'Apple level' actually means" at the bottom so
we're aiming at the same thing.

---

## 0. Decisions only you and Saeed can make

These block the copy and the information architecture, not just the styling.

- [ ] **His name, exactly as it should appear.** Arabic spelling + the Latin transliteration he
      prefers. This goes in the logo, the title tag, and the domain.
- [ ] **His positioning line.** Pick one:
      - "Video Editor" — undersells him badly at this point.
      - "Content Production Manager" — accurate, but sounds like an employee.
      - "Head of Content / Content Systems" — what he actually does: builds and runs content
        operations, hires and directs editors/clippers/designers, owns output.
      My read: he's past "editor." He builds content machines and runs them. That's rarer,
      harder to replace, and prices higher. But he has to be comfortable claiming it.
- [ ] **Who is he selling to?** The site reads very differently for each:
      - (A) More fitness influencers who want the same growth he produced.
      - (B) Brands / agencies buying production.
      - (C) Companies hiring him as a production lead (a job, not a client).
      Pick a primary. A site that tries to speak to all three speaks to none.
- [ ] **Language.** Arabic-first, English-first, or a real bilingual build with a toggle.
      This is an architecture decision, not a translation task — Arabic means RTL layout,
      a second typeface, and mirrored spacing. Decide before I build, not after.
- [ ] **Pricing visible or not?** For premium positioning, usually not. "Starting from" bands
      are the middle ground.
- [ ] **Domain.** Does he own one? Which registrar?

---

## 1. The work — this is ~70% of whether it lands

No amount of CSS rescues weak assets. This section decides the outcome.

- [ ] **Showreel: 45–75 seconds.** The hero of the entire page. High-bitrate H.264 or ProRes,
      1080p minimum, 4K preferred. **If one doesn't exist, this is the single highest-value
      thing he can do this week.** Cutting his own reel is the job.
- [ ] **8–12 hero clips as original files** — 10–20s each, the strongest moment of each piece.
      Both 9:16 and 16:9 versions where they exist.
      > **Not social embeds.** Instagram/TikTok/YouTube embeds drag in their own UI, logos,
      > cookie prompts and ~1MB of JavaScript each. They will make the site feel cheap and
      > slow. Self-hosted silent autoplay loops are what make a site feel expensive. I need
      > the actual files.
- [ ] **Per clip, the context:** client, date, format (long-form / reel / ad / podcast cut),
      **his exact role** (edited it himself / directed / supervised / wrote the strategy), and
      the result if known (views, saves, follower spike, conversions).
- [ ] **Before/after pairs** — raw camera footage next to the finished cut, 2 or 3 of them.
      For an editor this is the most persuasive thing that can go on a portfolio and almost
      nobody does it. It shows the value he adds, not just the output.
- [ ] **Poster frames / stills** for each video, so nothing pops in while loading.
- [ ] **Any graphics, thumbnails, motion design, or lower-thirds he built** — PNG or SVG.

## 2. Proof — numbers beat adjectives

Every number here replaces a paragraph of claims.

- [ ] **Per client** (Abdulaziz, Mohammed Masoud, Yazid, the diabetes trainer):
      - follower count when he started vs. now
      - total views generated
      - best-performing video and its numbers
      - exact start date — you said "three or four years." The site needs the real figure;
        "4 years" and "3 years" are materially different claims and a client will ask.
- [ ] **Correct names and handles for all four clients.** I searched and could not find
      Abdulaziz or Mohammed Masoud from the transliterations — I need the actual
      Instagram/YouTube/TikTok handles so names, spellings and numbers are right.
- [ ] **Volume:** videos shipped per month; team size he manages — how many lead editors, how
      many clippers, designers, reviewers.
- [ ] **The Inspire role:** how many team members' content he oversees, and output before vs.
      after he took over.
- [ ] **The diabetes-trainer story — probably the strongest thing on the site.** This isn't
      editing, it's building a content operation that moved a business metric: he hired a
      graphic designer, an editor and a content reviewer, raised output, and trainer intake
      grew. I need the real numbers (output per week before/after, intake growth, timeline)
      because this is the case study that justifies a premium rate.

## 3. Testimonials

- [ ] **Who:** ideally all four clients, plus someone senior at Inspire, plus — this is
      underrated — one person who has worked *under* him, on what he's like to work for.
      That's the one a client hiring a production lead actually cares about.
- [ ] **Format:** 20–30 second phone video, front camera, decent light, beats text every time.
      Text is an acceptable fallback.
- [ ] **For each:** name, handle, title, and a headshot or profile screenshot.
- [ ] **Written permission to publish** their name, logo and footage. A WhatsApp "yes, go
      ahead" screenshot per client is enough — but get it.
- [ ] If a client won't be named, I can run it as "Saudi fitness brand, 1.2M followers."
      It works. It's weaker.

## 4. Him

- [ ] **One portrait.** Plain background, soft directional light, no heavy filter. If he can
      get 20 minutes with a decent camera, do it — this photo carries the About section.
- [ ] **80–120 words in his own voice** on how he works or what he believes about content.
      His words, not polished marketing copy. I'll edit, not rewrite.
- [ ] **Services list** — and what he explicitly does *not* do. Declining work reads as
      confidence and filters bad leads.
- [ ] **How he wants to be contacted:** WhatsApp deep link, email, Calendly, or a form.
      For this market and this kind of buyer, a WhatsApp button usually converts best.

## 5. Permissions and risk — please actually read this

- [ ] Publishing clients' footage, names and logos needs their OK. Informal is fine, written
      is necessary. One screenshot each.
- [ ] **The diabetes / pre-diabetes trainer's content needs care.** No member faces, no
      member before/after body shots, and nothing that reads as a medical or outcome claim,
      without explicit consent. Keep it to the trainer and the production story. This
      protects Saeed and the client.
- [ ] **Inspire:** confirm his contract permits showing that work publicly and naming the
      company. Check before it ships, not after.

## 6. Brand and technical

- [ ] Logo or wordmark as SVG — or I design a wordmark, which for this aesthetic is often
      better than a logo.
- [ ] Any typeface or color he already uses across his work.
- [ ] Hosting and who maintains it. Vercel's free tier plus a domain covers this entirely.
- [ ] **Video delivery.** Self-hosting files is fine up to roughly 100MB total. Past that I'd
      put the video on a CDN (Cloudflare Stream or Bunny, a few dollars a month) so it stays
      instant on Saudi mobile networks instead of buffering — which would undo the whole
      premium effect.

---

## What "Apple level" actually means here

Not decoration. Restraint plus speed:

- One idea per screen. Enormous whitespace. Very few words.
- Two type sizes do 80% of the work. One typeface, two or three weights.
- Near-black background, a single accent color, no gradients used as decoration.
- Motion that is short, eased, and never bouncy. Nothing moves without a reason.
- Video plays instantly and silently — muted autoplay loops, sound on hover or click.
- Under 1.5s load on Saudi 4G. Half of Apple's luxury feel is simply that nothing waits.
- Zero stock photography. Zero generic icons. Zero "we deliver excellence" copy.

The failure mode for a site like this isn't ugly design — it's a beautiful shell wrapped
around four Instagram embeds and the word "passionate."

---

## Minimum set to start

If Saeed can only produce five things:

1. The showreel
2. Six clips as real files, with context for each
3. Three testimonials
4. One portrait
5. The real numbers for the four clients

With those I can build the full site. Everything else is refinement.
