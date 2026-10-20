---
id: go-nodockerfile
path: autodetect
port: 8080
needs: []
expect: deploys and answers (Railpack source build)
e2e_recipe: railpack
e2e_provider: golang
---

# go-nodockerfile

Same Go app, no Dockerfile (go.mod + main.go).

## Deploy on Tend
Git app from this branch.
- Tend builds it from source with Railpack (Go): `go build`, runs the binary, sets `PORT` to the web address port (8080).

## Verify
- `GET /health` -> `ok`
- `GET /` -> `fixture go-nodockerfile OK`

## Expected detection
`go` (go.mod at root, `package main`).
