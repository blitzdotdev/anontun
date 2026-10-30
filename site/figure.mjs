// Fig 1: one request through a tunnel, as a sequence across four lanes
// (whoever has the URL, your relay, the anontun CLI, your local server).
// Flat drawing: thin rules, one accent for the tunnel itself, words only as
// lane names and short step labels. Same drawing rules as agentsocket.dev's
// "One call" figure.

export function tunnelSvg() {
  const W = 820, H = 430
  const lanes = [
    { x: 110, name: "Anyone with the URL", sub: "a browser or a webhook" },
    { x: 330, name: "Your relay", sub: "a Worker on your account" },
    { x: 545, name: "anontun", sub: "the CLI, on your machine" },
    { x: 730, name: "Your server", sub: "localhost:3000" },
  ]
  const X = lanes.map((l) => l.x)
  const top = 74, bottom = 418
  const rows = [106, 196, 274, 360]
  const out = []
  const t = (x, y, s, cls = "fl", anchor = "middle") => `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${s}</text>`
  const arrow = (x1, x2, y, { cls = "fa", dash = "" } = {}) => {
    const dir = Math.sign(x2 - x1)
    const tip = x2 - dir * 1.5
    return `<path class="${cls}" ${dash ? `stroke-dasharray="${dash}"` : ""} d="M${x1 + dir * 6} ${y}H${tip - dir * 6}"/><path class="${cls.split(" ").map((c) => `${c}-head`).join(" ")}" d="M${tip} ${y}l${-dir * 9} -4.2v8.4z"/>`
  }
  const num = (n, y) => `<circle class="fnum" cx="26" cy="${y}" r="9"/>` + t(26, y + 4, String(n), "fl fl-num")

  // the tunnel: the connection the CLI holds open to your relay
  out.push(`<rect class="fh" x="${X[1]}" y="${rows[0] + 22}" width="${X[2] - X[1]}" height="${bottom - rows[0] - 44}" rx="3"/>`)
  out.push(t((X[1] + X[2]) / 2, bottom - 6, "one connection, held open while the CLI runs", "fl fl-accent"))
  lanes.forEach((l) => {
    out.push(`<rect class="fbox" x="${l.x - 86}" y="18" width="172" height="40" rx="5"/>`)
    out.push(t(l.x, 35, l.name, "fl fl-strong"), t(l.x, 50, l.sub, "fl fl-muted"))
    out.push(`<path class="flane" d="M${l.x} ${top}V${bottom - 18}"/>`)
  })

  // 1. the CLI connects out and gets a URL
  out.push(num(1, rows[0] + 8))
  out.push(arrow(X[2], X[1], rows[0]), t((X[1] + X[2]) / 2, rows[0] - 7, "connects out, over port 443"))
  out.push(arrow(X[1], X[2], rows[0] + 22, { cls: "fa fa-accent", dash: "4 3" }), t((X[1] + X[2]) / 2, rows[0] + 36, "a URL: …/t/Q7R5X2KMABCD/", "fl fl-accent"))

  // 2. you share it
  out.push(num(2, rows[1] + 2))
  out.push(`<path class="fa" stroke-dasharray="2 3" d="M${X[2] - 6} ${rows[1]}C${X[2] - 130} ${rows[1] - 22} ${X[0] + 130} ${rows[1] - 22} ${X[0] + 14} ${rows[1] - 1.6}"/><path class="fa-head" d="M${X[0] + 5} ${rows[1]}l9.4 -5.6l-0.4 8.4z"/>`)
  out.push(t((X[0] + X[2]) / 2, rows[1] - 24, "you share the URL"))

  // 3. a request goes down the tunnel to the local server and back
  out.push(num(3, rows[2] + 6))
  out.push(arrow(X[0], X[1], rows[2] - 4), t((X[0] + X[1]) / 2, rows[2] - 11, "GET …/t/Q7R5…/api/items"))
  out.push(arrow(X[1], X[2], rows[2] - 4), t((X[1] + X[2]) / 2, rows[2] - 11, "down the open connection"))
  out.push(arrow(X[2], X[3], rows[2] - 4), t((X[2] + X[3]) / 2, rows[2] - 11, "GET /api/items"))
  out.push(arrow(X[3], X[2], rows[2] + 12, { dash: "4 3" }), arrow(X[2], X[1], rows[2] + 12, { dash: "4 3" }), arrow(X[1], X[0], rows[2] + 12, { dash: "4 3" }))
  out.push(t((X[0] + X[1]) / 2, rows[2] + 26, "200, the reply", "fl fl-muted"), t((X[2] + X[3]) / 2, rows[2] + 26, "your app answers", "fl fl-muted"))

  // 4. WebSockets pass through end to end
  out.push(num(4, rows[3] + 4))
  out.push(arrow(X[0], X[3], rows[3] - 6, { cls: "fa fa-accent" }), arrow(X[3], X[0], rows[3] + 8, { cls: "fa fa-accent", dash: "4 3" }))
  out.push(t((X[0] + X[3]) / 2, rows[3] - 13, "WebSocket upgrades pass through, both ways (Vite's hot reload, a chat, a game)", "fl fl-accent"))

  return `<svg class="ftun" viewBox="0 0 ${W} ${H}" role="img" aria-label="A sequence across four lanes: anyone with the URL, your relay, the anontun CLI and your local server. 1: the CLI connects out to your relay over port 443 and gets a URL. 2: you share the URL. 3: a request to the URL goes to your relay, down the open connection to the CLI, and on to your local server; the reply comes back the same way. 4: WebSocket upgrades pass through end to end, both ways.">${out.join("")}</svg>`
}

export const FIGURE_CSS = `
.ftun-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch}
.ftun{display:block;width:100%;height:auto}
@media (max-width:700px){.ftun-scroll .ftun{min-width:680px}}
.ftun .fl{font:500 11.5px var(--sans);fill:var(--text)}
.ftun .fl-strong{font-weight:600;font-size:12.5px;fill:var(--ink)}
.ftun .fl-muted{font-weight:400;fill:var(--muted)}
.ftun .fl-accent{fill:var(--accent);font-weight:500}
.ftun .fl-num{font-size:10.5px;font-weight:600;fill:var(--muted)}
.ftun .fbox{fill:#fff;stroke:#d6d6d3;stroke-width:1}
.ftun .flane{stroke:#dcdcd9;stroke-width:1;stroke-dasharray:2 4;fill:none}
.ftun .fh{fill:var(--accent);opacity:.06}
.ftun .fnum{fill:none;stroke:#d0d0cd;stroke-width:1}
.ftun .fa{stroke:#3a3a3f;stroke-width:1.25;fill:none}
.ftun .fa-head{fill:#3a3a3f}
.ftun .fa-accent{stroke:var(--accent)}
.ftun .fa-accent-head{fill:var(--accent)}
`
