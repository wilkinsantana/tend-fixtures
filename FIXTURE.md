---
id: node-express-dockerfile
path: dockerfile
port: 3000
needs: [port, optional FIXTURE_MESSAGE]
expect: dockerfile build succeeds; EXPOSE 3000 detected; healthy on /health
---

# node-express-dockerfile

Express 4 app with a Dockerfile. Honors `PORT` (default 3000), `EXPOSE 3000`.

## Deploy on Tend
Git app from this branch, Dockerfile at root, container port 3000.
Optional env: `FIXTURE_MESSAGE=hello` -> shown on the page.

## Verify
- `GET /health` -> `ok`
- `GET /` -> `fixture node-express-dockerfile OK` and `message: hello`

## Expected detection
`dockerfile` (root Dockerfile), port 3000 from EXPOSE.
