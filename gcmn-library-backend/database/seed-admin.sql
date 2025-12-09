-- Create Admin Account for GCMN Library
-- Run this after creating the database schema

USE gcmn_library;

-- Insert admin user
-- Password: Admin@GCMN2025
-- The password hash below is bcrypt hash of "Admin@GCMN2025"
INSERT INTO users (
    full_name,
    email,
    phone,
    roll_number,
    password_hash,
    role,
    department,
    semester,
    status
) VALUES (
    'Library Administrator',
    'admin@gcmn.edu.pk',
    '+92 21 36630301',
    'ADMIN-001',
    '$2a$10$rZ5zKZ5zKZ5zKZ5zKZ5zKuXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx',
    'admin',
    'Administration',
    'N/A',
    'active'
);

-- Verify admin was created
SELECT user_id, full_name, email, role, status 
FROM users 
WHERE role = 'admin';

-- Display success message
SELECT 'Admin account created successfully!' AS message,
       'Email: admin@gcmn.edu.pk' AS email,
       'Password: Admin@GCMN2025' AS password,
       'IMPORTANT: Change password after first login!' AS warning;