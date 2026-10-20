---
id: vite-static
path: autodetect
port: 80
needs: [node-build]
expect: deploys and answers (Railpack source build)
e2e_recipe: railpack
e2e_provider: node
---

# vite-static

Vanilla Vite project, no Dockerfile. `npm run build` emits `dist/`.

## Deploy on Tend
Git app from this branch.
- Tend builds it from source with Railpack (Node): `npm install`, `npm run build`, serves `dist/` with Caddy on `PORT` (80). The HTML shell shows `loading...`; the marker is in the JS bundle.
- `VITE_FIXTURE_MESSAGE` is a build-time variable; Railpack builds do not support build-time variables yet, so it is not set.

## Verify
- `GET /` -> page text rendered by JS: `fixture vite-static OK` (needs a JS-capable check; the raw HTML only has `loading...`).

## Expected detection
`vite-static` (package.json devDependency `vite`, script `build`, output `dist`).
