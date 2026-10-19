---
id: compose-web-api-db
path: compose
port: 3000
needs: [env: DB_PASSWORD (secret, required), volume: pgdata, internal api+db]
expect: compose deploy succeeds with DB_PASSWORD in env set; web shows visits counter that grows; counter survives redeploy (volume persists). Without DB_PASSWORD: compose interpolation fails/ db refuses, clear error
---

# compose-web-api-db

web (Node, public 3000) -> api (Go, internal 8080) -> db (postgres:16.6-alpine, named volume `pgdata`).
The api's `DATABASE_URL` is `postgres://fixture:${DB_PASSWORD}@db:5432/fixture`; the table `visits` is created on start.

## Deploy on Tend
Compose app from this branch. Env set: `DB_PASSWORD=<any secret>` (marked secret). Optional `FIXTURE_MESSAGE`.

## Verify
- `GET /health` -> `ok`
- `GET /` -> `fixture compose-web-api-db OK` and `visits: N`; every reload increments N.
- Redeploy (also a deploy that rebuilds `web`): N continues from the previous value, proving the volume persisted.
- Deploying without `DB_PASSWORD`: compose only warns and substitutes an empty string, so `db` (postgres) refuses to start and the deploy fails. Tend should flag the missing/empty required variable before or in that error.

## Expected detection
`compose`; `web` public (x-tend web_port 3000), `api` and `db` internal; secret var `DB_PASSWORD` flagged as required.
