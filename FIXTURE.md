---
id: rust-axum
path: dockerfile
port: 3000
needs: [optional FIXTURE_MESSAGE]
expect: multi-stage cargo build succeeds (a minute or two cold); axum on 3000
---

# rust-axum

Rust axum 0.7 on tokio, multi-stage (rust alpine -> alpine), port 3000.

## Deploy on Tend
Git app from this branch, container port 3000. Cold build is the slowest of the small fixtures.

## Verify
- `GET /health` -> `ok`
- `GET /` -> `fixture rust-axum OK`

## Expected detection
`dockerfile`, EXPOSE 3000.
