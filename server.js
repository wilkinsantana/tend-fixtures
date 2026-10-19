const express = require('express');
const app = express();
const id = 'node-express-nodockerfile';
const port = Number(process.env.PORT || 3000);
const msg = process.env.FIXTURE_MESSAGE || '(unset)';
app.get('/health', (req, res) => res.type('text').send('ok'));
app.get('/', (req, res) => res.send(`<h1>fixture ${id} OK</h1><p>message: ${msg}</p>`));
app.listen(port, '0.0.0.0', () => console.log(`fixture ${id} listening on ${port} message=${msg}`));
