const express = require('express');
const http = require('node:http');
const path = require('node:path');
const { uvPath } = require('@titaniumnetwork-dev/ultraviolet');

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uv/', express.static(uvPath));

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`TIMELOOP OS LIVE ON PORT ${port}`));
