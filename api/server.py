import json
import os
import sqlite3
from http.server import BaseHTTPRequestHandler, HTTPServer

DB = os.environ.get("BEREA_DB_PATH") or "/data/app.db"
conn = sqlite3.connect(DB, check_same_thread=False)
conn.execute("CREATE TABLE IF NOT EXISTS reads (id INTEGER PRIMARY KEY AUTOINCREMENT)")
conn.commit()


class H(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/health":
            body, ctype = b"ok", "text/plain"
        else:
            conn.execute("INSERT INTO reads DEFAULT VALUES")
            conn.commit()
            n = conn.execute("SELECT count(*) FROM reads").fetchone()[0]
            body, ctype = json.dumps({"reads": n}).encode(), "application/json"
        self.send_response(200)
        self.send_header("content-type", ctype)
        self.end_headers()
        self.wfile.write(body)


addr = os.environ.get("BIBLE_API_ADDR") or "0.0.0.0:8086"
host, port = addr.rsplit(":", 1)
print(f"fixture bibliaberea-shape api on {addr}, db {DB}", flush=True)
HTTPServer((host, int(port)), H).serve_forever()
