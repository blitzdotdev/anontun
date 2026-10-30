# anontun

Expose a local server through **your own** anontun relay on Cloudflare: HTTP and WebSockets, and it works through HTTPS-only proxies (CI runners, AI sandboxes).

```bash
export ANONTUN_RELAY=https://anontun.you.workers.dev   # your relay; there is no shared one
npx anontun 3000
#   https://anontun.you.workers.dev/t/Q7R5X2KMABCD/  → http://localhost:3000
```

Deploy the relay once (one Worker): see [github.com/blitzdotdev/anontun](https://github.com/blitzdotdev/anontun#deploy-the-relay) and [anontun.aisocket.dev](https://anontun.aisocket.dev).

Options: `--relay <url>` instead of `ANONTUN_RELAY`, `--keep-path` to forward `/t/<token>/…` unstripped, any local URL instead of a port. `HTTPS_PROXY` / `NO_PROXY` are honoured; behind a proxy that refuses WebSockets it switches to server-sent events plus POST by itself.
