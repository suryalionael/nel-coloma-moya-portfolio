# Professor Nel Coloma Moya — Academic Portfolio

A static, single-page portfolio site for Professor Nel Coloma Moya (Professor of
Geography, Seneca College). Built as a clean, dependency-free HTML/CSS/JS site
ready for GitHub Pages.

## Project structure

```
.
├── index.html                 # the entire site (single page, anchor sections)
├── favicon.png                 # 256×256 favicon (modern browsers)
├── assets/
│   ├── css/
│   │   ├── fonts.css           # self-hosted @font-face rules (Playfair Display, Source Sans 3)
│   │   └── style.css           # all page styles, design tokens, layout, components
│   ├── js/
│   │   └── site.js             # nav, scroll-reveal, counters, form validation
│   ├── Nel-Coloma-Moya-CV.pdf  # downloadable CV (linked from Hero + CV section + footer)
│   └── images/
│       ├── hero-wide.jpg       # hero banner photo
│       ├── nel-coloma-moya.jpg # About-section portrait / favicon source / social preview
│       ├── nel-graduation.jpg  # Educational Journey — convocation photo
│       ├── favicon-32.png      # 32×32 favicon
│       ├── apple-touch-icon.png# 180×180 iOS home-screen icon
│       ├── events/             # photos for the 4 real Major Events story cards
│       │   ├── event-open-mic.jpg
│       │   ├── event-national-poetry-month.jpg
│       │   ├── event-the-circuit.jpg
│       │   └── event-experience-art-fest.jpg
│       └── quickrn/             # photos for the QuickRN section
│           ├── quickrn-mindfulness.jpg
│           ├── quickrn-study.jpg       # unused (kept for future use)
│           ├── quickrn-team-1.jpg
│           ├── quickrn-team-2.jpg
│           └── quickrn-team-3.jpg
└── source-export/              # original Claude Design export, kept for reference only
                                 # (NOT required for deployment — safe to delete)
```

## Deployment to GitHub Pages

1. Create a new GitHub repository (or use an existing one).
2. Push the contents of this folder to the repository's default branch
   (commonly `main`), **excluding** `source-export/` if you don't want to
   keep the original export around.
3. In the repo: **Settings → Pages → Build and deployment → Source**, choose
   **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. GitHub will publish the site at:
   `https://<your-username>.github.io/<repository-name>/`

### Files to upload

Required for the live site:

- `index.html`
- `favicon.png`
- `assets/css/fonts.css`
- `assets/css/style.css`
- `assets/js/site.js`
- `assets/Nel-Coloma-Moya-CV.pdf`
- `assets/images/hero-wide.jpg`
- `assets/images/nel-coloma-moya.jpg`
- `assets/images/nel-graduation.jpg`
- `assets/images/favicon-32.png`
- `assets/images/apple-touch-icon.png`
- `assets/images/events/*.jpg`
- `assets/images/quickrn/*.jpg`

Optional / not required for deployment:

- `README.md` (documentation only)
- `source-export/` (archived original Claude Design export — reference only)

### Live site

The canonical/OG/Twitter URLs are set to the published GitHub Pages address:
`https://suryalionael.github.io/nel-coloma-moya-portfolio/`

