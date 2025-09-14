-- Script pour insérer des données de démo
-- Exécutez ce script après avoir exécuté schema.sql

-- Insérer un utilisateur de démo (simulation)
-- Dans une vraie application, cela viendrait de Supabase Auth

-- Supprimer les clés existantes si elles existent
DELETE FROM api_keys WHERE user_id = '550e8400-e29b-41d4-a716-446655440000';

-- Insérer les nouvelles clés
INSERT INTO api_keys (id, name, type, key_value, usage_count, usage_percent, user_id) VALUES
  (
    gen_random_uuid(),
    'default',
    'dev',
    'tvly-dev-1234567890abcdef1234567890',
    0,
    0.00,
    '550e8400-e29b-41d4-a716-446655440000'
  ),
  (
    gen_random_uuid(),
    'goodnew',
    'dev',
    'tvly-dev-abcdef1234567890abcdef1234',
    0,
    0.00,
    '550e8400-e29b-41d4-a716-446655440000'
  );

-- Insérer un abonnement de démo
-- Supprimer l'abonnement existant si il existe
DELETE FROM user_subscriptions WHERE user_id = '550e8400-e29b-41d4-a716-446655440000';

-- Insérer le nouvel abonnement
INSERT INTO user_subscriptions (id, user_id, plan_id, current_usage, is_pay_as_you_go) VALUES
  (
    gen_random_uuid(),
    '550e8400-e29b-41d4-a716-446655440000',
    (SELECT id FROM subscription_plans WHERE name = 'Researcher' LIMIT 1),
    0,
    true
  );
