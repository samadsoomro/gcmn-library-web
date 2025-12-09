# 🚀 GCMN Library - Complete Deployment Guide

This guide covers deploying both the React frontend and Node.js backend for the GCMN Library Management System.

## 📋 Pre-Deployment Checklist

- [ ] All code tested locally
- [ ] Environment variables configured
- [ ] Database schema applied
- [ ] Admin account created
- [ ] Assets optimized
- [ ] Security review completed

## 🎯 Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend) - **RECOMMENDED**

**Pros**: Free tier, easy setup, automatic deployments, great performance

### Option 2: Netlify (Frontend) + Heroku (Backend)

**Pros**: Popular, reliable, good documentation

### Option 3: DigitalOcean App Platform (Full Stack)

**Pros**: Single platform, managed database, scalable

---

## 🌐 Frontend Deployment (Vercel)

### Step 1: Prepare for Deployment

1. **Build the project locally to test**:
```bash
cd gcmn-library-react
npm run build
npm run preview
```

2. **Update environment variables**:
Create `.env.production`:
```env
VITE_API_BASE_URL=https://your-backend-url.railway.app/api
VITE_APP_NAME=GCMN Library
VITE_GOOGLE_MAPS_API_KEY=your_production_api_key
```

### Step 2: Deploy to Vercel

**Method 1: Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd gcmn-library-react
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? gcmn-library
# - Directory? ./
# - Override settings? No
```

**Method 2: Vercel Dashboard (GitHub Integration)**

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: Vite
   - Root Directory: `gcmn-library-react`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add environment variables
7. Click "Deploy"

### Step 3: Configure Environment Variables in Vercel

1. Go to Project Settings → Environment Variables
2. Add all variables from `.env.production`
3. Redeploy if needed

### Step 4: Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `library.gcmn.edu.pk`)
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

---

## 🔧 Backend Deployment (Railway)

### Step 1: Prepare Backend

1. **Create production environment file**:
```bash
cd gcmn-library-backend
cp .env.example .env.production
```

2. **Update `.env.production`**:
```env
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://your-vercel-app.vercel.app
JWT_SECRET=generate_strong_random_secret_here
JWT_EXPIRES_IN=7d
```

### Step 2: Deploy to Railway

**Method 1: Railway CLI**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
cd gcmn-library-backend
railway init

# Deploy
railway up

# Add environment variables
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=your_secret_key
# ... add all other variables
```

**Method 2: Railway Dashboard (GitHub Integration)**

