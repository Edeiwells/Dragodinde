/**
 * Utilitaires pour standardiser les réponses API
 */

/**
 * Réponse de succès
 * @param {Object} res - Objet response d'Express
 * @param {Object} data - Données à retourner
 * @param {string} message - Message optionnel
 * @param {number} statusCode - Code de statut HTTP (200 par défaut)
 */
const success = (res, data, message = null, statusCode = 200) => {
  const response = {
    success: true,
    ...(message && { message }),
    data,
  };
  return res.status(statusCode).json(response);
};

/**
 * Réponse d'erreur
 * @param {Object} res - Objet response d'Express
 * @param {string} error - Message d'erreur
 * @param {number} statusCode - Code de statut HTTP (500 par défaut)
 */
const error = (res, error, statusCode = 500) => {
  const response = {
    success: false,
    error,
  };
  return res.status(statusCode).json(response);
};

/**
 * Réponse pour ressource non trouvée
 * @param {Object} res - Objet response d'Express
 * @param {string} message - Message personnalisé
 */
const notFound = (res, message = "Ressource non trouvée") => {
  return error(res, message, 404);
};

/**
 * Réponse pour erreur de validation
 * @param {Object} res - Objet response d'Express
 * @param {string} message - Message d'erreur de validation
 */
const validationError = (res, message) => {
  return error(res, message, 400);
};

/**
 * Réponse pour création réussie
 * @param {Object} res - Objet response d'Express
 * @param {Object} data - Données créées
 * @param {string} message - Message de succès
 */
const created = (res, data, message = "Créé avec succès") => {
  return success(res, data, message, 201);
};

module.exports = {
  success,
  error,
  notFound,
  validationError,
  created,
};
