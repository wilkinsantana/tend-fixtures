---
id: python-nodockerfile
path: autodetect
port: 8000
needs: []
expect: deploys and answers (Railpack source build)
e2e_recipe: railpack
e2e_provider: python
start_command: gunicorn --bind 0.0.0.0:${PORT:-8000} app:app
---

# python-nodockerfile

Flask app with `requirements.txt` (flask, gunicorn), no Dockerfile, no Procfile.

## Deploy on Tend
Git app from this branch.
- Tend builds it from source with Railpack (Python): pip install in a venv. Railpack infers `gunicorn ... main:app`, which is wrong for `app.py`, so this fixture supplies the start command (front matter `start_command`) the way a user would in the add-app form.

## Verify
- `GET /health` -> `ok`
- `GET /` -> `fixture python-nodockerfile OK`

## Expected detection
`python` (requirements.txt + app.py), port from PORT (default 8000).
