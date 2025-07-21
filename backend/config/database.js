const { Pool } = require("pg");
require("dotenv").config();

// Configuration de la base de données
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "db",
  database: process.env.DB_NAME || "dragodinde_db",
  password: process.env.DB_PASSWORD || "password",
  port: process.env.DB_PORT || 5432,
});

// Test de connexion
pool.on("connect", () => {
  console.log("📊 Connexion à la base de données établie");
});

pool.on("error", (err) => {
  console.error("❌ Erreur de connexion à la base de données:", err);
});

module.exports = pool;
