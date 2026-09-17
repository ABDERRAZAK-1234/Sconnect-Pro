const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on("connect", () => {
    console.log("Connexion a PostgreSQL réussie");   
});
pool.on("error", (err)=>{
    console.error("Erreur PostgreSQL",err);
});

module.exports = pool;