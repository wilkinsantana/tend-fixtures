const http = require('http');
const id = 'monorepo-api';
const port = Number(process.env.PORT || 4000);
const msg = process.env.FIXTURE_MESSAGE || '(unset)';
http.createServer((req, res) => {
  if (req.url === '/health') { res.writeHead(200, { 'content-type': 'text/plain' }); return res.end('ok'); }
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end(`<h1>fixture ${id} OK</h1><p>message: ${msg}</p>`);
}).listen(port, '0.0.0.0', () => console.log(`fixture ${id} listening on ${port} message=${msg}`));
