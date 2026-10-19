---
id: dockerfile-and-compose
path: compose
port: 3000
needs: []
expect: ambiguous: Dockerfile and compose.yaml both present; Tend should suggest Compose (two services) rather than silently building only the Dockerfile
---

# dockerfile-and-compose

Repo with both a root `Dockerfile` and a `compose.yaml` (web + worker built from the same Dockerfile).

## Deploy on Tend
Create a Git app from this branch and observe which source type Tend picks.
- Expected: Tend notices `compose.yaml` and suggests Compose (the worker would be lost with Dockerfile-only deploy).
- Compose path: web on 3000, worker internal.

## Verify
- `GET /health` -> `ok`; `GET /` -> `fixture dockerfile-and-compose OK`
- Container logs of `worker` show `worker heartbeat` (only with Compose).

## Expected detection
`compose` preferred, with a visible notice that a Dockerfile also exists.
