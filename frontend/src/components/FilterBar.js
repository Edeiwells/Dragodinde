import React, { useState, useEffect } from "react";

const FilterBar = ({ dragodindes, onFilterChange }) => {
  const [filterType, setFilterType] = useState("all"); // all, couleurs, generation
  const [selectedCouleur, setSelectedCouleur] = useState("");
  const [selectedGeneration, setSelectedGeneration] = useState("");

  // Extraire les couleurs et générations uniques
  const uniqueCouleurs = [...new Set(dragodindes.map(d => d.couleurs))].sort();
  const uniqueGenerations = [...new Set(dragodindes.map(d => d.generation))].sort((a, b) => a - b);

  // Appliquer les filtres
  useEffect(() => {
    let filtered = [...dragodindes];

    if (filterType === "couleurs" && selectedCouleur) {
      filtered = filtered.filter(d => d.couleurs === selectedCouleur);
    } else if (filterType === "generation" && selectedGeneration) {
      filtered = filtered.filter(d => d.generation === parseInt(selectedGeneration));
    }

    onFilterChange(filtered);
  }, [filterType, selectedCouleur, selectedGeneration, dragodindes, onFilterChange]);

  const handleFilterTypeChange = (type) => {
    setFilterType(type);
    // Reset les sélections quand on change de type de filtre
    setSelectedCouleur("");
    setSelectedGeneration("");
  };

  const resetFilters = () => {
    setFilterType("all");
    setSelectedCouleur("");
    setSelectedGeneration("");
  };

  return (
    <div className="filter-bar">
      <div className="filter-header">
        <h3>🔍 Filtres</h3>
        <button onClick={resetFilters} className="btn btn-reset">
          Réinitialiser
        </button>
      </div>

      <div className="filter-options">
        <div className="filter-type-selector">
          <label>
            <input
              type="radio"
              name="filterType"
              value="all"
              checked={filterType === "all"}
              onChange={() => handleFilterTypeChange("all")}
            />
            <span>Toutes les dragodindes</span>
          </label>

          <label>
            <input
              type="radio"
              name="filterType"
              value="couleurs"
              checked={filterType === "couleurs"}
              onChange={() => handleFilterTypeChange("couleurs")}
            />
            <span>Par couleurs</span>
          </label>

          <label>
            <input
              type="radio"
              name="filterType"
              value="generation"
              checked={filterType === "generation"}
              onChange={() => handleFilterTypeChange("generation")}
            />
            <span>Par génération</span>
          </label>
        </div>

        {filterType === "couleurs" && (
          <div className="filter-select">
            <label htmlFor="couleur-select">Choisir une couleur :</label>
            <select
              id="couleur-select"
              value={selectedCouleur}
              onChange={(e) => setSelectedCouleur(e.target.value)}
              className="form-select"
            >
              <option value="">-- Sélectionner une couleur --</option>
              {uniqueCouleurs.map(couleur => (
                <option key={couleur} value={couleur}>
                  {couleur}
                </option>
              ))}
            </select>
          </div>
        )}

        {filterType === "generation" && (
          <div className="filter-select">
            <label htmlFor="generation-select">Choisir une génération :</label>
            <select
              id="generation-select"
              value={selectedGeneration}
              onChange={(e) => setSelectedGeneration(e.target.value)}
              className="form-select"
            >
              <option value="">-- Sélectionner une génération --</option>
              {uniqueGenerations.map(generation => (
                <option key={generation} value={generation}>
                  Génération {generation}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="filter-info">
        {filterType === "couleurs" && selectedCouleur && (
          <p className="filter-active">
            📍 Filtrage par couleur : <strong>{selectedCouleur}</strong>
          </p>
        )}
        {filterType === "generation" && selectedGeneration && (
          <p className="filter-active">
            📍 Filtrage par génération : <strong>Génération {selectedGeneration}</strong>
          </p>
        )}
        
        {/* Statistiques des filtres */}
        {filterType !== "all" && (
          <div className="filter-stats">
            <div className="stats-grid">
              {filterType === "couleurs" && (
                <div className="stat-item">
                  <strong>Couleurs disponibles :</strong> {uniqueCouleurs.length}
                </div>
              )}
              {filterType === "generation" && (
                <div className="stat-item">
                  <strong>Générations disponibles :</strong> {uniqueGenerations.length} (Gen {Math.min(...uniqueGenerations)} à Gen {Math.max(...uniqueGenerations)})
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
