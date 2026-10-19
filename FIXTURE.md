---
id: image-whoami
path: image
port: 80
needs: []
expect: image path: pull traefik/whoami:v1.10.3, port 80; no build
---

# image-whoami

No source: deploy the public image `traefik/whoami:v1.10.3`.

## Deploy on Tend
Image app with image `traefik/whoami:v1.10.3`, container port 80. (This branch only holds this file; Git source is not used.)

## Verify
- `GET /` -> text containing `Hostname:` and `GET / HTTP/1.1`
- `GET /health` -> 200

## Expected detection
n/a (image source). Pinned tag must be honoured, not `latest`.
