---
id: python-nodockerfile
path: autodetect
port: 8000
needs: []
expect: autodetect Python: pip install -r requirements.txt, start command gunicorn app:app (no Procfile, must be inferred or asked); today: not buildable
---

# python-nodockerfile

Flask app with `requirements.txt` (flask, gunicorn), no Dockerfile, no Procfile.

## Deploy on Tend
Git app from this branch.
- Today: unsupported, needs a Dockerfile.
- Planned autodetect (Python): `pip install -r requirements.txt`; start command is ambiguous (`app.py` runs Flask dev server on PORT, gunicorn is in requirements: `gunicorn app:app`). Tend should pick one or ask, and say which.

## Verify
- `GET /health` -> `ok`
- `GET /` -> `fixture python-nodockerfile OK`

## Expected detection
`python` (requirements.txt + app.py), port from PORT (default 8000).
