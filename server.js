const http = require('http');
const id = 'needs-env-required';
const key = process.env.API_KEY;
if (!key) {
  console.error('FATAL: API_KEY is required but not set. Add API_KEY to the app environment (env set) and redeploy.');
  process.exit(1);
}
const port = Number(process.env.PORT || 3000);
http.createServer((req, res) => {
  if (req.url === '/health') { res.writeHead(200, { 'content-type': 'text/plain' }); return res.end('ok'); }
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end(`<h1>fixture ${id} OK</h1><p>API_KEY is set (length ${key.length})</p>`);
}).listen(port, '0.0.0.0', () => console.log(`fixture ${id} listening on ${port}, API_KEY length ${key.length}`));
