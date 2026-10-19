---
id: big-image
path: dockerfile
port: 3000
needs: [disk ~700 MB, longer build/push]
expect: build succeeds but slow/large (~300 MB filler); exercises timeouts and progress reporting; deploy succeeds
---

# big-image

Node server on an image inflated by 300 MB of random data (incompressible, so push/pull is really ~300 MB).

## Deploy on Tend
Deploy this branch; watch build progress, step timeouts, and disk usage reported by Tend.

## Verify
- `GET /health` -> `ok`; `GET /` -> `fixture big-image OK`

## Expected detection
`dockerfile`, port 3000. No failure expected; the test is that progress and timeouts behave.
