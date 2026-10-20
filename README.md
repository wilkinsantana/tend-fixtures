# tend-fixtures

Small test apps for exercising Tend deploys: every deployment form, confusing layouts, several languages, apps that need a database or variables, and apps that are meant to fail.

**One branch per fixture** (branch name = fixture id). This `main` branch holds only this catalogue and `FIXTURE.template.md`. Each fixture branch has `FIXTURE.md` at its root (front matter: `id`, `path`, `port`, `needs`, `expect`) with exact deploy steps and verify checks.

Conventions: pinned base images, no secrets, builds in seconds. Every app serves `GET /` -> `fixture <id> OK` plus `message: <FIXTURE_MESSAGE or (unset)>` (so a test can assert env reached the container) and `GET /health` -> `ok` (unless noted).

Tend builds a Git app from a Dockerfile, from a static `index.html` (root or one subfolder), or from source with Railpack (Node, Go, Python, Vite static); Compose is a separate source type. The "autodetect" fixtures deploy through Railpack since 0.11.x; `python-nodockerfile` carries a `start_command` because Railpack guesses `main:app`.

Build time is warm (base image already pulled, `docker build` locally); size is `docker image inspect`. Measured 2026-10-18.

| id | stack | path | needs | expected detection | expected result | exercises | build / image |
|---|---|---|---|---|---|---|---|
| `static-plain` | HTML | static | - | static | OK | root index.html -> generated nginx | - |
| `static-subdir` | HTML | static | - | not at root; ideal: publish dir `public/` | OK (static_subdir, serves `public/`) | index.html not at root | - |
| `vite-static` | Vite vanilla | autodetect | - | vite-static (`npm run build` -> `dist/`) | OK (Railpack) | Vite static detection; must not publish source | npm build 1 s |
| `node-express-dockerfile` | Node 22 Express | dockerfile | PORT, FIXTURE_MESSAGE | dockerfile, port 3000 from EXPOSE | OK | baseline Dockerfile build | 3 s / 57 MB |
| `node-express-nodockerfile` | Node 22 Express | autodetect | PORT | node (`npm ci`, `npm start`) | OK (Railpack) | Node autodetect | - |
| `sveltekit-node` | SvelteKit adapter-node | dockerfile | FIXTURE_MESSAGE (runtime) | dockerfile, port 3000 | OK | multi-stage npm build, runtime env | 7 s / 55 MB |
| `go-http` | Go 1.23 | dockerfile | - | dockerfile, NO EXPOSE (8080) | OK with port warning/guess | undeclared port | 7 s / 8 MB |
| `go-nodockerfile` | Go 1.23 | autodetect | - | go (`go build`) | OK (Railpack) | Go autodetect | - |
| `python-flask` | Flask + gunicorn | dockerfile | FIXTURE_MESSAGE | dockerfile, port 8000 | OK | python Dockerfile | 8 s / 50 MB |
| `python-nodockerfile` | Flask | autodetect | - | python (requirements.txt; start cmd ambiguous) | OK (Railpack) | Python autodetect, start-command ambiguity | - |
| `dockerfile-subdir` | Node | dockerfile | dockerfile path + context | none at root; ideal: `docker/web.Dockerfile`, ctx `app/` | OK once path/context set | non-root Dockerfile and context | 1 s / 55 MB |
| `dockerfile-and-compose` | Node | compose | - | ambiguous: suggest Compose | OK via Compose (web + worker) | Dockerfile vs compose.yaml ambiguity | 14 s / 55 MB |
| `compose-web-api-db` | Node + Go + postgres:16.6-alpine | compose | DB_PASSWORD (secret), volume `pgdata` | compose; api/db internal | OK; counter survives redeploy | db, secret var, volume persistence, healthchecks | 52 s up (3 builds) / web 55 MB, api ~8 MB |
| `compose-env-vars` | Node | compose | GREETING, FEATURE_FLAG | compose; unlisted env-set key | OK + warning FEATURE_FLAG not passed | `${VAR:-}` wiring, env-set key not passed | ~3 s / 55 MB |
| `bibliaberea-shape` | Node + Python/sqlite | compose | volume `berea-data`, TEND_URL_WEB (Tend-injected) | compose; `x-tend` address/web_port/swap | OK; side-by-side swap | Biblia Berea compose shape | ~10 s / web 55 MB, api ~50 MB |
| `needs-env-required` | Node | dockerfile | API_KEY (required) | dockerfile | without key: FAILED + clear error, previous kept; with key OK | failed deploy, rollback, error surfacing | 2 s / 55 MB |
| `crash-on-start` | alpine sh | dockerfile | - | dockerfile | FAILED (exit 1 after 2 s), previous kept | clean failure | 2 s / 3.6 MB |
| `slow-start` | Node | dockerfile | START_DELAY_SECONDS=40 | dockerfile + HEALTHCHECK start-period 60 s | OK after ~40 s, no false alert | start_period, slow health | 3 s / 55 MB |
| `big-image` | Node + 300 MB filler | dockerfile | - | dockerfile | OK, slow | build/push timeouts, progress | 2 s / 370 MB |
| `wrong-port` | Node | dockerfile | port 5000 | dockerfile, EXPOSE 8080 (wrong) | warn/fail on 8080; OK on 5000 | EXPOSE vs actual listening port | 1 s / 55 MB |
| `php-apache` | PHP 8.3 Apache | dockerfile | - | dockerfile, port 80 | OK | non-Node language, port 80 | 1 s / 177 MB |
| `ruby-sinatra` | Ruby 3.3 Sinatra | dockerfile | - | dockerfile, port 4567 | OK | ruby | 6 s / 54 MB |
| `rust-axum` | Rust 1.83 axum | dockerfile | - | dockerfile, port 3000 | OK | multi-stage cargo (slowest cold build) | 27 s / 4 MB |
| `monorepo` | Node x2 | dockerfile | context per app | nothing at root; `apps/web`, `apps/api` Dockerfiles | OK as two apps with path+context | monorepo, no compose | 3 s each / 55 MB |
| `image-whoami` | none (traefik/whoami:v1.10.3) | image | - | image source, port 80 | OK | image path, pinned tag | pull only |

Notes: `rust-axum` pins `hyper-util` to 0.1.10 in `Cargo.lock` (newer needs a newer cargo than 1.83). Compose fixtures were run with `docker compose up --wait` locally. `slow-start` verified: 503 at 5 s, `ok` and Docker health `healthy` at 43 s.
