# kdev studio

> Design &amp; development, end to end.

The portfolio site for **kdev studio** — a small team of developers building websites by hand. Landing pages, online stores, full sites. Based in Prague.

**Live:** [kdevstudio.com](https://kdevstudio.com)

---

## About this site

A deliberately quiet, gallery-style site whose job is to let the work speak. The studio's portfolio spans five very different demos (each loud in its own way), so the container itself is restrained: warm alabaster paper, near-black ink, one muted accent, and a high-contrast serif. The colour comes from the work, not the walls.

## Pages

- **`index.html`** — hero, selected work (5 live case studies), capabilities, how-it-works, about teaser, contact form
- **`about.html`** — approach, toolkit, process, FAQ

## Stack

- Hand-coded **HTML5** + **CSS** (custom properties for the whole design system — re-theme from `:root`)
- ~80 lines of **vanilla JavaScript** — mobile nav, form handling, config injection
- Fonts: **Cormorant Garamond** (display), **Figtree** (body), **Geist Mono** (labels)
- Contact form via **Web3Forms** (no backend)
- Zero dependencies, no build step

## Design tokens

| Token | Value |
|---|---|
| Paper | `#F7F6F1` |
| Ink | `#16140F` |
| Accent | `#2C3A4F` (ink-blue) |
| Display | Cormorant Garamond |
| Body | Figtree |

All tokens live in `:root` in [`styles.css`](styles.css).

## Configuration (`main.js`)

A small `CONFIG` object at the top of [`main.js`](main.js) controls things that change over time — no need to hunt through markup:

```js
const CONFIG = {
  ico: null,                  // company tax number → footer
  socials: { linkedin: null, fiverr: null, upwork: null },
};
```

Set a value and it's injected everywhere automatically.

### Contact form

The form posts to [Web3Forms](https://web3forms.com). Replace the placeholder access key in `index.html`:

```html
<input type="hidden" name="access_key" value="REPLACE_WITH_WEB3FORMS_KEY" />
```

Until a real key is set, the form runs in demo mode (shows the success state without sending).

## Local development

```bash
git clone https://github.com/KlaosY/kdev-studio.git
cd kdev-studio
open index.html        # or: python3 -m http.server 8000
```

## Adding a project

Each case is a self-contained `.case` block in `index.html`. To add a sixth: duplicate one block, drop a screenshot into `assets/`, and update the name, type, description, and links.

---

© 2026 kdev studio · Prague, Czech Republic · [info@kdevstudio.com](mailto:info@kdevstudio.com)
