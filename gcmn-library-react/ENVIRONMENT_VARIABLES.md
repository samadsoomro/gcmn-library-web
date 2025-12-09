# 🔐 Environment Variables Documentation

Complete guide to configuring environment variables for GCMN Library Management System.

## 📁 Frontend Environment Variables

### Development (`.env`)

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=GCMN Library
VITE_APP_DESCRIPTION=Gov. College For Men Nazimabad Library Management System

# Google Maps API (Optional)
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### Production (`.env.production`)

```env
# API Configuration
VITE_API_BASE_URL=https://your-backend-url.railway.app/api
VITE_APP_NAME=GCMN Library
VITE_APP_DESCRIPTION=Gov. College For Men Nazimabad Library Management System

# Google Maps API
VITE_GOOGLE_MAPS_API_KEY=your_production_google_maps_api_key
```

### Variable Descriptions

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_API_BASE_URL` | ✅ Yes | Backend API base URL | `http://localhost:5000/api` |
| `VITE_APP_NAME` | ❌ No | Application name | `GCMN Library` |
| `VITE_APP_DESCRIPTION` | ❌ No | App description for SEO | `Library Management System` |
| `VITE_GOOGLE_MAPS_API_KEY` | ❌ No | Google Maps API key for location | `AIzaSyXXXXXXXXXXXXXX` |

### How to Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable "Maps JavaScript API"
4. Create credentials → API Key
5. Restrict key to your domain
6. Copy key to environment variable

---

## 🔧 Backend Environment Variables

### Development (`.env`)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_local_database_password
DB_NAME=gcmn_library
DB_PORT=3306

# JWT Configuration
JWT_SECRET=dev_secret_key_change_in_production_min_32_chars
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads
```

### Production (`.env.production`)

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database Configuration (Railway/PlanetScale)
DB_HOST=containers-us-west-xxx.railway.app
DB_USER=root
DB_PASSWORD=generated_secure_password_from_railway
DB_NAME=railway
DB_PORT=6379

# JWT Configuration
JWT_SECRET=production_secret_key_min_64_chars_random_generated
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=https://your-vercel-app.vercel.app

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads
```

### Variable Descriptions

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `PORT` | ✅ Yes | Server port | `5000` |
| `NODE_ENV` | ✅ Yes | Environment mode | `production` |
| `DB_HOST` | ✅ Yes | Database host | `localhost` |
| `DB_USER` | ✅ Yes | Database username | `root` |
| `DB_PASSWORD` | ✅ Yes | Database password | `secure_password` |
| `DB_NAME` | ✅ Yes | Database name | `gcmn_library` |
| `DB_PORT` | ✅ Yes | Database port | `3306` |
| `JWT_SECRET` | ✅ Yes | JWT signing secret (min 32 chars) | `random_64_char_string` |
| `JWT_EXPIRES_IN` | ❌ No | Token expiration | `7d` (7 days) |
| `CORS_ORIGIN` | ✅ Yes | Allowed frontend origin | `https://app.vercel.app` |
| `MAX_FILE_SIZE` | ❌ No | Max upload size (bytes) | `10485760` (10MB) |
| `UPLOAD_DIR` | ❌ No | Upload directory | `./uploads` |

---

## 🔑 Generating Secure Secrets

### JWT Secret (Recommended: 64 characters)

**Method 1: Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Method 2: OpenSSL**
```bash
openssl rand -hex 64
```

**Method 3: Online Generator**
- Use [randomkeygen.com](https://randomkeygen.com)
- Select "CodeIgniter Encryption Keys"

### Admin Password Hash

**Generate bcrypt hash**:
```javascript
const bcrypt = require('bcryptjs');
const password = 'your_secure_password';
const hash = bcrypt.hashSync(password, 10);
console.log(hash);
```

---

## 🌍 Platform-Specific Configuration

### Vercel Environment Variables

**Add via Dashboard**:
1. Project Settings → Environment Variables
2. Add each variable
3. Select environments (Production, Preview, Development)
4. Save

**Add via CLI**:
```bash
vercel env add VITE_API_BASE_URL production
# Enter value when prompted
```

### Railway Environment Variables

**Add via Dashboard**:
1. Project → Variables
2. Click "New Variable"
3. Enter key and value
4. Save (auto-redeploys)

**Add via CLI**:
```bash
railway variables set JWT_SECRET=your_secret_key
railway variables set DB_PASSWORD=your_db_password
```

### Heroku Environment Variables

**Add via CLI**:
```bash
heroku config:set JWT_SECRET=your_secret_key
heroku config:set DB_HOST=your_db_host
```

**Add via Dashboard**:
1. App Settings → Config Vars
2. Click "Reveal Config Vars"
3. Add key-value pairs

---

## ⚠️ Security Best Practices

### DO's ✅

- ✅ Use strong, random secrets (min 32 chars for JWT)
- ✅ Different secrets for dev/staging/production
- ✅ Store secrets in platform environment variables
- ✅ Rotate secrets periodically (every 90 days)
- ✅ Use `.env.example` for documentation
- ✅ Add `.env` to `.gitignore`

### DON'Ts ❌

- ❌ Never commit `.env` files to Git
- ❌ Never share secrets in public channels
- ❌ Never use weak or default secrets in production
- ❌ Never hardcode secrets in source code
- ❌ Never reuse secrets across projects

---

## 🔍 Verifying Configuration

### Frontend

```bash
# Check if variables are loaded
cd gcmn-library-react
npm run dev

# In browser console:
console.log(import.meta.env.VITE_API_BASE_URL)
```

### Backend

```bash
# Check if variables are loaded
cd gcmn-library-backend
npm run dev

# Server should log:
# ✅ Database connected successfully
# Server running on: http://localhost:5000
```

---

## 🆘 Troubleshooting

### "Environment variable not found"

**Solution**:
1. Ensure variable starts with `VITE_` (frontend only)
2. Restart dev server after adding variables
3. Check spelling and case sensitivity

### "Database connection failed"

**Solution**:
1. Verify database credentials
2. Check if database is running
3. Test connection with MySQL client
4. Verify firewall rules

### "CORS error"

**Solution**:
1. Update `CORS_ORIGIN` in backend
2. Ensure frontend URL matches exactly
3. Include protocol (https://)
4. No trailing slash

### "JWT token invalid"

**Solution**:
1. Ensure `JWT_SECRET` matches in all environments
2. Check token expiration settings
3. Clear browser localStorage
4. Generate new token

---

## 📝 Environment Variables Checklist

### Before Deployment

- [ ] All required variables defined
- [ ] Secrets generated securely
- [ ] `.env.example` updated
- [ ] `.env` added to `.gitignore`
- [ ] Production values different from development

### After Deployment

- [ ] Variables added to hosting platform
- [ ] Application tested with production variables
- [ ] Database connection verified
- [ ] API endpoints responding correctly
- [ ] CORS configured properly

---

## 📞 Need Help?

If you encounter issues with environment variables:

1. Check this documentation
2. Review platform-specific docs (Vercel/Railway)
3. Test locally first
4. Contact: library@gcmn.edu.pk

---

**🔐 Remember: Keep your secrets secret!**