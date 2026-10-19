---
id: go-http
path: dockerfile
port: 8080
needs: [port-guess]
expect: dockerfile build succeeds; no EXPOSE so port must be guessed/asked (8080); warn if undetectable
---

# go-http

Go `net/http`, multi-stage Dockerfile, listens on 8080 and the Dockerfile has **no `EXPOSE`** (confusing port).

## Deploy on Tend
Git app from this branch. Container port is not declared: Tend should either detect 8080 (probe listening ports) or ask/warn, not default silently to 80/3000.

## Verify
- `GET /health` -> `ok`
- `GET /` -> `fixture go-http OK`

## Expected detection
`dockerfile`, port unknown from image metadata -> expected warning "no EXPOSE; set port 8080".
