#!/bin/bash

# GCMN Library - Automated Installation Script
# Gov. College For Men Nazimabad

echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║           🎓 GCMN Library Installation                    ║"
echo "║           Gov. College For Men Nazimabad                   ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node -v) detected${NC}"
echo ""

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo -e "${YELLOW}⚠️  MySQL not detected. You'll need to install MySQL 8.0+ separately.${NC}"
else
    echo -e "${GREEN}✅ MySQL detected${NC}"
fi
echo ""

# Install Frontend Dependencies
echo -e "${BLUE}📦 Installing frontend dependencies...${NC}"
cd gcmn-library-react
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
else
    echo -e "${RED}❌ Frontend installation failed${NC}"
    exit 1
fi
echo ""

# Install Backend Dependencies
echo -e "${BLUE}📦 Installing backend dependencies...${NC}"
cd ../gcmn-library-backend
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend dependencies installed${NC}"
else
    echo -e "${RED}❌ Backend installation failed${NC}"
    exit 1
fi
echo ""

# Create environment files
echo -e "${BLUE}🔧 Creating environment files...${NC}"

# Frontend .env
cd ../gcmn-library-react
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${GREEN}✅ Frontend .env created${NC}"
else
    echo -e "${YELLOW}⚠️  Frontend .env already exists${NC}"
fi

# Backend .env
cd ../gcmn-library-backend
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${GREEN}✅ Backend .env created${NC}"
else
    echo -e "${YELLOW}⚠️  Backend .env already exists${NC}"
fi
echo ""

# Database setup instructions
echo -e "${BLUE}📊 Database Setup Instructions:${NC}"
echo ""
echo "1. Create database:"
echo "   mysql -u root -p -e 'CREATE DATABASE gcmn_library;'"
echo ""
echo "2. Import schema:"
echo "   mysql -u root -p gcmn_library < database/schema.sql"
echo ""
echo "3. Update backend .env with your database credentials"
echo ""

# Final instructions
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                            ║${NC}"
echo -e "${GREEN}║           ✅ Installation Complete!                        ║${NC}"
echo -e "${GREEN}║                                                            ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}🚀 To start the application:${NC}"
echo ""
echo "Terminal 1 (Frontend):"
echo "  cd gcmn-library-react"
echo "  npm run dev"
echo ""
echo "Terminal 2 (Backend):"
echo "  cd gcmn-library-backend"
echo "  npm run dev"
echo ""
echo -e "${BLUE}📚 Documentation:${NC}"
echo "  - README.md - Complete documentation"
echo "  - QUICK_START_GUIDE.md - Get started quickly"
echo "  - DEPLOYMENT_GUIDE.md - Deploy to production"
echo "  - ENVIRONMENT_VARIABLES.md - Configuration guide"
echo ""
echo -e "${GREEN}🇵🇰 Built with Pride for Pakistani Education 🇵🇰${NC}"
echo ""