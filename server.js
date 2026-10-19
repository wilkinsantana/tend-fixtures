const http = require('http');
const id = 'slow-start';
const delay = Number(process.env.START_DELAY_SECONDS || 40);
const t0 = Date.now();
const ready = () => (Date.now() - t0) / 1000 >= delay;
http.createServer((req, res) => {
  if (!ready()) { res.writeHead(503, { 'content-type': 'text/plain' }); return res.end('starting'); }
  if (req.url === '/health') { res.writeHead(200, { 'content-type': 'text/plain' }); return res.end('ok'); }
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end(`<h1>fixture ${id} OK</h1><p>ready after ${delay}s</p>`);
}).listen(3000, '0.0.0.0', () => console.log(`fixture ${id} listening, ready in ${delay}s`));
