---
id: sveltekit-node
path: dockerfile
port: 3000
needs: [optional FIXTURE_MESSAGE]
expect: dockerfile multi-stage build succeeds (~1 min npm ci); node adapter on 3000; message read at runtime from env
---

# sveltekit-node

SvelteKit with `adapter-node`, multi-stage Dockerfile. `FIXTURE_MESSAGE` is read at runtime (`$env/dynamic/private`).

## Deploy on Tend
Git app from this branch, container port 3000. Set env `FIXTURE_MESSAGE=hello`.

## Verify
- `GET /health` -> `ok`
- `GET /` -> `fixture sveltekit-node OK` and `message: hello`

## Expected detection
`dockerfile`, port 3000. (Dropping the Dockerfile would make this the SvelteKit autodetect target: `npm ci && npm run build`, run `node build`.)
