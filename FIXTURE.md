---
id: static-plain
path: static
port: 80
needs: []
expect: detected as static (index.html at root); generated nginx serves it; deploy succeeds
---

# static-plain

Only `index.html` at the repo root.

## Deploy on Tend
Git app from this branch, no Dockerfile. Tend serves it with its generated nginx (port 80).

## Verify
- `GET /` -> HTML containing `fixture static-plain OK`.

## Expected detection
`static` (plain index.html). No warnings.
