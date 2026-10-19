---
id: crash-on-start
path: dockerfile
port: 3000
needs: []
expect: build succeeds; container exits 1 after 2 s; deploy fails cleanly, previous version kept, logs show the crash line
---

# crash-on-start

Prints a line, sleeps 2 s, exits with code 1.

## Deploy on Tend
Deploy this branch (ideally on top of a healthy earlier app, e.g. re-point an existing test app). The deploy must be reported failed (not 'running'), the old version stays live, and the log tail shows `crashing on purpose`.

## Verify
- Deploy status: failed. No URL is ever healthy. `restart: always` loops must not mark it healthy.

## Expected detection
`dockerfile`. Expected result: failed deploy + rollback.
