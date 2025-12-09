# 🚀 GCMN Library - Quick Start Guide with Admin Setup

## 📋 Prerequisites

- Node.js 18+ and npm
- MySQL 8.0+
- Git (optional)

---

## ⚡ Quick Setup (5 Minutes)

### Step 1: Extract Files

```bash
unzip GCMN-Library-FINAL-COMPLETE.zip
cd GCMN-Library-FINAL-COMPLETE
```

### Step 2: Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Create database and tables
mysql -u root -p < gcmn-library-backend/database/schema.sql
```

### Step 3: Backend Setup

```bash
cd gcmn-library-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your database credentials
nano .env
```

**Update these values in .env**:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=gcmn_library
JWT_SECRET=your_random_secret_key_here
```

### Step 4: Create Admin Account

```bash
# Run admin creation script
npm run create-admin
```

**Default Admin Credentials**:
```
Email: admin@gcmn.edu.pk
Password: Admin@GCMN2025
```

**⚠️ IMPORTANT**: Change these credentials after first login!

### Step 5: Start Backend Server

```bash
npm run dev
```

Backend will run on: `http://localhost:5000`

### Step 6: Frontend Setup

Open a new terminal:

```bash
cd gcmn-library-react

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Update .env**:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Step 7: Start Frontend

```bash
npm run dev
```

Frontend will run on: `http://localhost:5173`

---

## 🎯 Access the Application

### Student Access
1. Go to: `http://localhost:5173`
2. Click "Register" to create a student account
3. Fill in the form with:
   - Full Name
   - Email
   - Password
   - Phone (optional)
   - Roll Number
   - **Program/Group**: Computer Science, Pre-Medical, Pre-Engineering, Humanities, or **Commerce**
   - **Class**: Class 11, Class 12, ADA Part 1/2, BSc Part 1/2

### Admin Access
1. Go to: `http://localhost:5173/login`
2. Login with:
   - **Email**: `admin@gcmn.edu.pk`
   - **Password**: `Admin@GCMN2025`
3. You'll be redirected to Admin Dashboard

---

## 🔐 Admin Panel Features

After logging in as admin, you can:

### 📚 Books Management
- Add new books to the catalog
- Edit book details (title, author, category, copies)
- Delete books
- View all books with search and filters

### 📋 Borrow Requests
- View all pending borrow requests
- Approve or reject requests
- Track issued books
- Manage returns and overdue books

### 👥 User Management
- View all registered students
- Activate/deactivate accounts
- View user borrowing history
- Manage user roles

### 📖 Notes Management
- Upload notes by class and subject
- Organize study materials
- Delete outdated materials
- Track download statistics

### 🏛️ Rare Books Archive
- Add rare books to digital archive
- Upload PDF files (view-only mode)
- Manage rare book metadata
- Track viewing statistics

---

## 🧪 Testing the System

### Test Student Flow:
1. Register as a student
2. Browse books catalog
3. Request to borrow a book
4. Check "My Borrowings" page
5. Download notes by selecting class and subject
6. View rare books archive

### Test Admin Flow:
1. Login as admin
2. Go to Admin Dashboard
3. Add a new book
4. Approve a borrow request
5. Upload study materials
6. View system statistics

---

## 📱 Features to Test

### ✅ All Pages Working:
- [x] Home - Hero with splash screen
- [x] Books - Catalog with search/filters
- [x] Notes - Class/Subject dropdowns with Statistics
- [x] Rare Books - Gallery with cover images
- [x] About - College history (founded 1953)
- [x] Contact - Google Maps embed + Pakistan map
- [x] Login - JWT authentication
- [x] Register - Program/Group with Commerce option
- [x] My Borrowings - Student borrow history
- [x] Admin Dashboard - Full management panel

### ✅ Design Features:
- [x] Pakistan theme (green & white)
- [x] Splash screen animation
- [x] Watermark logo background
- [x] Pakistan map backgrounds
- [x] Responsive mobile design
- [x] Smooth animations
- [x] Facebook link to college page

---

## 🔧 Troubleshooting

### Database Connection Issues
```bash
# Check MySQL is running
sudo systemctl status mysql

# Test connection
mysql -u root -p -e "SHOW DATABASES;"
```

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

### Admin Account Not Working
```bash
cd gcmn-library-backend
npm run create-admin
```

---

## 📞 Support

For issues or questions:
- Email: library@gcmn.edu.pk
- Check documentation files in the package
- Review DEPLOYMENT_GUIDE.md for production setup

---

## 🎓 Next Steps

1. ✅ Test all features locally
2. ✅ Change admin password
3. ✅ Add real book data
4. ✅ Upload actual study materials
5. ✅ Configure production environment
6. ✅ Deploy to Vercel + Railway
7. ✅ Set up domain name
8. ✅ Enable SSL certificate

**Congratulations! Your GCMN Library system is ready to use!** 🎉