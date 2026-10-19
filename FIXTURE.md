---
id: dockerfile-subdir
path: dockerfile
port: 3000
needs: [dockerfile-path, build-context]
expect: root has no Dockerfile: Tend must let the user set dockerfile=docker/web.Dockerfile, context=app/; otherwise a clear 'no Dockerfile at root' error
---

# dockerfile-subdir

Dockerfile lives in `docker/web.Dockerfile`; the build context is `app/`.

## Deploy on Tend
Git app from this branch with:
- Dockerfile path: `docker/web.Dockerfile`
- Build context: `app`
Local equivalent: `docker build -f docker/web.Dockerfile app`

## Verify
- `GET /health` -> `ok`
- `GET /` -> `fixture dockerfile-subdir OK`

## Expected detection
Not auto-detected at root (no `./Dockerfile`). Ideal: Tend finds `docker/*.Dockerfile` and suggests it with context `app/`.
