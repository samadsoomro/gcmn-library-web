# 🔧 GCMN Library Backend API

Backend API for Gov. College For Men Nazimabad Library Management System.

## 🚀 Quick Start

### Installation

```bash
cd gcmn-library-backend
npm install
```

### Environment Setup

Create `.env` file:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=gcmn_library
DB_PORT=3306

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

CORS_ORIGIN=http://localhost:5173
```

### Database Setup

1. **Create database and tables**:
```bash
mysql -u root -p < database/schema.sql
```

2. **Verify database**:
```bash
mysql -u root -p gcmn_library -e "SHOW TABLES;"
```

### Run Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "full_name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+92 300 1234567",
  "roll_number": "2024-CS-001",
  "department": "Computer Science",
  "semester": "1st"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Verify Token
```http
GET /api/auth/verify
Authorization: Bearer <token>
```

### Books

#### Get All Books
```http
GET /api/books?page=1&limit=12&search=algorithm&category=Computer Science
```

#### Get Single Book
```http
GET /api/books/:id
```

#### Create Book (Admin)
```http
POST /api/books
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "isbn": "978-0-13-468599-1",
  "title": "Introduction to Algorithms",
  "author": "Thomas H. Cormen",
  "category": "Computer Science",
  "total_copies": 5
}
```

#### Update Book (Admin)
```http
PUT /api/books/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "available_copies": 3,
  "status": "available"
}
```

#### Delete Book (Admin)
```http
DELETE /api/books/:id
Authorization: Bearer <admin_token>
```

### Borrow Requests

#### Create Borrow Request
```http
POST /api/borrows
Authorization: Bearer <token>
Content-Type: application/json

{
  "book_id": 1
}
```

#### Get User's Borrows
```http
GET /api/borrows/user
Authorization: Bearer <token>
```

#### Get All Borrows (Admin)
```http
GET /api/borrows?status=pending&page=1&limit=20
Authorization: Bearer <admin_token>
```

#### Update Borrow Status (Admin)
```http
PUT /api/borrows/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "approved",
  "issue_date": "2025-12-08",
  "due_date": "2025-12-22",
  "admin_notes": "Approved for borrowing"
}
```

### Notes

#### Get All Notes
```http
GET /api/notes?subject=Mathematics&semester=1st
```

#### Create Note (Admin)
```http
POST /api/notes
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Calculus Chapter 1 Notes",
  "subject": "Mathematics",
  "semester": "1st",
  "description": "Introduction to limits and derivatives",
  "file_path": "/uploads/notes/calculus-ch1.pdf",
  "file_type": "application/pdf"
}
```

#### Delete Note (Admin)
```http
DELETE /api/notes/:id
Authorization: Bearer <admin_token>
```

## 🔒 Security

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **CORS**: Configured for frontend origin
- **Input Validation**: express-validator
- **SQL Injection Prevention**: Parameterized queries

## 📊 Database Schema

### Tables
- **users** - Student and admin accounts
- **books** - Book inventory
- **borrow_records** - Borrowing history
- **notes** - Study materials
- **rare_books** - Digital archive

## 🚀 Deployment

### Deploy to Railway

```bash
railway login
railway init
railway up
```

Add environment variables in Railway dashboard.

### Deploy to Heroku

```bash
heroku create gcmn-library-api
git push heroku main
heroku config:set JWT_SECRET=your_secret
```

## 📝 Default Credentials

**Admin Account**:
- Email: `admin@gcmn.edu.pk`
- Password: `admin123`

⚠️ **Change this password immediately in production!**

## 🧪 Testing

Use tools like Postman or Thunder Client to test API endpoints.

## 📞 Support

For issues, contact: library@gcmn.edu.pk