const { validationError } = require("../utils/responseHelper");

/**
 * Validation des données pour une dragodinde
 * @param {Object} req - Objet request d'Express
 * @param {Object} res - Objet response d'Express
 * @param {Function} next - Fonction next d'Express
 */
const validateDragodinde = (req, res, next) => {
  const { couleurs, sexe, generation, nb_production } = req.body;

  // Vérification des champs requis
  if (
    !couleurs ||
    !sexe ||
    generation === undefined ||
    nb_production === undefined
  ) {
    return validationError(
      res,
      "Tous les champs sont requis (couleurs, sexe, generation, nb_production)"
    );
  }

  // Validation du sexe
  if (!["Male", "Femelle"].includes(sexe)) {
    return validationError(res, 'Le sexe doit être "Male" ou "Femelle"');
  }

  // Validation des valeurs numériques
  if (generation < 0 || nb_production < 0) {
    return validationError(
      res,
      "La génération et le nombre de reproductions doivent être positifs"
    );
  }

  // Validation des types
  if (typeof generation !== "number" || typeof nb_production !== "number") {
    return validationError(
      res,
      "La génération et le nombre de reproductions doivent être des nombres"
    );
  }

  next();
};

/**
 * Validation des données pour création en lot
 * @param {Object} req - Objet request d'Express
 * @param {Object} res - Objet response d'Express
 * @param {Function} next - Fonction next d'Express
 */
const validateBatchCreate = (req, res, next) => {
  // D'abord valider les données de base
  const result = validateDragodinde(req, res, () => {});
  if (result) return result; // Si erreur de validation de base

  const { quantite } = req.body;

  // Validation de la quantité
  if (quantite === undefined) {
    return validationError(
      res,
      "Le champ quantité est requis pour la création en lot"
    );
  }

  if (typeof quantite !== "number" || quantite <= 0 || quantite > 50) {
    return validationError(res, "La quantité doit être entre 1 et 50");
  }

  next();
};

/**
 * Validation de l'ID dans les paramètres
 * @param {Object} req - Objet request d'Express
 * @param {Object} res - Objet response d'Express
 * @param {Function} next - Fonction next d'Express
 */
const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id))) {
    return validationError(res, "ID invalide");
  }

  next();
};

module.exports = {
  validateDragodinde,
  validateBatchCreate,
  validateId,
};
