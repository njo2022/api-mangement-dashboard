-- Script pour vérifier que le schéma est correct
-- Exécutez ce script pour vérifier que les tables existent

-- Vérifier que les tables existent
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name IN ('api_keys', 'subscription_plans', 'user_subscriptions')
ORDER BY table_name, ordinal_position;

-- Vérifier les contraintes
SELECT 
  tc.table_name,
  tc.constraint_name,
  tc.constraint_type,
  kcu.column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
  ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_name IN ('api_keys', 'subscription_plans', 'user_subscriptions')
ORDER BY tc.table_name, tc.constraint_type;
