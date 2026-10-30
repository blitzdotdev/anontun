# Website

Source for [anontun.aisocket.dev](https://anontun.aisocket.dev): one static page.

| File | What it is |
|---|---|
| `page.html` | The page, with `<!--FIGURE-->` and `<!--FIGURE_CSS-->` slots. |
| `figure.mjs` | Fig 1, one request through a tunnel, drawn as SVG. |
| `build.mjs` | Writes `public/index.html`: `node site/build.mjs`. |
| `public/` | What is served. `fonts/` holds subsets of Inter and Newsreader Italic (SIL Open Font License, `fonts/LICENSE.txt`). |
| `wrangler.jsonc` | A Worker with static assets on the custom domain `anontun.aisocket.dev`. Deploy from this folder: `npx wrangler deploy`. |

Commit `public/index.html` after building.
