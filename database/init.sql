-- La base de données dragodinde_db est créée automatiquement par Docker
-- via la variable d'environnement POSTGRES_DB dans docker-compose.yml

-- Création de la table dragodindes
CREATE TABLE IF NOT EXISTS dragodindes (
    id SERIAL PRIMARY KEY,
    couleurs VARCHAR(255) NOT NULL,
    sexe VARCHAR(10) NOT NULL CHECK (sexe IN ('Male', 'Femelle')),
    generation INTEGER NOT NULL CHECK (generation >= 0),
    nb_production INTEGER NOT NULL CHECK (nb_production >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertion de données d'exemple
INSERT INTO
    dragodindes (
        couleurs,
        sexe,
        generation,
        nb_production
    )
VALUES ('Rouge et Or', 'Male', 1, 0),
    ('Bleu Océan', 'Femelle', 1, 2),
    ('Vert Emeraude', 'Male', 2, 1),
    (
        'Violet Royal',
        'Femelle',
        1,
        3
    ),
    ('Blanc Nacré', 'Male', 3, 0);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour la mise à jour automatique du timestamp
CREATE TRIGGER update_dragodindes_updated_at 
    BEFORE UPDATE ON dragodindes 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();