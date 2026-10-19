---
id: postgres-replacement
path: image
port: 5432
needs: [env: POSTGRES_PASSWORD, volume: data, db]
expect: image path, stop-first; a same-major redeploy replaces the container on the same data; changing the image to another PostgreSQL major on the same volume is refused before the database is stopped (since 0.11.11)
---

# postgres-replacement

No source: a plain `postgres` image app (created with **Add app**, or with **Databases → Add database**) whose image is later changed. It reproduces the defect seen live on 2026-10-18: replacing such an app failed verification with `replacement failed verification: container restarted 1 time(s) after starting, which is a crash loop`. The cause was an image change from PostgreSQL 17 to 18 on a volume that holds 17 data: the 18 image refuses it (`Error: in 18+, these Docker images are configured to store database data in a format which is compatible with "pg_ctlcluster" ... there appears to be PostgreSQL data in: /var/lib/postgresql`), so the new copy crash-looped after the old one had been stopped. (This branch only holds this file; Git source is not used.)

## Deploy on Tend
1. Env set `postgres-replacement` with `POSTGRES_PASSWORD` (any value), `POSTGRES_USER=app`, `POSTGRES_DB=app`.
2. Image app `postgres-replacement`, image `postgres:17.11-alpine`, volume `postgres-replacement-data` at `/var/lib/postgresql/data`, no domain, the env set attached. Deploy.
3. Write a row: `docker exec postgres-replacement psql -U app -d app -c "create table t(v int); insert into t values (42)"`.
4. Step A, same major: change the image to `postgres:17.10-alpine` (or redeploy unchanged) and deploy.
5. Step B, major change: change the image to `postgres:18.6-alpine` and the volume's mount path to `/var/lib/postgresql` (what the 18 recommendation uses), keep the volume name, deploy.
6. Step C, migrate onto a new volume: dump the 17 database, point the app at a new volume `postgres-replacement-data18` at `/var/lib/postgresql` with `postgres:18.6-alpine`, deploy, restore the dump.

## Verify
- After step 2 and step A: the deploy succeeds; the log says `Replacing by stopping first`, `Parking the current container`, then `Replacement passed startup checks (no web port to check)`; `select v from t` -> `42`. Never two postgres containers on the volume at once.
- After step B (0.11.11 and later): the run fails at `run_container` with `the database's major version would change on the same data: postgres-replacement runs PostgreSQL 17 (postgres:17.11-alpine) and this deploy would start PostgreSQL 18 (postgres:18.6-alpine) on the same data (postgres-replacement-data) ... Nothing was stopped`. The log has no `Parking the current container` line; the 17 container kept running (its `docker inspect` StartedAt is unchanged) and `select v from t` -> `42`.
- After step B on 0.11.10 and earlier (the defect): the old container was stopped, the new one crash-looped, the run failed with `replacement failed verification: container restarted 1 time(s) after starting, which is a crash loop`, and the 17 container was restored.
- After step C: the deploy succeeds (a new volume is never refused); after the restore `select v from t` -> `42`.
- With an unpinned tag (`postgres:latest`) over older data, the failed check ends with `PostgreSQL refused the data folder: ...` instead of only the crash-loop line.

## Expected detection
n/a (image source). Detected as a database (image name, `POSTGRES_PASSWORD`), so it is always replaced stop-first. Troubleshooting entry: "Replacing a plain postgres image app fails verification" in `docs/how-to/troubleshooting-deploys.md`.
