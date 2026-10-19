---
id: vite-static
path: autodetect
port: 80
needs: [node-build]
expect: autodetect: package.json with vite -> npm ci && npm run build, serve dist/ as static; today: no Dockerfile and no root index.html source, so not buildable
---

# vite-static

Vanilla Vite project, no Dockerfile. `npm run build` emits `dist/`.

## Deploy on Tend
Git app from this branch.
- Today: unsupported (no Dockerfile; root `index.html` is a Vite source file, not a built site, and would be served as-is with a blank page). Tend must not silently publish the source.
- Planned autodetect (Vite static): `npm ci`, `npm run build`, serve `dist/` with nginx.
- Optional build-time var: `VITE_FIXTURE_MESSAGE` (baked into the bundle at build time).

## Verify
- `GET /` -> page text rendered by JS: `fixture vite-static OK` (needs a JS-capable check; the raw HTML only has `loading...`).

## Expected detection
`vite-static` (package.json devDependency `vite`, script `build`, output `dist`).
