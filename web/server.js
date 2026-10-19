const http = require('http');
const id = 'bibliaberea-shape';
const api = process.env.BIBLE_API_URL || 'http://api:8086';
const origin = process.env.BEREA_PUBLIC_ORIGIN || '(unset)';
http.createServer(async (req, res) => {
  if (req.url === '/health') { res.writeHead(200, { 'content-type': 'text/plain' }); return res.end('ok'); }
  try {
    const r = await fetch(`${api}/verse`);
    if (!r.ok) throw new Error(`api status ${r.status}`);
    const v = await r.json();
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(`<h1>fixture ${id} OK</h1><p>origin: ${origin}</p><p>verse reads: ${v.reads}</p>`);
  } catch (e) {
    res.writeHead(502, { 'content-type': 'text/plain' });
    res.end(`api unreachable: ${e.message}`);
  }
}).listen(3000, '0.0.0.0', () => console.log(`fixture ${id} web on 3000 origin=${origin}`));
