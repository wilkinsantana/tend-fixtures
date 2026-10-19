---
id: wrong-port
path: dockerfile
port: 8080
needs: [port-mismatch]
expect: container is running but unreachable on EXPOSEd 8080; Tend must detect/warn that nothing listens on 8080 (app listens on 5000) rather than report healthy
---

# wrong-port

App listens on 5000, Dockerfile says `EXPOSE 8080`.

## Deploy on Tend
Deploy with the container port defaulted from EXPOSE (8080). Expected: health/port check fails with a message naming the mismatch (ideally: "listening on 5000"). Setting the port to 5000 manually then succeeds.

## Verify
- With port 8080: deploy fails or warns (no response).
- With port 5000: `GET /health` -> `ok`; `GET /` -> `fixture wrong-port OK`.

## Expected detection
`dockerfile`, EXPOSE=8080 (wrong) -> warning/failure.
