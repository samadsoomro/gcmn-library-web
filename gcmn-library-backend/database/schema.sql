-- Gov. College For Men Nazimabad Library Management System
-- Database Schema
-- Updated: 2025

CREATE DATABASE IF NOT EXISTS gcmn_library CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gcmn_library;

-- Users Table (Students and Admin)
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    roll_number VARCHAR(50) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('student', 'admin') DEFAULT 'student',
    department VARCHAR(100),
    semester VARCHAR(50), -- Now stores: Class 11, Class 12, ADA Part 1, ADA Part 2, BSc Part 1, BSc Part 2
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_roll_number (roll_number),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Books Table
CREATE TABLE books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    isbn VARCHAR(20) UNIQUE,
    title VARCHAR(500) NOT NULL,
    author VARCHAR(255) NOT NULL,
    publisher VARCHAR(255),
    publication_year YEAR,
    edition VARCHAR(50),
    category VARCHAR(100) NOT NULL,
    subject VARCHAR(100),
    language VARCHAR(50) DEFAULT 'English',
    total_copies INT DEFAULT 1,
    available_copies INT DEFAULT 1,
    shelf_location VARCHAR(100),
    description TEXT,
    cover_image VARCHAR(255),
    status ENUM('available', 'unavailable', 'maintenance') DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_title (title),
    INDEX idx_author (author),
    INDEX idx_isbn (isbn),
    FULLTEXT idx_search (title, author, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Borrow Records Table
CREATE TABLE borrow_records (
    borrow_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    issue_date DATE NULL,
    due_date DATE NULL,
    return_date DATE NULL,
    status ENUM('pending', 'approved', 'issued', 'returned', 'overdue', 'rejected') DEFAULT 'pending',
    admin_id INT NULL,
    admin_notes TEXT,
    fine_amount DECIMAL(10,2) DEFAULT 0.00,
    fine_paid BOOLEAN DEFAULT FALSE,
    reminder_sent INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_book_id (book_id),
    INDEX idx_status (status),
    INDEX idx_due_date (due_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Notes Table (Updated for Class-based structure)
CREATE TABLE notes (
    note_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    class VARCHAR(50) NOT NULL, -- Class 11, Class 12, ADA Part 1, ADA Part 2, BSc Part 1, BSc Part 2
    subject VARCHAR(100) NOT NULL,
    description TEXT,
    file_path VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) DEFAULT 'PDF',
    file_size INT,
    pages INT,
    uploaded_by INT,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    download_count INT DEFAULT 0,
    status ENUM('active', 'archived') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_class (class),
    INDEX idx_subject (subject),
    INDEX idx_class_subject (class, subject),
    FULLTEXT idx_search (title, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Rare Books Table
CREATE TABLE rare_books (
    rare_book_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    author VARCHAR(255) NOT NULL,
    publication_year YEAR,
    language VARCHAR(50),
    category VARCHAR(100),
    description TEXT,
    pages INT,
    condition_status ENUM('Excellent', 'Good', 'Fair', 'Poor') DEFAULT 'Good',
    file_path VARCHAR(255), -- PDF file path for digital viewing
    cover_image VARCHAR(255),
    acquisition_date DATE,
    historical_significance TEXT,
    view_count INT DEFAULT 0,
    status ENUM('available', 'restricted', 'maintenance') DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_year (publication_year),
    FULLTEXT idx_search (title, author, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert Sample Books
INSERT INTO books (isbn, title, author, category, publication_year, total_copies, available_copies, shelf_location, description) VALUES
('978-0-13-468599-1', 'Introduction to Algorithms', 'Thomas H. Cormen', 'Computer Science', 2022, 5, 3, 'CS-A-101', 'Comprehensive guide to algorithms and data structures'),
('978-0-13-235088-4', 'Clean Code', 'Robert C. Martin', 'Computer Science', 2021, 3, 2, 'CS-A-102', 'A handbook of agile software craftsmanship'),
('978-0-07-338093-4', 'Calculus: Early Transcendentals', 'James Stewart', 'Mathematics', 2020, 10, 8, 'MATH-B-201', 'Comprehensive calculus textbook'),
('978-1-133-95405-7', 'Physics for Scientists and Engineers', 'Raymond A. Serway', 'Physics', 2019, 8, 5, 'PHY-C-301', 'Comprehensive physics textbook'),
('978-0-134-04216-4', 'Organic Chemistry', 'Paula Yurkanis Bruice', 'Chemistry', 2021, 6, 4, 'CHEM-D-401', 'Modern approach to organic chemistry');

-- Insert Sample Notes
INSERT INTO notes (title, class, subject, description, file_path, pages) VALUES
('Calculus and Analytical Geometry', 'Class 11', 'Mathematics', 'Complete notes covering limits, derivatives, and integrals', '/notes/class11_math_calculus.pdf', 45),
('Electromagnetism and Modern Physics', 'Class 12', 'Physics', 'Comprehensive notes on electricity, magnetism, and quantum physics', '/notes/class12_physics_em.pdf', 52),
('Data Structures and Algorithms', 'BSc Part 1', 'Computer Science', 'Complete notes on arrays, linked lists, trees, and sorting', '/notes/bsc1_cs_dsa.pdf', 68),
('English Literature and Composition', 'ADA Part 1', 'English', 'Notes covering poetry, prose, and essay writing', '/notes/ada1_english_lit.pdf', 38);

-- Insert Sample Rare Books
INSERT INTO rare_books (title, author, publication_year, language, category, description, pages, condition_status) VALUES
('Tareekh-e-Pakistan', 'I. H. Qureshi', 1967, 'Urdu', 'History', 'Comprehensive historical account of Pakistan with original maps', 456, 'Good'),
('Kulliyat-e-Iqbal', 'Allama Muhammad Iqbal', 1945, 'Urdu/Persian', 'Poetry', 'First edition collection of poetry by Pakistan national poet', 892, 'Excellent'),
('Quaid-e-Azam: Speeches and Statements', 'Muhammad Ali Jinnah', 1948, 'English/Urdu', 'Political Science', 'Original compilation of speeches by founder of Pakistan', 324, 'Good');

-- Create Default Admin User (password: admin123)
INSERT INTO users (full_name, email, password_hash, role, status) VALUES
('Admin User', 'admin@gcmn.edu.pk', '$2a$10$rqQZ9J9Z9Z9Z9Z9Z9Z9Z9OqK7qK7qK7qK7qK7qK7qK7qK7qK7qK7q', 'admin', 'active');