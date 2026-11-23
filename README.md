# QBTC Foundation website

Static one page site for the QBTC Foundation Quantum Readiness Campaign. No build step: plain HTML, CSS and a little JavaScript.

## Files

- `index.html` — all page copy (hero, steps, partners, pledge, events, sign up). Edit text here.
- `site.config.js` — one line config for the explainer video (see below).
- `assets/*.css` — styles (`base`, `sections`, `sections2`, `responsive`).
- `assets/site.js` — menu, scroll reveals, event filters, form behaviour, video slot.
- `404.html`, `favicon.*`, `og.png` (social share image), `netlify.toml`.

## Edit content

Open `index.html`, find the text, change it, commit. Partners are the `<a class="partner">` cards; events are the `<article class="event">` items (`data-type="events"` or `"ongoing"` drives the filter tabs).

## Explainer video

Set `videoSrc` in `site.config.js` to an `.mp4`/`.webm` path (put the file in `/media/`) or a YouTube/Vimeo embed URL. Empty means the section stays hidden.

## Sign up form

The form is a demo, as in the original draft: it validates and shows a confirmation but sends nothing. To collect sign ups, connect it to the chosen email/pledge platform (or add `data-netlify="true"` and `name="signup"` to the `<form>` and remove the `preventDefault` handler in `assets/site.js` to use Netlify Forms).

## Preview locally

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy

Hosted on Netlify (publish directory `.`, no build command).

```sh
npx netlify-cli deploy --prod --dir .
```

## Custom domain

In Netlify: Site configuration → Domain management → Add `qbtcfoundation.com`. Then at the DNS provider (GoDaddy): point the apex `A` record to `75.2.60.5` and set `www` as a `CNAME` to the site's `*.netlify.app` name. Netlify issues the HTTPS certificate automatically.
