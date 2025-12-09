# 🎓 GCMN Library - Digital Library Management System

**Gov. College For Men Nazimabad Library**

A modern, full-stack library management system built with React.js, featuring Pakistan-themed design, book borrowing, notes repository, and rare books archive.

![GCMN Library](./src/assets/images/college-logo.png)

## 🌟 Features

### 📚 Core Features
- **Book Borrowing System** - Browse, search, and borrow books with availability tracking
- **Notes & Syllabus** - Access and download study materials organized by subjects
- **Rare Books Archive** - Secure PDF viewer for rare collections (view-only, no download)
- **User Authentication** - JWT-based login system with student and admin roles
- **Admin Dashboard** - Comprehensive management panel for librarians

### 🎨 Design Features
- **Pakistan-Themed Design** - Green and white color scheme inspired by Pakistan's flag
- **Splash Screen Animation** - Beautiful opening animation with books and logo
- **Responsive Design** - Mobile-first approach, works on all devices
- **Modern UI/UX** - Clean, professional interface with smooth animations
- **Framer Motion** - Page transitions and micro-interactions
- **Pakistan Map Background** - Subtle patriotic design elements

### 🔐 Security Features
- JWT authentication with secure token storage
- Protected routes for authenticated users
- Admin-only access control
- Secure PDF viewing (no download for rare books)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MySQL 8.0+
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd gcmn-library-react
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=GCMN Library
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. **Run development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
gcmn-library-react/
├── src/
│   ├── api/                    # API integration
│   ├── assets/                 # Images, icons, fonts
│   │   ├── images/            # College logo, backgrounds
│   │   └── icons/             # Pakistan map SVG, custom icons
│   ├── components/            # React components
│   │   ├── layout/           # Header, Footer, Hero
│   │   ├── books/            # Book-related components
│   │   ├── notes/            # Notes components
│   │   ├── admin/            # Admin dashboard components
│   │   ├── auth/             # Login, Register
│   │   └── common/           # Shared components (SplashScreen)
│   ├── contexts/             # React Context (AuthContext)
│   ├── pages/                # Page components
│   │   ├── Home.jsx
│   │   ├── Books.jsx
│   │   ├── Notes.jsx
│   │   ├── RareBooks.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── MyBorrowings.jsx
│   │   └── AdminDashboard.jsx
│   ├── utils/                # Utility functions, constants
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles (Pakistan theme)
├── public/                    # Static assets
├── .env.example              # Environment variables template
├── package.json              # Dependencies
├── vite.config.js            # Vite configuration
└── README.md                 # This file
```

## 🎨 Design System

### Color Palette (Pakistan Theme)
```css
--pakistan-green: #01411C       /* Dark green */
--pakistan-green-light: #0A6638 /* Primary green */
--pakistan-white: #FFFFFF       /* White */
--accent-gold: #D4AF37          /* Gold accent */
--accent-emerald: #50C878       /* Emerald accent */
```

### Typography
- **Headings**: Poppins (600-800 weight)
- **Body**: Inter (400-500 weight)
- **Responsive**: clamp() for fluid typography

### Components
- Buttons with hover animations
- Cards with shadow effects
- Forms with validation styling
- Loading skeletons
- Badges for status indicators

## 🔧 Backend Setup

### Database Schema

The project includes a MySQL database schema in `/database/schema.sql` with tables for:
- Users (students and admins)
- Books (inventory management)
- Borrow Records (borrowing history)
- Notes (study materials)
- Rare Books (digital archive)

### Backend API Structure

Create a separate backend folder:

```bash
mkdir gcmn-library-backend
cd gcmn-library-backend
npm init -y
npm install express mysql2 bcryptjs jsonwebtoken cors dotenv multer
```

**Backend Environment Variables** (`.env`):
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=gcmn_library
JWT_SECRET=your_jwt_secret_key
```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

#### Books
- `GET /api/books` - Get all books (with pagination, search, filters)
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Add new book (admin only)
- `PUT /api/books/:id` - Update book (admin only)
- `DELETE /api/books/:id` - Delete book (admin only)

#### Borrow Requests
- `GET /api/borrows` - Get all borrow requests (admin)
- `GET /api/borrows/user/:userId` - Get user's borrowings
- `POST /api/borrows` - Create borrow request
- `PUT /api/borrows/:id` - Update borrow status (admin)

#### Notes
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Upload note (admin only)
- `DELETE /api/notes/:id` - Delete note (admin only)

## 📱 Responsive Breakpoints

```css
/* Mobile: < 768px */
/* Tablet: 768px - 1024px */
/* Desktop: > 1024px */
```

## 🚀 Deployment

### Deploy to Vercel (Frontend)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
cd gcmn-library-react
vercel
```

3. **Configure Environment Variables**
- Go to Vercel Dashboard → Project Settings → Environment Variables
- Add all variables from `.env.example`

4. **Custom Domain** (Optional)
- Add your custom domain in Vercel Dashboard

### Deploy Backend (Node.js/Express)

**Option 1: Heroku**
```bash
heroku create gcmn-library-api
git push heroku main
heroku config:set JWT_SECRET=your_secret
```

**Option 2: Railway**
```bash
railway login
railway init
railway up
```

**Option 3: DigitalOcean App Platform**
- Connect GitHub repository
- Configure environment variables
- Deploy

### Database Hosting

**Option 1: PlanetScale** (MySQL)
- Free tier available
- Automatic backups
- Global edge network

**Option 2: AWS RDS**
- Managed MySQL service
- Scalable and reliable

**Option 3: DigitalOcean Managed Database**
- Easy setup
- Automatic backups

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use different secrets for production
   - Rotate JWT secrets regularly

2. **Authentication**
   - Passwords hashed with bcrypt
   - JWT tokens with expiration
   - Secure HTTP-only cookies (recommended)

3. **API Security**
   - CORS configuration
   - Rate limiting
   - Input validation
   - SQL injection prevention

4. **File Uploads**
   - File type validation
   - Size limits
   - Virus scanning (recommended)

## 📊 Performance Optimization

- **Code Splitting**: React.lazy() for route-based splitting
- **Image Optimization**: WebP format, lazy loading
- **Caching**: Service workers, API response caching
- **Minification**: Vite automatically minifies production builds
- **CDN**: Use CDN for static assets

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

**Gov. College For Men Nazimabad**
- Library Management Team
- IT Department

## 📞 Support

For support, email library@gcmn.edu.pk or visit our contact page.

## 🙏 Acknowledgments

- React.js team for the amazing framework
- Framer Motion for smooth animations
- Lucide React for beautiful icons
- Vite for blazing fast development

---

**Built with ❤️ for GCMN Library**

🇵🇰 **Proud to be Pakistani** 🇵🇰