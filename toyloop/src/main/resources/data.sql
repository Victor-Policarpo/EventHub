INSERT INTO db_roles (role_id, name) VALUES (1, 'ADMIN') ON CONFLICT (role_id) DO NOTHING;
INSERT INTO db_roles (role_id, name) VALUES (2, 'BASIC') ON CONFLICT (role_id) DO NOTHING;
INSERT INTO db_roles (role_id, name) VALUES (3, 'SYSTEM') ON CONFLICT (role_id) DO NOTHING;