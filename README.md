# Raayat Islamic Nursery & Primary School — website

A static marketing website for **Raayat Islamic Nursery & Primary School**,
Salaama–Munyonyo Road, Makindye, Kampala, Uganda.

Plain HTML, CSS and JavaScript — no build step, no framework, no dependencies.

---

## Run it locally

```bash
node server.js
```

Then open <http://localhost:4173>. (Any static file server works; `server.js` is a
~30 line helper so you don't need one installed.)

## Deploy it

Because it is just static files, you can upload the whole folder as-is to Netlify,
Vercel, GitHub Pages, Cloudflare Pages, or any shared cPanel host. There is nothing
to build or compile.

---

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home — hero, welcome, why learn with us, quick links, programmes, academic calendar, promises, call to action |
| `about.html` | About Us — story, mission/vision/motto, values, sections |
| `academics.html` | Academics — CBC + theology, Nursery / Lower / Upper Primary, school day, assessment |
| `admissions.html` | Admissions — how to register, requirements, fees, re-registration, FAQ |
| `contact.html` | Contact — phone/email/address, enquiry form, directions |

Each page carries its own copy of the navbar and footer (normal for a small static
site). **If you change a nav or footer link, change it in all five files.**

---

## Where the school's details came from

Pulled from the school's public Facebook page
(<https://www.facebook.com/profile.php?id=100077010487775>):

- **Name:** Raayat Islamic Nursery & Primary School
- **Motto:** Allah is the key to knowledge
- **Description:** "A primary school that offers secular and theology education, along Salaama Road, Makindye."
- **Day and boarding** — the school takes both (confirmed by the school, not stated on Facebook)
- **Address:** Salaama–Munyonyo Road, Kampala, Uganda
- **Phone:** 0704 178474 (from Facebook), plus **0701 617183** and **0777 100022**
  (given by the school directly, added later). 0704 178474 is the WhatsApp line
- **Email:** raayatislamicschool02@gmail.com
- **Twitter/X:** <https://twitter.com/rayatislamicsch>
- **Curriculum:** CBC (Competency Based Curriculum), per the school's own posts

Levels (Nursery, P.1–P.7) are taken from the school's registration poster.

These values appear in every page's footer and on `contact.html` — search for the
phone number or email to find them all.

---

## Things you should replace before going live

### 1. Photographs — *the most important one*

The Facebook page requires a login to download photos, so instead of using stock
images of other people's children, every picture slot is filled with an original
geometric panel built in the school's green and red (Islamic 8-point star tiling with
a motif). They look deliberate, but **real photographs of Raayat pupils and
classrooms will be far better**.

To swap one in, just overwrite the file in `assets/img/` keeping the same name:

| File | Used for | Suggested photo | Good size |
| --- | --- | --- | --- |
| `hero.svg` | Home page hero, Admissions header | Pupils outside the school / assembly | 1600×900 |
| `welcome.svg` | Welcome section, About, Admissions | A classroom in session | 900×1050 |
| `why-quran.svg` | "Qur'an & Theology" card | Qur'an lesson | 640×800 |
| `why-cbc.svg` | "CBC Curriculum" card | Pupils doing an activity | 640×800 |
| `why-teachers.svg` | "Committed Teachers" card | A teacher with pupils | 640×800 |
| `why-safe.svg` | "Safe & Caring" card | The compound / gate | 640×800 |
| `prog-nursery.svg` | Nursery programme | Nursery children at play | 960×720 |
| `prog-lower.svg` | Lower Primary programme | P.1–P.3 classroom | 960×720 |
| `prog-upper.svg` | Upper Primary programme | P.4–P.7 classroom | 960×720 |
| `cta-1…5.svg` | The fanned photo arc | Five happy school moments | 460×620 |
| `community.svg` | About + Contact page headers | Wide shot of the school | 1400×620 |

If you replace them with `.jpg` files, update the `src=""` in the HTML to match the
new extension (search for e.g. `hero.svg`). Regenerate the geometric panels at any
time — the generator is not part of the site, the files are.

### 2. Academic calendar dates

The calendar on the home page is **fully working**, but the dates it shows are the
usual Ugandan three-term shape, not confirmed dates. Edit the two tables near the top
of the calendar section in `assets/js/main.js`:

- `TERMS` — the term windows that shade the calendar green
- `MILESTONES` — the "key dates" list, keyed by month (`0` = January)

The page already carries a visible note telling parents to confirm with the office.

### 3. School fees

No fee figures are published anywhere on the site — the Admissions page explains what
fees cover and asks parents to request the current structure. If you would rather
publish actual amounts, add them to the Fees section of `admissions.html`.

### 4. The enquiry form goes to WhatsApp

