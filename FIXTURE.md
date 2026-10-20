---
id: node-express-nodockerfile
path: autodetect
port: 3000
needs: [port, optional FIXTURE_MESSAGE]
expect: deploys and answers (Railpack source build)
e2e_recipe: railpack
e2e_provider: node
---

# node-express-nodockerfile

Same Express app as `node-express-dockerfile`, but no Dockerfile (has `start` script and `engines.node`).

## Deploy on Tend
Git app from this branch.
- Tend builds it from source with Railpack (Node): `npm install`, `npm run start`, sets `PORT` (3000).

## Verify
- `GET /health` -> `ok`
- `GET /` -> `fixture node-express-nodockerfile OK`

## Expected detection
`node` (package.json + package-lock.json + `start` script).
