import React, { useState, useEffect } from "react";

const DragodindForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    couleurs: "",
    sexe: "",
    generation: 0,
    nb_production: 0,
    quantite: 1,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        couleurs: initialData.couleurs || "",
        sexe: initialData.sexe || "",
        generation: initialData.generation || 0,
        nb_production: initialData.nb_production || 0,
        quantite: 1, // Toujours 1 en mode modification
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.couleurs.trim()) {
      newErrors.couleurs = "Les couleurs sont requises";
    }

    if (!formData.sexe) {
      newErrors.sexe = "Le sexe est requis";
    }

    if (formData.generation < 0) {
      newErrors.generation = "La génération doit être positive";
    }

    if (formData.nb_production < 0) {
      newErrors.nb_production = "Le nombre de reproductions doit être positif";
    }

    if (!initialData && (formData.quantite < 1 || formData.quantite > 50)) {
      newErrors.quantite = "La quantité doit être entre 1 et 50";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const success = await onSubmit(formData);
    if (success && !initialData) {
      // Reset le formulaire seulement si c'est une création
      setFormData({
        couleurs: "",
        sexe: "",
        generation: 0,
        nb_production: 0,
        quantite: 1,
      });
      setErrors({});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "generation" || name === "nb_production" || name === "quantite"
          ? parseInt(value) || 0
          : value,
    }));

    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="dragodinde-form">
      <div className="form-group">
        <label htmlFor="couleurs">Couleurs *</label>
        <input
          type="text"
          id="couleurs"
          name="couleurs"
          value={formData.couleurs}
          onChange={handleChange}
          placeholder="Ex: Orchidée, Émeraude, Pourpre.."
          className={errors.couleurs ? "error" : ""}
        />
        {errors.couleurs && (
          <span className="error-text">{errors.couleurs}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="sexe">Sexe *</label>
        <select
          id="sexe"
          name="sexe"
          value={formData.sexe}
          onChange={handleChange}
          className={errors.sexe ? "error" : ""}
        >
          <option value="">Sélectionner un sexe</option>
          <option value="Male">Mâle</option>
          <option value="Femelle">Femelle</option>
        </select>
        {errors.sexe && <span className="error-text">{errors.sexe}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="generation">Génération *</label>
        <input
          type="number"
          id="generation"
          name="generation"
          value={formData.generation}
          onChange={handleChange}
          min="0"
          className={errors.generation ? "error" : ""}
        />
        {errors.generation && (
          <span className="error-text">{errors.generation}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="nb_production">Nombre de reproductions *</label>
        <input
          type="number"
          id="nb_production"
          name="nb_production"
          value={formData.nb_production}
          onChange={handleChange}
          min="0"
          className={errors.nb_production ? "error" : ""}
        />
        {errors.nb_production && (
          <span className="error-text">{errors.nb_production}</span>
        )}
      </div>

      {!initialData && (
        <div className="form-group">
          <label htmlFor="quantite">Quantité à créer *</label>
          <input
            type="number"
            id="quantite"
            name="quantite"
            value={formData.quantite}
            onChange={handleChange}
            min="1"
            max="50"
            className={errors.quantite ? "error" : ""}
            placeholder="Nombre de dragodindes identiques à créer"
          />
          {errors.quantite && (
            <span className="error-text">{errors.quantite}</span>
          )}
          <small className="field-help">
            Vous pouvez créer jusqu'à 50 dragodindes identiques en une fois
          </small>
        </div>
      )}

      <div className="form-buttons">
        <button type="submit" className="btn btn-primary">
          {initialData
            ? "Modifier"
            : `Ajouter${
                formData.quantite > 1 ? ` (${formData.quantite})` : ""
              }`}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
};

export default DragodindForm;
