---
id: node-express-nodockerfile
path: autodetect
port: 3000
needs: [port, optional FIXTURE_MESSAGE]
expect: autodetect Node: npm ci, npm start, port from PORT env (default 3000); today: not buildable (no Dockerfile)
---

# node-express-nodockerfile

Same Express app as `node-express-dockerfile`, but no Dockerfile (has `start` script and `engines.node`).

## Deploy on Tend
Git app from this branch.
- Today: unsupported, Tend should say a Dockerfile is required.
- Planned autodetect (Node): `npm ci`, `npm start`, inject `PORT`, serve on 3000.

## Verify
- `GET /health` -> `ok`
- `GET /` -> `fixture node-express-nodockerfile OK`

## Expected detection
`node` (package.json + package-lock.json + `start` script).
