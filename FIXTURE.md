---
id: compose-env-vars
path: compose
port: 3000
needs: [env: GREETING, FEATURE_FLAG]
expect: deploy succeeds; GREETING reaches container; FEATURE_FLAG set in env set but not in compose -> Tend warns key not passed, page shows (unset)
---

# compose-env-vars

Compose service `app` printing `GREETING` and `FEATURE_FLAG`. Only `GREETING` is wired via `environment: GREETING: ${GREETING:-}`.

## Deploy on Tend
Compose app from this branch. Env set: `GREETING=hola`, `FEATURE_FLAG=on`.

## Verify
- `GET /health` -> `ok`
- `GET /` -> `fixture compose-env-vars OK`, `GREETING: hola`, `FEATURE_FLAG: (unset)`
- Tend shows a warning that `FEATURE_FLAG` is in the env set but not passed to any service. Adding `FEATURE_FLAG: ${FEATURE_FLAG:-}` under environment and redeploying makes the page show `on`.

## Expected detection
`compose`; warning for the unreferenced env-set key.
