# Olivier Leirman — CV (Whitelabel)

Static, single-file CV with a 5-style whitelabel switcher.

## Styles
1. **House of HR** (default) — Nunito 900 · #1D153E · #EB005A · sharp corners
2. **Editorial** — Bookish, Fraunces serif, restrained
3. **Brutalism** — Hard, Helvetica + mono, raw
4. **Glass** — Apple-style soft pastels with blurred mesh background
5. **Flat** — Neutral Inter baseline

Switch via the floating pill at the bottom, or keys `1`–`5`. Toggle dark mode with `m`.

## Files
- `index.html` — semantic CV, source of truth
- `styles.css` — base + 5 themes (only CSS swaps when style changes)
- `app.js` — switcher, mode toggle, copy-to-clipboard, print
- `assets/` — photo + PDF download
- `vercel.json` — caching + headers

## Deploy to Vercel
```bash
vercel --prod
```
Or drag the folder onto vercel.com/new. No build step.
