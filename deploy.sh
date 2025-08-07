#!/bin/bash

# 🚀 Income Generator Hub - Render Deployment Script
# This script helps you deploy your site to Render

echo "🚀 Income Generator Hub - Render Deployment"
echo "=========================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit - Income Generator Hub"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if remote is set
if ! git remote get-url origin > /dev/null 2>&1; then
    echo ""
    echo "🔗 Please set up your GitHub repository:"
    echo "1. Create a new repository on GitHub"
    echo "2. Run these commands:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/income-generator-hub.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    echo "📋 Then deploy to Render:"
    echo "1. Go to https://render.com"
    echo "2. Sign up with GitHub"
    echo "3. Click 'New +' → 'Static Site'"
    echo "4. Connect your GitHub repository"
    echo "5. Configure:"
    echo "   - Name: income-generator-hub"
    echo "   - Build Command: echo 'Static site - no build required'"
    echo "   - Publish Directory: ."
    echo ""
else
    echo "✅ Remote repository is configured"
    echo "🔄 Pushing to GitHub..."
    git add .
    git commit -m "Update - $(date)"
    git push origin main
    echo "✅ Code pushed to GitHub"
    echo ""
    echo "🎯 Your site will auto-deploy on Render!"
fi

echo ""
echo "📋 Deployment Checklist:"
echo "✅ [ ] Create GitHub repository"
echo "✅ [ ] Push code to GitHub"
echo "✅ [ ] Create Render account"
echo "✅ [ ] Deploy static site on Render"
echo "✅ [ ] Configure custom domain (optional)"
echo "✅ [ ] Set up Google Analytics"
echo "✅ [ ] Configure AdSense codes"
echo "✅ [ ] Test all features"
echo ""
echo "🌐 Your site will be live at: https://your-site-name.onrender.com"
echo ""
echo "💰 Start earning money from day one!" 