# aaoo — an audience of one

A lightweight, responsive static website for aaoo. Designed for GitHub Pages; no build, package installation, tracking, cookies, or external font service required. All artwork and the approved Felt keys logo are stored locally.

## Publish on GitHub Pages

1. Create a public repository named `aaoomusic-website` under `AAOOMusic`.
2. Upload the contents of this folder (not the ZIP file) to the `main` branch. `index.html` must be in the repository root.
3. In Settings → Pages, choose **Deploy from a branch**, then **main** and **/(root)**. Save.
4. Wait for the Pages deployment to finish. The intended address is `https://aaoomusic.github.io/aaoomusic-website/`.

A custom domain is intentionally not configured; add it through GitHub Pages settings after DNS is ready.

## Add releases

Edit `releases.js`. The current empty array intentionally displays a forthcoming message and three clearly labelled artwork studies. No artist names, titles, streaming links or dates have been invented.

Add real records using this schema (example values below must be replaced):

```js
window.AAOO_RELEASES = [
  {
    title: 'Actual release title',
    artist: 'Actual artist',
    type: 'Single', // Single, EP, or Album
    date: '2026-12-01',
    artwork: 'your-cover.webp',
    artworkAlt: 'Description of the cover',
    url: 'https://your-actual-listening-link.example'
  }
];
```

When at least one record exists, the launch artwork switches to a release grid with search and type filters. Only used release types are shown. Omit `url` if a listening link is not yet available; the card will not pretend to be clickable. Use HTTPS for listening links. Release records render as text, never executable HTML. Order records newest first.

## Edit the website

- `index.html`: label copy, navigation, email and page metadata.
- `style.css`: layout, colour, typography and mobile breakpoints.
- `releases.js`: release catalogue.
- `site.js`: search and filtering.
- `*.webp`, `logo.svg`, `favicon.svg`: existing aaoo artwork, logo and favicon.

The contact link opens a visitor's email client addressed to `info@aaoomusic.com`. No newsletter or form backend is implied. No audio autoplays. Reduced-motion preferences are respected. Core launch content and navigation work without JavaScript.


