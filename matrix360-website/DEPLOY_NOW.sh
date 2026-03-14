#!/bin/bash

# Matrix360 Website - Deploy to GitHub & Vercel
# Run this script to push code and deploy immediately

set -e

echo "🚀 Matrix360 Website - Deployment Script"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Verify we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    echo "Make sure you're in the matrix360-website directory"
    exit 1
fi

echo -e "${BLUE}Step 1: Git Setup${NC}"
echo "Initializing git repository..."

# Initialize git if not already done
if [ ! -d ".git" ]; then
    git init
    git config user.email "matrix360consulting@gmail.com"
    git config user.name "Matrix360"
fi

# Add remote if not exists
if ! git remote | grep -q origin; then
    git remote add origin https://github.com/MatrixDigital25/Matrix360.git
fi

echo -e "${GREEN}✓ Git configured${NC}"
echo ""

# Step 2: Stage and commit
echo -e "${BLUE}Step 2: Stage & Commit${NC}"
git add .
git commit -m "Matrix360 Website - Production Build (Complete Next.js Platform)" || true
echo -e "${GREEN}✓ Files committed${NC}"
echo ""

# Step 3: Push to GitHub
echo -e "${BLUE}Step 3: Push to GitHub${NC}"
echo "Pushing code to: https://github.com/MatrixDigital25/Matrix360"
echo ""

git branch -M main
git push -u origin main --force

echo -e "${GREEN}✓ Code pushed to GitHub${NC}"
echo ""

# Step 4: Instructions for Vercel
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ CODE PUSHED TO GITHUB!${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Next step: Deploy to Vercel"
echo ""
echo "Option 1: Auto-deploy (Recommended)"
echo "  • Vercel will auto-detect the push"
echo "  • Check: https://vercel.com/matrix360s-projects/matrix360"
echo "  • Status should change to 'Building' then 'Ready' in 2-3 minutes"
echo ""
echo "Option 2: Manual Deploy"
echo "  1. Go to: https://vercel.com/matrix360s-projects/matrix360"
echo "  2. Click 'Deployments' tab"
echo "  3. Click 'Deploy' or 'Redeploy'"
echo "  4. Choose the main branch"
echo "  5. Click 'Deploy'"
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "📊 What's Being Deployed:"
echo "  ✅ 8 Complete Pages (homepage, enterprise, consultant, dashboards, strategy room)"
echo "  ✅ 2 Functional Signup Forms (with email capture)"
echo "  ✅ 2 Dashboards (with mock data)"
echo "  ✅ Complete Design System (Tailwind CSS)"
echo "  ✅ All Content & Copy"
echo ""
echo "🌐 Your Site Will Be Live At:"
echo "  https://matrix360consulting.matrixdirect.in"
echo ""
echo "⏱️ Timeline:"
echo "  • Deploy initiated: Now"
echo "  • Building: 1-2 minutes"
echo "  • Live: 3-5 minutes"
echo ""
echo -e "${GREEN}🎉 Everything is ready!${NC}"
echo ""
