const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import des routes
const dragodindRoutes = require("./routes/dragodindRoutes");
const pool = require("./config/database");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Middleware de logging pour le développement
if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Route de test
app.get("/", (req, res) => {
  res.json({
    message: "API Dragodinde - Serveur en ligne!",
    version: "2.0.0",
    endpoints: {
      dragodindes: "/api/dragodindes",
    },
  });
});

// Routes principales
app.use("/api/dragodindes", dragodindRoutes);

// Middleware de gestion des erreurs 404
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Route non trouvée",
    path: req.originalUrl,
  });
});

// Middleware de gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error("Erreur non gérée:", err);
  res.status(500).json({
    success: false,
    error: "Erreur interne du serveur",
  });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`🚀 Serveur backend démarré sur le port ${port}`);
  console.log(`📡 API disponible sur http://localhost:${port}/api/dragodindes`);
  console.log(`🏗️  Architecture modulaire activée`);
});

// Gestion de l'arrêt propre
process.on("SIGINT", async () => {
  console.log("\n🛑 Arrêt du serveur...");
  try {
    await pool.end();
    console.log("📊 Connexion à la base de données fermée");
    process.exit(0);
  } catch (err) {
    console.error("❌ Erreur lors de la fermeture:", err);
    process.exit(1);
  }
});

// Gestion des erreurs non capturées
process.on("unhandledRejection", (reason, promise) => {
  console.error("Promesse rejetée non gérée:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Exception non capturée:", error);
  process.exit(1);
});
