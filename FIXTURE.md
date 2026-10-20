---
id: static-subdir
path: static
port: 80
needs: []
expect: deploys and answers (static site from public/)
e2e_recipe: static_subdir
---

# static-subdir

Site in `public/`; the repo root has no `index.html` (confusing layout).

## Deploy on Tend
Git app from this branch, no Dockerfile.
- Tend finds `public/index.html` and serves `public/` as a static website (recipe `static_subdir`).

## Verify
- `GET /` -> HTML containing `fixture static-subdir OK`.

## Expected detection
`static_subdir` (no root `index.html`, `public/index.html` found).
