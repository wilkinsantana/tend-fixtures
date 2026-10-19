---
id: go-nodockerfile
path: autodetect
port: 8080
needs: []
expect: autodetect Go: go build, run binary, port from PORT (default 8080); today: not buildable
---

# go-nodockerfile

Same Go app, no Dockerfile (go.mod + main.go).

## Deploy on Tend
Git app from this branch.
- Today: unsupported, needs a Dockerfile.
- Planned autodetect (Go): `go build -o app .`, run `./app`, inject `PORT`.

## Verify
- `GET /health` -> `ok`
- `GET /` -> `fixture go-nodockerfile OK`

## Expected detection
`go` (go.mod at root, `package main`).
