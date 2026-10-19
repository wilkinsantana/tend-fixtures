const http = require('http');
const id = 'compose-web-api-db';
const api = process.env.API_URL || 'http://api:8080';
const msg = process.env.FIXTURE_MESSAGE || '(unset)';
http.createServer(async (req, res) => {
  if (req.url === '/health') { res.writeHead(200, { 'content-type': 'text/plain' }); return res.end('ok'); }
  try {
    const r = await fetch(`${api}/visit`, { method: 'POST' });
    if (!r.ok) throw new Error(`api status ${r.status}`);
    const { count } = await r.json();
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(`<h1>fixture ${id} OK</h1><p>message: ${msg}</p><p>visits: ${count}</p>`);
  } catch (e) {
    res.writeHead(502, { 'content-type': 'text/plain' });
    res.end(`api unreachable: ${e.message}`);
  }
}).listen(3000, '0.0.0.0', () => console.log(`fixture ${id} web on 3000, api=${api}`));
