# GCMN Library - Complete Deployment Guide

Your project has been successfully prepared for deployment! It's a full-stack application with:
- **Frontend**: React + Vite (built and ready)
- **Backend**: Express.js + MySQL API server
- **Database**: MySQL

## Quick Summary

| Component | Platform | Setup Time |
|-----------|----------|-----------|
| Frontend (React) | Vercel | ~5 minutes |
| Backend (Node.js) | Railway | ~10 minutes |
| Database | Railway MySQL | ~2 minutes |

---

## 🌐 STEP 1: Deploy Frontend to Vercel

### Prerequisites
- GitHub account
- Vercel account (sign up free at vercel.com)

### Instructions

1. **Push your project to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - GCMN Library"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/gcmn-library.git
   git push -u origin main
   ```

2. **Go to Vercel Dashboard**:
   - Visit https://vercel.com/dashboard
   - Click "Add New..." → "Project"

3. **Import Repository**:
   - Select your GitHub repository
   - Click "Import"

4. **Configure Project Settings**:
   - **Root Directory**: `gcmn-library-react`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Add Environment Variables**:
   Click "Environment Variables" and add:
   ```
   VITE_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
   VITE_SUPABASE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw
   VITE_API_BASE_URL=https://your-railway-backend-url/api
   ```

6. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete (usually 2-3 minutes)
   - Your live frontend URL will appear!

---

## 🗄️ STEP 2: Set Up Database on Railway

### Prerequisites
- Railway account (sign up free at railway.app)

### Instructions

1. **Create a MySQL Database**:
   - Go to https://railway.app/dashboard
   - Click "New Project"
   - Select "MySQL"
   - Click "Deploy"

2. **Configure the Database**:
   - Go to "Connect" tab
   - Copy the MySQL connection string
   - Save your MySQL credentials (you'll need them in the next step)

3. **Initialize Database Schema**:
   - Download and install MySQL Workbench or use `mysql` CLI
   - Connect using the credentials from Railway
   - Run the database initialization scripts from your project

---

## 🚀 STEP 3: Deploy Backend to Railway

### Prerequisites
- Backend ready in `gcmn-library-backend` folder
- MySQL database set up on Railway

### Instructions

1. **Create New Railway Project**:
   - Go to https://railway.app/dashboard
   - Click "New Project"
   - Select "Deploy from GitHub repo"

2. **Connect Your Repository**:
   - Select your GitHub repository
   - Choose `gcmn-library-backend` as the root directory

3. **Configure Environment Variables**:
   Click "Variables" and add:
   ```
   NODE_ENV=production
   PORT=5000

   DB_HOST=your-railway-mysql-host
   DB_USER=root
   DB_PASSWORD=your-mysql-password
   DB_NAME=gcmn_library
   DB_PORT=3306

   JWT_SECRET=generate-a-strong-random-secret-here
   JWT_EXPIRES_IN=7d

   CORS_ORIGIN=https://your-vercel-frontend-url.vercel.app
   ```

   **⚠️ IMPORTANT**: Replace placeholders with your actual values!

4. **Deploy**:
   - Click "Deploy"
   - Railway will automatically deploy your backend
   - Copy the generated backend URL (you'll need this for Vercel)

---

## 🔄 STEP 4: Update Frontend Backend URL

1. **Go back to Vercel Dashboard**:
   - Select your frontend project
   - Go to "Settings" → "Environment Variables"

2. **Update `VITE_API_BASE_URL`**:
   - Replace with your Railway backend URL
   - Example: `https://gcmn-library-backend-production.railway.app/api`

3. **Trigger Redeploy**:
   - Go to "Deployments" tab
   - Click the three dots on the latest deployment
   - Select "Redeploy"

---

## ✅ Verification Checklist

After deployment, verify everything works:

- [ ] Frontend loads at Vercel URL
- [ ] Navigation between pages works
- [ ] API calls reach the backend
- [ ] Database connections work
- [ ] Admin login works
- [ ] Library data displays correctly
- [ ] File uploads work (if applicable)
- [ ] Images load properly

---

## 📊 Your Project Details

### Frontend Build Status
✅ Successfully built with Vite
- HTML: 2.16 kB (gzipped: 0.81 kB)
- CSS: 45.83 kB (gzipped: 7.89 kB)
- JavaScript: 448.63 kB (gzipped: 143.43 kB)

### Backend
- Framework: Express.js
- Language: Node.js (ES modules)
- Entry Point: `src/server.js`

### Database
- Type: MySQL
- Schema: Already designed
- Required tables configured

---

## 🆘 Troubleshooting

### Frontend won't load
- Check Vercel build logs
- Ensure all environment variables are set
- Verify backend URL is correct

### Backend API errors
- Check Railway logs
- Verify MySQL connection string
- Ensure database is initialized
- Check CORS configuration

### Database connection fails
- Verify credentials in Railway console
- Check network access (Railway allows all by default)
- Ensure database is created

### CORS errors
- Update `CORS_ORIGIN` in backend env variables
- Rebuild and redeploy backend
- Clear browser cache

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Express.js Docs**: https://expressjs.com
- **React Docs**: https://react.dev

---

**Ready to deploy?** Start with Step 1 and follow each section in order!
