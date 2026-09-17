const http = require('http');
const db = require('./src/config/db');
const { json } = require('stream/consumers');
const port = process.env.PORT_Node || 3000;
const server = http.createServer(async (req, res) => {
    try {
        const result = await db.query("SELECT NOW()");

        res.writeHead(200, {
            "content-type": "application/json"
        });

        res.end(JSON.stringify({
            message: "SportConnect is running ...",
            database: "Connected",
            time: result.rows[0].now
        }));


    } catch (error) {
        console.log("Erreur", error);

        res.writeHead(500, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            error: "Erreur de connexion à PostgreSQL"
        }));
    }
});


server.listen(port, () => {
    console.log(`Le serveur est demarré sur le port :${port}`);
});