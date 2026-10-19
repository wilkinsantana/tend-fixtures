---
id: static-subdir
path: static
port: 80
needs: []
expect: today: no root index.html, so not detected as static (clear error/suggestion); with detection: publish dir public/ suggested
---

# static-subdir

Site in `public/`; the repo root has no `index.html` (confusing layout).

## Deploy on Tend
Git app from this branch, no Dockerfile.
- Today: root has no `index.html`, so static detection does not fire. Tend should fail with an actionable message, not a silent empty nginx.
- Planned: autodetect should find `public/index.html` and propose `public/` as the publish directory.

## Verify (once a publish dir of `public/` is configured or detected)
- `GET /` -> HTML containing `fixture static-subdir OK`.

## Expected detection
Not `static` at root today; ideal: static with publish dir `public/`.
