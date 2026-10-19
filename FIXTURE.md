---
id: php-apache
path: dockerfile
port: 80
needs: [optional FIXTURE_MESSAGE]
expect: dockerfile build succeeds; apache on 80
---

# php-apache

PHP 8.3 on Apache, port 80. `health` is a static file containing `ok`.

## Deploy on Tend
Git app from this branch, container port 80. Optional env `FIXTURE_MESSAGE`.

## Verify
- `GET /health` -> `ok`
- `GET /` -> `fixture php-apache OK`

## Expected detection
`dockerfile`, EXPOSE 80. (Apache PassEnv: `getenv` works under mod_php.)
