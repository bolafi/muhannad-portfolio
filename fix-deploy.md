# Fix Cloudflare Deploy

Cloudflare's default pipeline runs `npm run build` + `npx wrangler deploy`. Previously `npm run build` only ran `next build`, which doesn't produce the `.open-next/` output Wrangler needs to deploy, so deploys failed with:

```text
ERROR Could not find compiled Open Next config, did you run the build command?
```

The naive fix — setting `"build": "opennextjs-cloudflare build"` — caused an infinite recursion because OpenNext calls `npm run build` internally to build the Next.js app.

## Applied Fix (in repo, no dashboard changes needed)

- [x] `package.json`: changed `build` to run the Cloudflare/OpenNext build, and added `build:next` for the plain Next.js build that OpenNext should call internally.

  ```json
  "build": "opennextjs-cloudflare build",
  "build:next": "next build"
  ```

- [x] `open-next.config.ts`: told OpenNext to use `npm run build:next` instead of the default `npm run build`, breaking the recursion.

  ```ts
  import { defineCloudflareConfig } from "@opennextjs/cloudflare";

  export default {
    ...defineCloudflareConfig(),
    buildCommand: "npm run build:next",
  };
  ```

- [x] Verified locally with a clean rebuild:

  ```bash
  rm -rf .next .open-next
  npm run build
  ```

  Produces both `.next/BUILD_ID` and `.open-next/worker.js` without recursion, and bundles `public/photo.jpg` into `.open-next/assets/photo.jpg`.

## Cloudflare Dashboard

No changes required. Keep the defaults:

```bash
Build command:  npm run build
Deploy command: npx wrangler deploy
```

## Verify After Next Deploy

- [ ] Commit and push these changes.

- [ ] In Cloudflare's deployment log, confirm:

  ```text
  Executing user build command: npm run build
  ...
  Worker saved in `.open-next/worker.js`
  OpenNext build complete.
  ```

- [ ] Confirm `npx wrangler deploy` no longer reports:

  ```text
  ERROR Could not find compiled Open Next config, did you run the build command?
  ```

- [ ] Open the live site and confirm the hero image displays:

  ```text
  https://muhannad-portfolio.khalidzdg.workers.dev/ar
  ```

- [ ] Confirm the deployed HTML references `/photo.jpg` directly (no `/_next/image` wrapper), since `next.config.mjs` sets `images.unoptimized = true`:

  ```bash
  curl -s https://muhannad-portfolio.khalidzdg.workers.dev/ar | grep -o 'src="[^"]*photo[^"]*"'
  ```

  Expected: `src="/photo.jpg"`.

- [ ] Confirm the image returns `200`:

  ```bash
  curl -I https://muhannad-portfolio.khalidzdg.workers.dev/photo.jpg
  ```

## Local Scripts Reference

| Script | What it does |
| --- | --- |
| `npm run dev` | Next.js dev server |
| `npm run build` | Full Cloudflare build (Next + OpenNext bundle) |
| `npm run build:next` | Plain `next build` only |
| `npm run cf:build` | Same as `npm run build` |
| `npm run cf:preview` | Build + local Worker preview |
| `npm run cf:deploy` | Build + deploy to Cloudflare |