The form on `contact.html` does not email anybody and uses no form service. It
folds the fields into one tidy message and opens WhatsApp with it already typed,
addressed to the office line:

    *New enquiry from the website*

    Name: Aisha Nakato
    Class of interest: Primary One
    Phone: 0772 123456

    Is there a place available for next term?

The parent presses send in WhatsApp themselves. A `wa.me` link cannot send on
someone's behalf — which is the right behaviour: no message leaves a parent's
phone without them seeing it first.

Only **name** and **message** are required; phone and email are optional, since
WhatsApp already carries the sender's number. An **Email instead** button beside
it opens the visitor's own mail app for anyone who prefers writing.

Nothing to activate, no inbox to watch, no third party in the middle. To change
where enquiries land, edit `SCHOOL.whatsapp` in `assets/js/main.js` — see
WhatsApp below.

> An earlier version of this site relayed the form through FormSubmit. That is
> gone. If an "Activate Form" email from FormSubmit is still sitting in the
> school's Gmail, it can simply be ignored or deleted.

The **newsletter box** in the footer still only validates the address and shows a
confirmation — it does not store it anywhere. Point it at Mailchimp or a Google
Form when the school is ready.

### 5. WhatsApp

Every WhatsApp button uses the office line **0704 178474**, written in the
international form WhatsApp requires: `256704178474` — country code `256` for
Uganda, with the leading `0` dropped. A link looks like
`https://wa.me/256704178474?text=<url-encoded message>`, so the visitor's app
opens with a sensible message already typed.

The other two numbers (0701 617183 and 0777 100022) appear on the contact page and
in every footer, but **WhatsApp deliberately stays on 0704 178474** — the school
chose to keep chat on that one line, so please do not "correct" it to a newer number.

Where they are:

| Place | Button |
| --- | --- |
| Every page, bottom right | Floating green chat button (injected by `main.js`) |
| Every page footer | In the contact list and the social row |
| Home — quick links | "Prefer to just ask?" strip |
| Home — final call to action | **Register on WhatsApp**, beside Start Registration |
| Admissions — top, fees card, call to action | WhatsApp Us / Ask on WhatsApp / Register on WhatsApp |
| Contact — enquiry form | **Send Enquiry on WhatsApp** — the form's only submit button |
| Contact — sidebar and "Every Way to Reach Us" | Message us on WhatsApp |

**To change the number**, edit `SCHOOL.whatsapp` in `assets/js/main.js` for the
floating button, then search the HTML files for `256704178474` and replace it in
the inline links too.

### 6. Social links

The contact page's **"Every Way to Reach Us"** list carries WhatsApp, phone,
email, Facebook and X — the only accounts the school's Facebook page lists. If
there is also an Instagram, TikTok or YouTube account, copy one of the
`.social-link` blocks in `contact.html`, swap the `href`, the label and the icon,
and add a matching `.ico--*` colour rule in `assets/css/styles.css`. There is a
comment in the markup at exactly that spot.

### 7. Testimonials

The home page has a **"What We Promise Parents"** carousel rather than parent
testimonials, because the school has no published reviews to quote and inventing
them would be dishonest. Once you have real quotes with permission, the slides in
`index.html` (`.pledge__slide`) are ready to take them.

---

## Brand

| Token | Value | Where it comes from |
| --- | --- | --- |
| Green | `#00A14F` | School crest and signboard |
| Deep green | `#046A38` | Headings, buttons |
| Red | `#E0222B` | Crest, signboard lettering, accents |
| Cream | `#FBF6EC` | Alternating section background |
| Display font | Anton | Matches the condensed bold lettering on the school signboard |
| Body font | Plus Jakarta Sans | — |

`assets/img/logo.svg` is **the school's own crest**, converted from the official
artwork the school supplied as a PDF. It is true vector — 24 paths, no fonts and no
embedded bitmaps — so it stays sharp at every size and is used for the favicon too.
The lettering was already outlined in the source file, so it renders identically
everywhere without needing a font.

The crest's own colours are red `#ff2e17` and green `#00ab4f`. The site's palette
(`--red: #E0222B`, `--green: #00A14F`) was sampled from the painted signboard before
the official artwork arrived, so the two are very slightly different shades. Nothing
looks wrong, but to make the whole site match the crest exactly, change those two
tokens at the top of `assets/css/styles.css`.

The signboard photo and the registration poster are kept at `assets/img/banner.webp`
and `assets/img/poster.png` for reference — neither is used by the site itself.

---

## Structure

```
raayat-islamic-school/
├── index.html  about.html  academics.html  admissions.html  contact.html
├── server.js                 local preview server
├── .claude/launch.json       dev-server config for the Claude Code preview pane
└── assets/
    ├── css/styles.css        all styling, one file
    ├── js/main.js            nav, tabs, calendar, carousel, forms
    └── img/                  crest, generated panels, original signboard
```
