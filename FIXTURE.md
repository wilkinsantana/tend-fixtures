---
id: needs-env-required
path: dockerfile
port: 3000
needs: [env: API_KEY (required)]
expect: without API_KEY: container exits 1 with a clear message; deploy fails, error surfaced, previous version kept. with API_KEY: healthy
---

# needs-env-required

Refuses to start without `API_KEY`; the error is written to stderr.

## Deploy on Tend
1. Deploy WITHOUT `API_KEY`: expect a failed deploy whose surfaced error includes `FATAL: API_KEY is required but not set`. If a previous healthy version exists, it must stay live (rollback).
2. Add `API_KEY=anything` to the env set and redeploy: expect success.

## Verify (after step 2)
- `GET /health` -> `ok`
- `GET /` -> `fixture needs-env-required OK` and `API_KEY is set (length N)` (the key itself is never printed).

## Expected detection
`dockerfile`; no static way to know API_KEY is required (the failure path is the test).
