---
id: <fixture-id>            # same as the branch name
path: dockerfile            # dockerfile | static | compose | image | autodetect
port: 3000                  # container port the app serves on
needs: []                   # e.g. [env: API_KEY, volume: data, db]
expect: <one line: what Tend should detect and the result of the deploy>
---

# <fixture-id>

What the app is, and what is confusing or special about it.

## Deploy on Tend
Source type, paths, port, env-set values to enter.

## Verify
- `GET /health` -> `ok`
- `GET /` -> `fixture <fixture-id> OK`

## Expected detection
What Tend should auto-detect (and what it does today vs. planned autodetect).
