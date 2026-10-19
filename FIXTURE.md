---
id: ruby-sinatra
path: dockerfile
port: 4567
needs: [optional FIXTURE_MESSAGE]
expect: dockerfile build succeeds; sinatra/webrick on 4567
---

# ruby-sinatra

Sinatra 4 on WEBrick (pure Ruby, no native build), port 4567.

## Deploy on Tend
Git app from this branch, container port 4567.

## Verify
- `GET /health` -> `ok`
- `GET /` -> `fixture ruby-sinatra OK`

## Expected detection
`dockerfile`, EXPOSE 4567.
