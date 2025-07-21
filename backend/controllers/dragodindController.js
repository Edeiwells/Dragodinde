const pool = require("../config/database");
const {
  success,
  error,
  notFound,
  created,
} = require("../utils/responseHelper");

/**
 * Controller pour la gestion des dragodindes
 */
const dragodindController = {
  /**
   * Récupérer toutes les dragodindes
   */
  async getAll(req, res) {
    try {
      const result = await pool.query(
        "SELECT * FROM dragodindes ORDER BY id ASC"
      );
      return success(res, result.rows);
    } catch (err) {
      console.error("Erreur lors de la récupération des dragodindes:", err);
      return error(
        res,
        "Erreur serveur lors de la récupération des dragodindes"
      );
    }
  },

  /**
   * Récupérer une dragodinde par ID
   */
  async getById(req, res) {
    const { id } = req.params;
    try {
      const result = await pool.query(
        "SELECT * FROM dragodindes WHERE id = $1",
        [id]
      );

      if (result.rows.length === 0) {
        return notFound(res, "Dragodinde non trouvée");
      }

      return success(res, result.rows[0]);
    } catch (err) {
      console.error("Erreur lors de la récupération de la dragodinde:", err);
      return error(
        res,
        "Erreur serveur lors de la récupération de la dragodinde"
      );
    }
  },

  /**
   * Créer une nouvelle dragodinde
   */
  async create(req, res) {
    const { couleurs, sexe, generation, nb_production } = req.body;

    try {
      const result = await pool.query(
        "INSERT INTO dragodindes (couleurs, sexe, generation, nb_production) VALUES ($1, $2, $3, $4) RETURNING *",
        [couleurs, sexe, generation, nb_production]
      );

      return created(res, result.rows[0], "Dragodinde créée avec succès");
    } catch (err) {
      console.error("Erreur lors de la création de la dragodinde:", err);
      return error(res, "Erreur serveur lors de la création de la dragodinde");
    }
  },

  /**
   * Créer plusieurs dragodindes identiques
   */
  async createBatch(req, res) {
    const { couleurs, sexe, generation, nb_production, quantite } = req.body;

    try {
      const createdDragodindes = [];
      const client = await pool.connect();

      try {
        await client.query("BEGIN");

        for (let i = 0; i < quantite; i++) {
          const result = await client.query(
            "INSERT INTO dragodindes (couleurs, sexe, generation, nb_production) VALUES ($1, $2, $3, $4) RETURNING *",
            [couleurs, sexe, generation, nb_production]
          );
          createdDragodindes.push(result.rows[0]);
        }

        await client.query("COMMIT");

        return created(
          res,
          {
            dragodindes: createdDragodindes,
            count: quantite,
          },
          `${quantite} dragodinde(s) créée(s) avec succès`
        );
      } catch (err) {
        await client.query("ROLLBACK");
        throw err;
      } finally {
        client.release();
      }
    } catch (err) {
      console.error("Erreur lors de la création en lot des dragodindes:", err);
      return error(
        res,
        "Erreur serveur lors de la création en lot des dragodindes"
      );
    }
  },

  /**
   * Mettre à jour une dragodinde
   */
  async update(req, res) {
    const { id } = req.params;
    const { couleurs, sexe, generation, nb_production } = req.body;

    try {
      const result = await pool.query(
        "UPDATE dragodindes SET couleurs = $1, sexe = $2, generation = $3, nb_production = $4 WHERE id = $5 RETURNING *",
        [couleurs, sexe, generation, nb_production, id]
      );

      if (result.rows.length === 0) {
        return notFound(res, "Dragodinde non trouvée");
      }

      return success(res, result.rows[0], "Dragodinde mise à jour avec succès");
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la dragodinde:", err);
      return error(
        res,
        "Erreur serveur lors de la mise à jour de la dragodinde"
      );
    }
  },

  /**
   * Supprimer une dragodinde
   */
  async delete(req, res) {
    const { id } = req.params;
    try {
      const result = await pool.query(
        "DELETE FROM dragodindes WHERE id = $1 RETURNING *",
        [id]
      );

      if (result.rows.length === 0) {
        return notFound(res, "Dragodinde non trouvée");
      }

      return success(res, result.rows[0], "Dragodinde supprimée avec succès");
    } catch (err) {
      console.error("Erreur lors de la suppression de la dragodinde:", err);
      return error(
        res,
        "Erreur serveur lors de la suppression de la dragodinde"
      );
    }
  },
};

module.exports = dragodindController;
