// Builds site/public/index.html from page.html and the figure.
//   node site/build.mjs
import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { tunnelSvg, FIGURE_CSS } from "./figure.mjs"

const HERE = dirname(fileURLToPath(import.meta.url))
const html = readFileSync(join(HERE, "page.html"), "utf8")
  .replace("<!--FIGURE_CSS-->", FIGURE_CSS)
  .replace("<!--FIGURE-->", tunnelSvg())
writeFileSync(join(HERE, "public", "index.html"), html)
console.log(`wrote site/public/index.html ${Math.round(html.length / 1024)} KB`)
