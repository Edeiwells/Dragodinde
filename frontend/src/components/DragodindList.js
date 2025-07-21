import React from "react";

const DragodindList = ({ dragodindes, onEdit, onDelete }) => {
  // Protection contre les données invalides
  if (!Array.isArray(dragodindes)) {
    console.error(
      "DragodindList: dragodindes n'est pas un tableau:",
      dragodindes
    );
    return (
      <div className="empty-state">
        <h3>Erreur de chargement</h3>
        <p>Les données ne sont pas dans le format attendu.</p>
      </div>
    );
  }

  if (dragodindes.length === 0) {
    return (
      <div className="empty-state">
        <h3>Aucune dragodinde trouvée</h3>
        <p>Commencez par ajouter votre première dragodinde !</p>
      </div>
    );
  }

  return (
    <div className="dragodinde-list">
      {dragodindes.map((dragodinde) => (
        <div key={dragodinde.id} className="dragodinde-card">
          <div className="dragodinde-info">
            <div className="info-item">
              <span className="info-label">Couleurs</span>
              <span className="info-value">{dragodinde.couleurs}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Sexe</span>
              <span
                className={`info-value ${
                  dragodinde.sexe === "Male" ? "sexe-male" : "sexe-femelle"
                }`}
              >
                {dragodinde.sexe === "Male" ? "♂ Mâle" : "♀ Femelle"}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Génération</span>
              <span className="info-value">{dragodinde.generation}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Reproductions</span>
              <span className="info-value">{dragodinde.nb_production}</span>
            </div>
          </div>

          <div className="dragodinde-actions">
            <button onClick={() => onEdit(dragodinde)} className="btn btn-edit">
              Modifier
            </button>
            <button
              onClick={() => onDelete(dragodinde.id)}
              className="btn btn-danger"
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DragodindList;
