---
id: slow-start
path: dockerfile
port: 3000
needs: [optional START_DELAY_SECONDS=40]
expect: port opens immediately but every request is 503 for 40 s; deploy must wait (start_period 60 s) and succeed, no false failure/alert
---

# slow-start

Listens at once but answers 503 on every path for the first 40 s, then 200. HEALTHCHECK has `--start-period=60s`.

## Deploy on Tend
Deploy this branch. Expect: deploy stays "starting"/waiting for ~40 s, then succeeds. No failed-health alert or rollback during the first 40 s.

## Verify
- Before 40 s: `GET /health` -> 503 `starting`
- After 40 s: `GET /health` -> `ok`; `GET /` -> `fixture slow-start OK`
- Set `START_DELAY_SECONDS=100` to make it exceed the start period and exercise the failure path.

## Expected detection
`dockerfile`, honours image HEALTHCHECK start-period.