1. Push backend code to GitHub
2. Go to [railway.app](https://railway.app)
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Railway auto-detects Node.js
7. Add environment variables
8. Deploy

### Step 3: Set Up Database on Railway

1. In Railway project, click "New"
2. Select "Database" → "MySQL"
3. Railway creates database automatically
4. Copy connection details
5. Update backend environment variables:
```env
DB_HOST=containers-us-west-xxx.railway.app
DB_USER=root
DB_PASSWORD=generated_password
DB_NAME=railway
DB_PORT=6379
```

6. **Import database schema**:
```bash
# Connect to Railway MySQL
mysql -h containers-us-west-xxx.railway.app -u root -p railway < database/schema.sql
```

### Step 4: Get Backend URL

Railway provides a public URL like:
`https://gcmn-library-backend-production.up.railway.app`

Update this in your frontend `.env.production`:
```env
VITE_API_BASE_URL=https://gcmn-library-backend-production.up.railway.app/api
```

---

## 🗄️ Database Deployment Options

### Option 1: Railway MySQL (Recommended)

**Pros**: Integrated with backend, automatic backups, easy setup

**Setup**: Included in Railway backend deployment above

### Option 2: PlanetScale

**Pros**: Free tier, serverless, global edge network

**Setup**:
```bash
# Install PlanetScale CLI
brew install planetscale/tap/pscale

# Login
pscale auth login

# Create database
pscale database create gcmn-library --region us-east

# Create branch
pscale branch create gcmn-library main

# Connect
pscale connect gcmn-library main --port 3309

# Import schema
mysql -h 127.0.0.1 -P 3309 -u root < database/schema.sql
```

### Option 3: AWS RDS

**Pros**: Enterprise-grade, highly scalable

**Setup**:
1. Create RDS MySQL instance in AWS Console
2. Configure security groups
3. Get connection endpoint
4. Import schema using MySQL Workbench or CLI

---

## 🔐 Security Configuration

### 1. Generate Strong JWT Secret

```bash
# Generate random secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Use this as your `JWT_SECRET`

### 2. Update Admin Password

After deployment, login as admin and change password immediately:
- Email: `admin@gcmn.edu.pk`
- Default Password: `admin123`

### 3. Configure CORS

Update backend CORS to match your frontend URL:
```javascript
cors({
  origin: 'https://your-vercel-app.vercel.app',
  credentials: true,
})
```

### 4. Enable HTTPS

Both Vercel and Railway provide automatic HTTPS. Ensure:
- All API calls use HTTPS
- No mixed content warnings
- Secure cookies enabled

---

## 📊 Post-Deployment Steps

### 1. Test All Features

- [ ] User registration and login
- [ ] Book browsing and search
- [ ] Borrow request creation
- [ ] Admin dashboard access
- [ ] Notes download
- [ ] Rare books viewing

### 2. Monitor Performance

**Vercel Analytics**:
- Enable in Project Settings
- Monitor page load times
- Track user engagement

**Railway Metrics**:
- Monitor CPU and memory usage
- Check API response times
- Review error logs

### 3. Set Up Monitoring

**Frontend (Vercel)**:
- Enable Vercel Analytics
- Set up error tracking (Sentry)

**Backend (Railway)**:
- Enable Railway logging
- Set up uptime monitoring (UptimeRobot)
- Configure error alerts

### 4. Backup Strategy

**Database Backups**:
```bash
# Automated daily backups (Railway)
# Manual backup command:
mysqldump -h your-db-host -u root -p gcmn_library > backup_$(date +%Y%m%d).sql
```

**Code Backups**:
- GitHub repository (primary)
- Local backups
- Version tags for releases

---

## 🔄 Continuous Deployment

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: cd gcmn-library-react && npm install
      - run: cd gcmn-library-react && npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: bervProject/railway-deploy@main
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: gcmn-library-backend
```

---

## 🐛 Troubleshooting

### Frontend Issues

**Build Fails**:
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

**Environment Variables Not Working**:
- Ensure variables start with `VITE_`
- Restart dev server after changes
- Check Vercel dashboard for production values

### Backend Issues

**Database Connection Fails**:
- Verify database credentials
- Check firewall rules
- Ensure database is running
- Test connection locally first

**CORS Errors**:
- Update CORS origin in backend
- Check frontend API URL
- Verify credentials: true in CORS config

**JWT Errors**:
- Ensure JWT_SECRET matches between environments
- Check token expiration settings
- Verify Authorization header format

---

## 📈 Scaling Considerations

### When to Scale

- **Frontend**: Vercel auto-scales
- **Backend**: Monitor Railway metrics
  - CPU > 80% consistently
  - Memory > 80% consistently
  - Response time > 1 second

### Scaling Options

**Railway**:
- Upgrade to Pro plan
- Increase resources
- Add replicas

**Database**:
- Enable read replicas
- Implement caching (Redis)
- Optimize queries

---

## 💰 Cost Estimates

### Free Tier (Suitable for College)

**Vercel**:
- ✅ Free for personal/education
- 100GB bandwidth/month
- Unlimited deployments

**Railway**:
- ✅ $5 free credit/month
- Pay-as-you-go after
- ~$5-10/month for small app

**Total**: ~$0-10/month

### Paid Tier (For Growth)

**Vercel Pro**: $20/month
**Railway Pro**: $20/month
**Database**: $15/month

**Total**: ~$55/month

---

## 📞 Support & Resources

### Documentation
- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [React Router](https://reactrouter.com)
- [Framer Motion](https://www.framer.com/motion)

### Community
- GitHub Issues
- Discord/Slack channels
- Stack Overflow

### Contact
- Email: library@gcmn.edu.pk
- Website: [Your college website]

---

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] Code reviewed and tested
- [ ] Environment variables configured
- [ ] Database schema applied
- [ ] Security audit completed
- [ ] Performance optimized

### Deployment
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Railway
- [ ] Database set up and connected
- [ ] Environment variables added
- [ ] Custom domain configured (optional)

### Post-Deployment
- [ ] All features tested in production
- [ ] Admin password changed
- [ ] Monitoring enabled
- [ ] Backup strategy implemented
- [ ] Documentation updated

---

**🎉 Congratulations! Your GCMN Library is now live!**

🇵🇰 **Serving Pakistani Education with Pride** 🇵🇰