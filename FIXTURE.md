---
id: dockerfile-subdir
path: dockerfile
port: 3000
needs: [dockerfile-path, build-context]
expect: deploys and answers: with dockerfile=docker/web.Dockerfile and context=app the Dockerfile sits outside the build context (both stay inside the repository)
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
Not auto-detected at root (no `./Dockerfile`); the probe lists `docker/web.Dockerfile` as a candidate. The Dockerfile path is read from the build context first, then from the repository root, so `docker/web.Dockerfile` and `../docker/web.Dockerfile` both work with context `app`.
