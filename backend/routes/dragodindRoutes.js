const express = require("express");
const router = express.Router();
const dragodindController = require("../controllers/dragodindController");
const {
  validateDragodinde,
  validateBatchCreate,
  validateId,
} = require("../middlewares/validation");

/**
 * Routes pour les dragodindes
 */

// GET /api/dragodindes - Récupérer toutes les dragodindes
router.get("/", dragodindController.getAll);

// GET /api/dragodindes/:id - Récupérer une dragodinde par ID
router.get("/:id", validateId, dragodindController.getById);

// POST /api/dragodindes - Créer une nouvelle dragodinde
router.post("/", validateDragodinde, dragodindController.create);

// POST /api/dragodindes/batch - Créer plusieurs dragodindes identiques
router.post("/batch", validateBatchCreate, dragodindController.createBatch);

// PUT /api/dragodindes/:id - Mettre à jour une dragodinde
router.put("/:id", validateId, validateDragodinde, dragodindController.update);

// DELETE /api/dragodindes/:id - Supprimer une dragodinde
router.delete("/:id", validateId, dragodindController.delete);

module.exports = router;
