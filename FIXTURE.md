---
id: monorepo
path: dockerfile
port: 3000
needs: [build-context subdir x2]
expect: no root Dockerfile; two Dockerfiles under apps/*; Tend needs per-app dockerfile+context (apps/web, apps/api); ideal: detect both and offer two apps
---

# monorepo

`apps/web` (port 3000) and `apps/api` (port 4000), each with its own Dockerfile and context. No compose, no root Dockerfile.

## Deploy on Tend
Create two Git apps from this branch:
- web: Dockerfile `apps/web/Dockerfile`, context `apps/web`, port 3000
- api: Dockerfile `apps/api/Dockerfile`, context `apps/api`, port 4000
Local: `docker build -f apps/web/Dockerfile apps/web`.

## Verify
- web `GET /` -> `fixture monorepo-web OK`; api `GET /` -> `fixture monorepo-api OK`; both `/health` -> `ok`.

## Expected detection
Nothing at root. Ideal: list the two Dockerfiles and offer to create one app for each.
