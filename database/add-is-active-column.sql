-- Ajouter la colonne is_active à la table api_keys
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Mettre à jour toutes les clés existantes pour qu'elles soient actives
UPDATE api_keys SET is_active = true WHERE is_active IS NULL;

-- Créer un index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_api_keys_is_active ON api_keys(is_active);

