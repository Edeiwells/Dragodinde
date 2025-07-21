import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import DragodindForm from "./components/DragodindForm";
import DragodindList from "./components/DragodindList";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

function App() {
  const [dragodindes, setDragodindes] = useState([]);
  const [editingDragodinde, setEditingDragodinde] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Charger les dragodindes au démarrage
  useEffect(() => {
    fetchDragodindes();
  }, []);

  const fetchDragodindes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/dragodindes`);
      
      // Le backend renvoie maintenant { success: true, data: [...] }
      let data = [];
      
      if (response.data && response.data.success && response.data.data) {
        data = response.data.data;
      } else if (Array.isArray(response.data)) {
        // Fallback pour l'ancienne structure
        data = response.data;
      } else {
        console.error("Structure de réponse inattendue:", response.data);
        data = [];
      }
      
      // S'assurer que c'est un tableau
      if (Array.isArray(data)) {
        setDragodindes(data);
      } else {
        console.error("Les données ne sont pas un tableau:", data);
        setDragodindes([]);
      }
      setError("");
    } catch (err) {
      console.error("Erreur lors du chargement des dragodindes:", err);
      setError("Erreur lors du chargement des dragodindes");
      setDragodindes([]); // Assurer qu'on a toujours un tableau
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (dragodindData) => {
    try {
      // Si quantité > 1, utiliser la route batch, sinon la route normale
      if (dragodindData.quantite && dragodindData.quantite > 1) {
        const response = await axios.post(
          `${API_URL}/dragodindes/batch`,
          dragodindData
        );
        
        // Le backend renvoie { success: true, data: { dragodindes: [...], count: X } }
        let newDragodindes = [];
        if (response.data && response.data.success && response.data.data) {
          newDragodindes = response.data.data.dragodindes || [];
        } else if (response.data.dragodindes) {
          // Fallback
          newDragodindes = response.data.dragodindes;
        }
        
        if (Array.isArray(newDragodindes)) {
          setDragodindes([...dragodindes, ...newDragodindes]);
        }
        setError("");
        return true;
      } else {
        // Création normale (quantité = 1 ou non spécifiée)
        const { quantite, ...createData } = dragodindData; // Enlever quantite pour la route normale
        const response = await axios.post(`${API_URL}/dragodindes`, createData);
        
        // Le backend renvoie { success: true, data: {...} }
        let newDragodinde = null;
        if (response.data && response.data.success && response.data.data) {
          newDragodinde = response.data.data;
        } else {
          // Fallback
          newDragodinde = response.data;
        }
        
        if (newDragodinde) {
          setDragodindes([...dragodindes, newDragodinde]);
        }
        setError("");
        return true;
      }
    } catch (err) {
      console.error("Erreur lors de la création:", err);
      setError(err.response?.data?.error || "Erreur lors de la création");
      return false;
    }
  };

  const handleUpdate = async (id, dragodindData) => {
    try {
      const response = await axios.put(
        `${API_URL}/dragodindes/${id}`,
        dragodindData
      );
      
      // Le backend renvoie { success: true, data: {...} }
      let updatedDragodinde = null;
      if (response.data && response.data.success && response.data.data) {
        updatedDragodinde = response.data.data;
      } else {
        // Fallback
        updatedDragodinde = response.data;
      }
      
      if (updatedDragodinde) {
        setDragodindes(
          dragodindes.map((d) => (d.id === id ? updatedDragodinde : d))
        );
      }
      setEditingDragodinde(null);
      setError("");
      return true;
    } catch (err) {
      console.error("Erreur lors de la mise à jour:", err);
      setError(err.response?.data?.error || "Erreur lors de la mise à jour");
      return false;
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm("Êtes-vous sûr de vouloir supprimer cette dragodinde ?")
    ) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/dragodindes/${id}`);
      setDragodindes(dragodindes.filter((d) => d.id !== id));
      setError("");
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
      setError(err.response?.data?.error || "Erreur lors de la suppression");
    }
  };

  const handleEdit = (dragodinde) => {
    setEditingDragodinde(dragodinde);
  };

  const handleCancelEdit = () => {
    setEditingDragodinde(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🐉 Élevage de Dragodinde</h1>
        <p>Gérez votre élevage de dragodindes en toute simplicité</p>
      </header>

      <main className="App-main">
        {error && <div className="error-message">{error}</div>}

        <div className="content-container">
          <div className="form-section">
            <h2>
              {editingDragodinde
                ? "Modifier la Dragodinde"
                : "Ajouter une Dragodinde"}
            </h2>
            <DragodindForm
              onSubmit={
                editingDragodinde
                  ? (data) => handleUpdate(editingDragodinde.id, data)
                  : handleCreate
              }
              initialData={editingDragodinde}
              onCancel={editingDragodinde ? handleCancelEdit : null}
            />
          </div>

          <div className="list-section">
            <h2>
              Liste des Dragodindes (
              {Array.isArray(dragodindes) ? dragodindes.length : 0})
            </h2>
            {loading ? (
              <div className="loading">Chargement...</div>
            ) : (
              <DragodindList
                dragodindes={Array.isArray(dragodindes) ? dragodindes : []}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
