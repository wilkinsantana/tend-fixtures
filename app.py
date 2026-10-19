import os
from flask import Flask

app = Flask(__name__)
ID = "python-flask"
MSG = os.environ.get("FIXTURE_MESSAGE") or "(unset)"


@app.get("/health")
def health():
    return "ok"


@app.get("/")
def index():
    return f"<h1>fixture {ID} OK</h1><p>message: {MSG}</p>"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "8000")))
