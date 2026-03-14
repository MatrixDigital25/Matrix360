#!/bin/bash

# Matrix360 Website - Push to GitHub
# Run this script from the project root directory

echo "🚀 Pushing Matrix360 Production Website to GitHub..."

# Set up remote
git remote add origin https://github.com/MatrixDigital25/Matrix360.git 2>/dev/null || git remote set-url origin https://github.com/MatrixDigital25/Matrix360.git

# Switch to main branch
git branch -M main

# Push with force (overrides existing content)
echo "Pushing to main branch..."
git push -u origin main --force

echo "✅ Done! Code is now live on GitHub."
echo "Vercel will auto-deploy from GitHub within 2-3 minutes."
