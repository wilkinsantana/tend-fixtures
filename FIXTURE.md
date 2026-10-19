---
id: bibliaberea-shape
path: compose
port: 3000
needs: [volume: berea-data (sqlite), TEND_URL_WEB injected by Tend, optional BEREA_DB_PATH]
expect: compose deploy succeeds; side-by-side swap keeps old stack serving until new web+api healthy; page shows origin = Tend URL; read counter persists across redeploys
---

# bibliaberea-shape

Miniature of `Biblia Berea/compose.yaml`: public `web` (3000, `x-tend: {address, web_port, swap: side-by-side}`), internal `api` (8086) with SQLite on named volume `berea-data`, healthchecks, `depends_on: service_healthy`, `BEREA_PUBLIC_ORIGIN: ${TEND_URL_WEB}`. The real file's builds, mail/AWS/Litestream vars and curl healthcheck are reduced (the api image is python-slim, so the healthcheck uses python).

## Deploy on Tend
Compose app from this branch with address `bibliaberea-fixture`. No env-set values are required (`BEREA_DB_PATH` is optional, defaults to `/data/app.db`).

## Verify
- `GET /health` -> `ok`
- `GET /` -> `fixture bibliaberea-shape OK`, `origin: https://<the app URL>` (proves `TEND_URL_WEB` was injected), and `verse reads: N` increasing per reload.
- Redeploy: N continues (volume persisted); during the swap the old URL keeps answering.

## Expected detection
`compose`; `x-tend` address/web_port/swap honoured; `api` internal; `TEND_URL_WEB` recognized as Tend-provided, not warned as missing.
