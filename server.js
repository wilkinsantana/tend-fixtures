const http = require('http');
const id = 'compose-env-vars';
const g = process.env.GREETING || '(unset)';
const f = process.env.FEATURE_FLAG || '(unset)';
http.createServer((req, res) => {
  if (req.url === '/health') { res.writeHead(200, { 'content-type': 'text/plain' }); return res.end('ok'); }
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end(`<h1>fixture ${id} OK</h1><p>GREETING: ${g}</p><p>FEATURE_FLAG: ${f}</p>`);
}).listen(3000, '0.0.0.0', () => console.log(`fixture ${id} GREETING=${g} FEATURE_FLAG=${f}`));
