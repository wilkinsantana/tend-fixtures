---
id: python-flask
path: dockerfile
port: 8000
needs: [optional FIXTURE_MESSAGE]
expect: dockerfile build succeeds; EXPOSE 8000; gunicorn serves
---

# python-flask

Flask served by gunicorn, Dockerfile, port 8000.

## Deploy on Tend
Git app from this branch, container port 8000.

## Verify
- `GET /health` -> `ok`
- `GET /` -> `fixture python-flask OK`

## Expected detection
`dockerfile`, port 8000 from EXPOSE.