The Contact section lists a real email (`nelcolomamoya@gmail.com`), a
LinkedIn profile (https://www.linkedin.com/in/nelcoloma-moya/), teaching
affiliation (Seneca College, Toronto), and a link to QuickRN
(https://quickrn.ca/) — other placeholder `href="#"` links (Academic
profile/ORCID, ResearchGate, office hours) have been removed since no real
URLs were supplied. Add them back in the Contact section and footer if/when
those profiles exist.

### GitHub Pages readiness checklist

- [x] No build step — pure static HTML/CSS/JS
- [x] All asset paths are relative (`assets/css/...`, `assets/images/...`) — no `file://` or absolute filesystem paths
- [x] No `localhost` references anywhere in shipped files
- [x] Fonts self-hosted via real `fonts.gstatic.com` URLs (no dead `blob:` links)
- [x] Works at a sub-path (e.g. `username.github.io/repo-name/`) because all links/asset paths are relative, not root-absolute
- [x] Favicon + apple-touch-icon present and linked
- [x] Download CV button works (links to `assets/Nel-Coloma-Moya-CV.pdf`, opens in a new tab)
- [x] Canonical / OG / Twitter URLs set to the real published URL (see above)

## What was changed from the original export, and why

The original export (`Nel Coloma-Moya - Portfolio (standalone).html` plus
supporting files in `source-export/`) was a Claude Design preview page: it
loaded fonts and an interactive script from temporary `blob:` URLs, used
empty placeholder boxes (`.img-ph`) instead of real images, included
design-tool-only UI (an appearance/theme switcher and three alternate hero
layouts controlled by `data-accent` / `data-hero` attributes), and mixed
editor-chrome CSS in with the page's own styles.

| File | Change | Why |
| --- | --- | --- |
| `index.html` | Rewritten from the standalone export into a clean single page | Removed editor-only markup/attributes, dead `blob:` script tag, and converted all internal links (`https://claudeusercontent.com/...#...`) into in-page `#anchor` links |
| `index.html` | Added full SEO head: exact title, meta description, canonical, Open Graph, Twitter card, theme-color, favicon links | Required for search engines and social sharing |
| `index.html` | Heading hierarchy adjusted (`h1` → `h2` → `h3`, eyebrow labels promoted to `h2` only where a section had no other heading) | Accessibility — single logical outline per page |
| `index.html` | Added `<a class="skip-link">`, `aria-label`/`aria-expanded`/`aria-controls` on the nav toggle, `aria-current` on the active nav link, `role="list"`/`role="listitem"` on the stats grid, `aria-hidden` on decorative icons/numerals, `tabindex="-1"` on the form success message | Accessibility — screen reader and keyboard navigation support |
| `index.html` | Education timeline converted from `<div>` soup to semantic `<ol>/<li>` | Semantic HTML |
| `index.html` | Hero placeholder replaced with a real photo (`hero-wide.jpg`); other `.img-ph` placeholders (event cards) intentionally left as styled placeholders — no matching photos were supplied for those specific events | Per request to use real photography where available, without inventing imagery |
| `index.html` | Removed `data-hero`, `data-accent`, `data-screen-label` and other editor-only attributes; removed the hero-v2/hero-v3 alternate layouts and the appearance/"tweaks" theme-switcher panel entirely | These were Claude Design preview tools, invisible in the exported default state, and not part of the real site |
| `assets/css/fonts.css` | Copied from the export's `css2` (already valid `fonts.gstatic.com` URLs) | The original inline `<style>` block referenced dead `blob:` font URLs; this file works as-is |
| `assets/css/style.css` | Extracted from the standalone export's embedded `<style>` blocks | Single, cacheable stylesheet instead of inline styles |
| `assets/css/style.css` | Removed the `[data-accent="..."]` variant rules, the `.tweaks` switcher panel CSS, and the hero-v2/hero-v3 CSS | Dead code tied to removed editor-only UI |
| `assets/css/style.css` | Added `.skip-link` and `:focus-visible` styles | Accessibility |
| `assets/css/style.css` | Added `.img-ph img.photo` / `:has(img.photo)` rules so real photos fill placeholder frames using the existing placeholder sizing | Lets real images drop into the existing layout without changing dimensions |
| `assets/css/style.css` | `.timeline` given `list-style: none; padding: 0;` | Matches the new semantic `<ol>` markup |
| `assets/css/style.css` | `.events-grid` and `.award-grid` minimum column widths wrapped in `min(…, 100%)` (`minmax(330px,1fr)` → `minmax(min(330px,100%),1fr)`, same for 290px) | Fixes a horizontal-overflow bug at narrow widths (320–360px) where the fixed minimum column width was wider than the viewport |
| `assets/js/site.js` | Written from scratch | The original interactive behaviour was loaded from a dead `blob:` script with no recoverable source; rebuilt against the existing CSS hooks (`.reveal`, `[data-count]`, `[data-filter]`, `.nav-toggle`, `aria-pressed`, etc.) to restore: scroll-reveal animation, sticky header shadow, mobile nav toggle (with Escape-to-close and close-on-link-click), scrollspy active-nav highlighting, animated stat counters, event filter chips, and contact form validation/success state |
| `favicon.png`, `assets/images/favicon-32.png`, `assets/images/apple-touch-icon.png` | Generated from the headshot photo | Favicon support across browsers and iOS home-screen |
| `assets/images/hero-wide.jpg`, `assets/images/nel-coloma-moya.jpg` | Resized/compressed from the original photos in `Photo/` (hero ~1800px wide, JPEG q65; headshot 600×600, JPEG q85) | Performance — smaller payload while remaining sharp at display size |
| Original export files | Moved into `source-export/` | Archived for reference; not needed for the live site |

## Phase 2 — storytelling redesign, CV verification, QuickRN & Events sections

A second pass restructured the site into a narrative biography and grounded
every section in the professor's CV and source documents.

| Area | Change | Why |
| --- | --- | --- |
| Navigation | Restructured to About / Journey / Teaching / Events / QuickRN / Achievements / Contact | Matches the new narrative section order |
| About (01) | Added a real portrait (`nel-coloma-moya.jpg`) in a new `.about-layout` two-column editorial layout, plus a languages line (English · Tagalog (intermediate) · Ilocano (beginner)) | Per request to add a real photo and humanise the opening section |
| About / Statement | Corrected chronology so the Gawad Kalinga / Luzon master's research is described as coming *before* the cruise-ship-worker doctoral research | The CV shows MA Geography (2007–2009, GK fieldwork) preceded the DA Geography (2009–2024, cruise-ship workers); the original copy had this reversed |
| Educational Journey (02, new) | New `<ol class="timeline">` with all 5 real degrees in chronological order — Diploma in Nursing (St. Lawrence College, 1980), BA English Literature (York, 1985), MA Adult Education (OISE/UofT, 2006), MA Geography (York, 2007–2009), DA Geography (Queen's, 2009–2024) — each with real thesis titles, supervisors, and committee members from the CV. Added a graduation photo (`nel-graduation.jpg`) | Every fact verified against `Nel Coloma-Moya CV current.doc`; nothing invented |
| Teaching (03) | Stats (19+ years, 14+ courses, 5 institutions) and the experience list (Seneca College, Queen's University, George Brown College, Royal Conservatory of Music, York University) rebuilt from the CV's teaching history | Replaces earlier, less specific copy with verifiable facts |
| Major Events & Community Engagement (04, rebuilt) | Replaced the filterable event-card grid with 4 narrative `.story-event` cards, each using only facts present in the corresponding files in `assets/Events/`: *In To Texts: Poetry and Prose in All Media*, *In To Texts Celebrates National Poetry Month*, *The Circuit: Conversations Through Music and Poetry*, *Experience Art Fest* | Per request — "use ALL real files... do NOT invent dates, descriptions, locations" |
| QuickRN (05, new dedicated section) | New case-study section built only from `assets/QuickRN Booklet.pdf` and `assets/QuickRN Pics/`: founder quote, "Meet Nel" bio, mission & objectives, 5 brand values, 2016–2023 history timeline, program pricing tiers, and a 3-photo gallery | Per request — one of the strongest sections, evidence-based only |
| Achievements & Impact (06) | Rebuilt award grid (6 real awards/grants), publications, conference presentations, and leadership/community-service lists from the CV | Every entry verified against the CV |
| Curriculum Vitae (07, new) | New dedicated section with a prominent "Download CV (PDF)" button; a matching button was also added to the Hero | CV is the verified single source of truth and is now directly downloadable |
| Contact (08) | Updated email to `nel@aspentrainingcentre.ca`; removed placeholder `#` links (academic profile/ORCID, LinkedIn, ResearchGate, office hours); added Teaching affiliation and a QuickRN link; removed the social icon row | No real URLs were supplied for the removed links — avoids dead links |
| Accessibility / WCAG 2.1 AA | Darkened `--ink-faint` (`#A39B8E` → `#6E675C`) and `--accent-deep` (`#8C6C3C` → `#7E6136`) design tokens | Brings muted text and accent colours up to AA contrast against the page backgrounds |
| CSS | Added `.about-layout`/`.about-photo`, `.journey-photo`, `.story-events`/`.story-event` (+ `--reverse` variant), `.quickrn-feature`, `.gallery-grid`, `.stat-grid--3`, `.values-grid--5`, each with their own responsive breakpoints | New section layouts, plus dedicated modifier classes avoid inline `style="grid-template-columns:..."` overriding responsive rules |
| CSS | Removed dead rules for the old filter UI: `.filter-bar`, `.chip`, `.events-grid`, `.event-card*`, `.filter-row`, `.filter-count` | No longer used after the Events section was rebuilt as narrative story cards |
| JS | Removed the event-filter-chip script block (no filter UI remains) | Dead code after the Events redesign |
| JS | Reveal-on-scroll observer changed from `{threshold: 0.15, rootMargin: '0px 0px -40px 0px'}` to `{threshold: 0, rootMargin: '0px 0px -10% 0px'}` | The new, much taller `.story-events`/`.timeline`/`.lead-list`/`.award-grid` blocks could exceed the 15%-visible threshold without ever firing; the new settings reveal them reliably while scrolling |
| Images | Added `nel-graduation.jpg`, 4 event photos under `assets/images/events/`, and 4 QuickRN photos under `assets/images/quickrn/`, all resized/compressed with `sips` from the source files in `assets/Events/`, `source-export/Photo/`, and `assets/QuickRN Pics/` | Performance — appropriately sized JPEGs for their display dimensions |

### Note on omitted personal details

The CV lists a personal phone number and home address. These were
intentionally **not** published on the site for privacy; the Contact section
uses the professional email, teaching affiliation, and QuickRN link instead.

## Phase 3 — visual elevation pass

A third pass kept the existing warm-editorial design system (cream/beige
palette, Playfair Display + Source Sans 3, gold accents, existing component
patterns) but turned up typography, texture, depth, motion, and spatial
composition across every section.

| Area | Change | Why |
| --- | --- | --- |
| QuickRN (05) | Restored missing **Brand Values** grid (Integrity, Support, Knowledge, Opportunity, Results), an 8-item **history timeline** (2016 Classroom Exam Prep → 2023 Bootcamp Format), a 5-tier **Programs** pricing list, and a 3-photo **gallery** — all transcribed verbatim from `assets/QuickRN Booklet.pdf` | This content existed in an earlier draft but was missing from the shipped `index.html`; restored from the source booklet so the section's case-study narrative is complete, per the "do not invent content" constraint |
| Global texture | Added a subtle full-page grain/noise overlay (SVG `feTurbulence` data-URI, `opacity: 0.05`, `mix-blend-mode: overlay`, hidden under `prefers-reduced-motion: reduce`) | Adds tactile depth to the flat cream backgrounds without changing the palette |
| Section numerals | Each of the 8 numbered sections (`data-chapter="01"`–`"08"`) now displays a huge, low-opacity (4–5%) serif numeral in the top-right corner, reduced further on mobile | Reinforces the "chapters of a story" framing established in Phase 2 |
| Hero | Added a radial gradient accent backdrop, a giant ultra-faint "N" monogram watermark, a larger display-type scale (`clamp(2.9rem, 9vw, 7.2rem)`), and a subtle dark gradient overlay on the hero photo for contrast | Gives the opening section more presence and atmosphere while keeping the same photo and copy |
| Pull-quotes | Added oversized decorative opening-quote-mark pseudo-elements (at 30% accent opacity) to the Statement pull-quote, the QuickRN founder quote, and other `.pull` blocks | Visual rhythm/landmark for the editorial voice without adding new copy |
| Hover states | Cards and award cards reveal an accent bar on hover; award icons rotate 90°; values/specs shift to a slightly deeper ivory background; experience-list items reveal a left accent bar | More tactile, "alive" interactions on desktop, with no effect on touch layouts |
| Header | Added a scroll-progress indicator — a thin gold bar under the sticky header that fills as the page is scrolled (`transform: scaleX()`, disabled under `prefers-reduced-motion: reduce`) | Gives readers a sense of place in the long-form narrative |
| CSS | New `.timeline--compact` modifier (no card border/shadow, tighter padding) for the QuickRN history list; `.container` given `position: relative; z-index: 1` so content stacks above the new watermarks | Supports the restored QuickRN content and the new decorative layers without affecting other sections |
| JS | `site.js`'s scroll handler now also updates `.scroll-progress`'s `transform` based on `scrollY / (scrollHeight - innerHeight)` | Drives the new progress indicator |

Verified at 375px, 768px, and 1280px: no horizontal overflow introduced by
the new texture/numeral/hero/quote/progress-bar elements (re-checked with the
same overflow script used in Phase 2), reveal-on-scroll animations fire
correctly for the restored QuickRN blocks, and the decorative numerals scale
down sensibly on mobile via a dedicated `@media (max-width: 640px)` rule.

## Phase 4 — final revision: contact info, narrative About, flagship Events & QuickRN

A fourth pass elevated the design further, corrected contact details, and
rebuilt the About, Events, and QuickRN sections as immersive editorial
storytelling — all grounded in the CV, `assets/Events/`, `assets/QuickRN
Booklet.pdf`, `assets/QuickRN Pics/`, and the two Instagram posts supplied by
the client (used only for narrative framing, never as a source of new facts).

| Area | Change | Why |
| --- | --- | --- |
| Contact (08) | Email changed to `nelcolomamoya@gmail.com` (clickable `mailto:`, with accessible label) in both the Contact section and footer; added a LinkedIn link (`https://www.linkedin.com/in/nelcoloma-moya/`) with an inline SVG icon, `target="_blank" rel="noopener"`, and `aria-label`s, plus a new `.contact-buttons` row with "Email Nel" and "LinkedIn" buttons | Per request — real, working contact channels with accessible labels |
| About (01, rebuilt) | Restructured into four parts: **Introduction** (the five-degree path and "throughline" framing, retaining the original portrait and pull-quote), **Educator & Mentor** (teaching across 5 institutions, feminist/post-structural commitments, Enactus faculty mentorship and the Queen's graduate discussion group), **Community Builder** (In To Texts, The Circuit, Experience Art Fest, and the founding of QuickRN), and **Personal Impact** (a 4-stat highlight grid — 5 degrees, 19+ years teaching, 12+ years organising community arts events, 2017 founding of QuickRN) | Per request — "one of the most emotionally engaging sections," built only from CV-verified facts, with internal links connecting to Teaching, Events, and QuickRN |
| Events (04, rebuilt) | Replaced the four `.story-event` cards with three `.event-feature` "chapters" — *In To Texts*, *The Circuit*, and *Experience Art Fest* — each opening with an editorial header and intro, then alternating prose, `.event-editions` timelines (drawing on previously-unused detail from the source docx/pdf files, e.g. Nel's own welcome speech for the National Poetry Month edition, and the Feb/May 2015 Circuit editions), an `.event-highlights` 3-card grid and `.event-schedule` program timeline for Experience Art Fest, and a closing `.event-reflection` pull-quote | Per request — Events as the strongest, most immersive section, avoiding repeated identical cards, using only facts present in `assets/Events/` |
| QuickRN (05, rebuilt) | Replaced the mission/values/timeline layout with a 5-chapter case study using the same `.event-feature` pattern — **The Challenge**, **The Vision**, **The Solution**, **The Experience**, **The Impact** — weaving in the brand values, programme tiers, and history timeline from `assets/QuickRN Booklet.pdf`, with the QuickRN gallery photos (`quickrn-mindfulness.jpg`, `quickrn-team-1.jpg`, `quickrn-team-2.jpg`, `quickrn-team-3.jpg`) distributed across the narrative rather than grouped in one block; eyebrow updated to "QuickRN — A Flagship Initiative" | Per request — QuickRN positioned as a defining initiative, "university innovation showcase" feel, no invented recognition/outcomes |
| Teaching Philosophy | Added a short framing paragraph connecting the Educational Journey's research questions (place, power, belonging) to the "three convictions" that shape her teaching | Strengthens the Journey → Philosophy → Teaching Experience narrative handoff |
| CSS | New shared pattern: `.event-feature`/`.event-feature__header` (chapter dividers with eyebrow + heading), `.event-editions` (+ `.t-card--media`), `.event-highlights`/`.highlight-card`, `.event-media-strip`, `.event-schedule`, `.event-reflection`, and `.stat__desc` (supporting text under each Personal Impact stat); added `.btn--linkedin` hover treatment (icon scales on hover) | Reusable component vocabulary across Events and QuickRN avoids repeating identical card layouts |

Re-verified every fact in the new About/Events/QuickRN copy against
`Nel-Coloma-Moya-CV.pdf` (degrees, dates, institutions, mentorship roles) —
no discrepancies found. Re-checked at 375px, 768px, and 1280px: no horizontal
overflow, all new sections reveal-on-scroll correctly, and the Personal
Impact stat counters animate as in the existing Teaching section.

## Performance notes

- All images are served as compressed JPEG/PNG at sizes appropriate to their
  display dimensions (hero ~588 KB, headshot ~72 KB, favicon ~76 KB).
- The hero image uses `loading="eager"` and `fetchpriority="high"` (it's the
  largest above-the-fold element / LCP candidate); all other images can use
  default lazy loading.
- Fonts are preconnected (`fonts.googleapis.com`, `fonts.gstatic.com`) and
  loaded via a single stylesheet — no font requests are render-blocking
  beyond the initial CSS fetch.
- `assets/js/site.js` is loaded with `defer`, so it never blocks rendering.
- No external frameworks, build tools, or third-party scripts.

## Accessibility notes

- Logical heading order: `h1` (hero name) → `h2` (section headings) → `h3`
  (sub-headings within sections).
- Skip-to-content link for keyboard/screen-reader users.
- Visible focus outlines (`:focus-visible`) on all interactive elements.
- Mobile nav toggle exposes `aria-expanded`/`aria-controls`/`aria-label`, and
  the menu closes on Escape (focus returns to the toggle) and after a link is
  activated.
- Scrollspy marks the current section's nav link with `aria-current="true"`.
- Decorative elements (section numerals, arrows, award icons, event-card
  placeholders) are marked `aria-hidden="true"`.
- Contact form: required fields are validated on blur/submit, errors are
  announced via `aria-live="polite"`, and the success message receives focus
  (`tabindex="-1"`) when shown.
- WCAG 2.1 AA pass (Phase 2): muted-text and accent design tokens
  (`--ink-faint`, `--accent-deep`) were darkened to meet AA contrast ratios
  against the page backgrounds; body copy uses a base size of 18px+ with a
  1.6–1.8 line-height throughout; all images in the new sections (About
  portrait, Educational Journey photo, Events story photos, QuickRN gallery)
  have descriptive `alt` text.

## Local testing

This is a static site — any static file server works:

```bash
python3 -m http.server 8123
# then open http://localhost:8123/index.html
```

Verified locally across 320px, 375px, 768px, and 1280px+ viewports with no
horizontal overflow, working hamburger menu, scroll-reveal animations,
animated stat counters, scrollspy nav highlighting, and contact-form
validation/success flow. The new About/Journey/Events/QuickRN layouts were
additionally checked at 768px and 1280px to confirm their two-column
layouts render correctly.

## Final deployment report

**Status: ready to publish**, pending the canonical/OG/Twitter URL update
noted above (replace `https://username.github.io/repository-name/` with the
real GitHub Pages address).

- Visual identity (colours, type, spacing, card styles) is preserved from
  the original design — Phase 2 added new sections and content rather than
  redesigning existing ones.
- Site is fully static — no build step, no external dependencies beyond
  Google Fonts (self-hosted CSS, real CDN URLs).
- Every biographical, educational, teaching, and achievement fact was
  cross-checked against `Nel-Coloma-Moya-CV.pdf`; corrections were made where
  the old copy conflicted with the CV (notably the
  GK/master's-before-cruise-ship/doctorate chronology, Phase 2).
- The Events section's three `.event-feature` chapters (In To Texts, The
  Circuit, Experience Art Fest) use only facts present in the source files
  under `assets/Events/` — no invented dates, descriptions, or locations.
- The QuickRN section's five-chapter case study uses only content from
  `assets/QuickRN Booklet.pdf` and photos from `assets/QuickRN Pics/`.
- Contact info verified live: `mailto:nelcolomamoya@gmail.com` and
  `https://www.linkedin.com/in/nelcoloma-moya/` (opens in a new tab) appear in
  both the Contact section and footer.
- "Download CV" works from the Hero, the dedicated CV section, and the
  footer — all three link to `assets/Nel-Coloma-Moya-CV.pdf` with
  `target="_blank" rel="noopener" download` (opens in a new tab if the
  browser blocks the download).
- WCAG 2.1 AA: contrast tokens darkened, body text ≥18px with 1.6–1.8
  line-height, visible focus states, and descriptive alt text on all new
  images.
- Verified responsive from 320px mobile through 1280px+ desktop with no
  layout breakage or horizontal scrolling, including the new two-column
  About/Journey/Events/QuickRN layouts at 768px and 1280px.
- Mobile hamburger menu opens/closes, closes on link selection and Escape,
  and toggles `aria-expanded` correctly.
- Scroll-reveal animations, animated stat counters, scrollspy nav
  highlighting, and contact-form validation all function as expected.
- SEO: exact required title and meta description are in place, with
  canonical, Open Graph, and Twitter Card tags (URLs need the final
  domain — see "Before you go live" above).
- Favicon and apple-touch-icon are in place and render correctly in light
  and dark browser themes.
