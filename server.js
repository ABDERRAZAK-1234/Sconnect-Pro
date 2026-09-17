require('dotenv').config();

const http = require('http');
const router = require('./src/core/router');

const port = process.env.PORT_Node || 3000;

const server = http.createServer((req, res) => {
    router.lookup(req, res);
});

server.listen(port, () => {
    console.log(`Le serveur est demarré sur le port : ${port}`);
});