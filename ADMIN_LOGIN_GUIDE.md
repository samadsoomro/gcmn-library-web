# 🔐 GCMN Library - Admin Login Guide

## 📍 How to Access Admin Panel

### Step 1: Go to Login Page

**Option 1**: Click "Login" button in the top-right menu  
**Option 2**: Navigate directly to: `http://localhost:5173/login`

### Step 2: Enter Admin Credentials

```
Email: admin@gcmn.edu.pk
Password: Admin@GCMN2025
```

### Step 3: Automatic Redirect

After successful login, you will be **automatically redirected** to:
- **Admin Dashboard**: `/admin` route

---

## 🎯 Admin vs Student Login

### Same Login Page, Different Experience

**Students**:
- Login → Redirected to **Home page**
- Can browse books, notes, rare books
- Can request to borrow books
- Can view "My Borrowings"

**Admin**:
- Login → Redirected to **Admin Dashboard**
- See "Admin" link in top menu (after login)
- Full management capabilities
- Can approve/reject borrow requests

---

## 🔍 Admin Menu Visibility

### Before Login:
```
Home | Books | Notes | Rare Books | About | Contact | [Login] [Register]
```

### After Admin Login:
```
Home | Books | Notes | Rare Books | About | Contact | Admin | [User Menu ▼]
                                                        ↑
                                                   NEW LINK!
```

The **"Admin"** link only appears when logged in as admin.

---

## 🛠️ Admin Dashboard Features

Once logged in as admin, you can:

### 1. **Dashboard Overview**
- View total books, users, active borrows
- See recent activities
- Quick statistics

### 2. **Books Management**
- ➕ Add new books
- ✏️ Edit book details
- 🗑️ Delete books
- 📊 View book statistics

### 3. **Borrow Requests**
- 📋 View all borrow requests
- ✅ Approve requests
- ❌ Reject requests
- 📅 Track due dates
- 💰 Calculate fines

### 4. **User Management**
- 👥 View all registered students
- 🔒 Suspend/activate accounts
- 📊 View user statistics

### 5. **Notes Management**
- 📤 Upload study materials
- 🗂️ Organize by class and subject
- 🗑️ Delete outdated materials

### 6. **Rare Books Management**
- 📚 Add rare book entries
- 🖼️ Upload cover images
- 📄 Upload PDF files
- 🔒 Set view-only permissions

---

## 🔄 Login Flow Diagram

```
User visits website
       ↓
Clicks "Login" button
       ↓
Enters credentials
       ↓
System checks role
       ↓
   ┌───┴───┐
   ↓       ↓
Student  Admin
   ↓       ↓
Home    Admin Dashboard
Page    (/admin route)
```

---

## 🚨 Important Security Notes

1. **Change Default Password**
   - After first login, go to Admin Dashboard → Settings
   - Change password immediately
   - Use strong password (min 8 characters, mix of letters/numbers/symbols)

2. **Protect Admin Credentials**
   - Never share admin password
   - Don't write it down in plain text
   - Use password manager if needed

3. **Regular Security Checks**
   - Review user accounts regularly
   - Monitor borrow activities
   - Check for suspicious activities

---

## 🆘 Troubleshooting

### Can't Login as Admin?

**Check 1**: Verify admin account exists in database
```sql
SELECT * FROM users WHERE role = 'admin';
```

**Check 2**: Run admin creation script
```bash
cd gcmn-library-backend
npm run create-admin
```

**Check 3**: Verify credentials are correct
- Email: `admin@gcmn.edu.pk`
- Password: `Admin@GCMN2025`

### Admin Link Not Showing?

**Reason**: The "Admin" link only appears AFTER successful admin login.

**Solution**: 
1. Make sure you're logged in
2. Check that your account has `role = 'admin'` in database
3. Refresh the page after login

### Redirected to Home Instead of Admin Dashboard?

**Reason**: Your account might not have admin role.

**Solution**: Check database:
```sql
UPDATE users SET role = 'admin' WHERE email = 'admin@gcmn.edu.pk';
```

---

## 📞 Need Help?

If you encounter any issues:
1. Check the `QUICK_START_WITH_ADMIN.md` guide
2. Review the `ADMIN_CREDENTIALS.md` file
3. Verify database connection in backend `.env` file
4. Check backend server is running on port 5000

---

## ✅ Quick Test Checklist

- [ ] Admin account created in database
- [ ] Backend server running (port 5000)
- [ ] Frontend running (port 5173)
- [ ] Can access login page
- [ ] Can login with admin credentials
- [ ] Redirected to `/admin` route
- [ ] "Admin" link visible in menu
- [ ] Can access admin dashboard features

---

**Last Updated**: December 8, 2025  
**Version**: 1.0.0