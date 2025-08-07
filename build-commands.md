# 🚀 Build & Run Commands for Render Deployment

## 📋 Quick Reference

### Build Commands
```bash
# For Render deployment
echo "Building Income Generator Hub..."
echo "Static site - no build required"
echo "All files ready for deployment"
```

### Run Commands
```bash
# Local development
npm start

# Production (Render handles this automatically)
# No run command needed - static site
```

## 🔧 Environment Variables

### Required Environment Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `NODE_ENV` | `production` | Environment mode |
| `GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Google Analytics ID |
| `ADSENSE_PUBLISHER_ID` | `ca-pub-XXXXXXXXXX` | AdSense Publisher ID |
| `STRIPE_PUBLISHABLE_KEY` | `pk_test_XXXXXXXXXX` | Stripe public key |
| `SITE_URL` | `https://your-site.onrender.com` | Your site URL |

### Optional Environment Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `MEDIA_NET_CUSTOMER_ID` | `XXXXXXXX` | Media.net customer ID |
| `PROPELLER_ADS_ZONE_ID` | `XXXXXXX` | PropellerAds zone ID |
| `MAILCHIMP_API_KEY` | `xxxxxxxxxxxxxxxxxx` | Mailchimp API key |
| `MAILCHIMP_LIST_ID` | `xxxxxxxxxx` | Mailchimp list ID |

## 🎯 Render Dashboard Configuration

### Step 1: Create New Static Site
1. Go to [render.com](https://render.com)
2. Click "New +" → "Static Site"
3. Connect your GitHub repository

### Step 2: Configure Build Settings

**Build Command:**
```bash
echo "Building Income Generator Hub..."
echo "Static site - no build required"
echo "All files ready for deployment"
```

**Publish Directory:**
```
.
```

**Environment:**
```
Static Site
```

### Step 3: Add Environment Variables

In Render dashboard, add these environment variables:

#### Production Environment Variables
```bash
NODE_ENV=production
GA_MEASUREMENT_ID=G-XXXXXXXXXX
ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXX
STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXX
SITE_URL=https://your-site-name.onrender.com
```

#### Optional Environment Variables
```bash
MEDIA_NET_CUSTOMER_ID=XXXXXXXX
PROPELLER_ADS_ZONE_ID=XXXXXXX
MAILCHIMP_API_KEY=xxxxxxxxxxxxxxxxxx
MAILCHIMP_LIST_ID=xxxxxxxxxx
```

## 🔄 Deployment Commands

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production (optional)
npm run build
```

### Render Deployment
```bash
# Push to GitHub (triggers automatic deployment)
git add .
git commit -m "Update site"
git push origin main
```

### Manual Deployment Commands
```bash
# If you need to manually trigger deployment
git push origin main

# Or force push if needed
git push origin main --force
```

## 📊 Environment Variable Setup Guide

### 1. Google Analytics Setup
```bash
# Get your GA Measurement ID from Google Analytics
# Format: G-XXXXXXXXXX
GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 2. Google AdSense Setup
```bash
# Get your AdSense Publisher ID from AdSense dashboard
# Format: ca-pub-XXXXXXXXXX
ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXX
```

### 3. Stripe Setup
```bash
# Get your Stripe publishable key from Stripe dashboard
# Format: pk_test_XXXXXXXXXXXXXXXXXXXXXXXX (test)
# Format: pk_live_XXXXXXXXXXXXXXXXXXXXXXXX (live)
STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXX
```

### 4. Site URL Setup
```bash
# Replace with your actual Render URL
SITE_URL=https://your-site-name.onrender.com
```

## 🛠️ Troubleshooting Commands

### Check Build Status
```bash
# In Render dashboard, check build logs
# Look for these success messages:
# - "Building Income Generator Hub..."
# - "Static site - no build required"
# - "All files ready for deployment"
```

### Verify Environment Variables
```bash
# Check if environment variables are loaded
echo $NODE_ENV
echo $GA_MEASUREMENT_ID
echo $ADSENSE_PUBLISHER_ID
```

### Test Local Build
```bash
# Test the build command locally
echo "Building Income Generator Hub..."
echo "Static site - no build required"
echo "All files ready for deployment"
```

## 🔧 Advanced Configuration

### Custom Build Script
If you need a more complex build process, create a `build.sh`:

```bash
#!/bin/bash
echo "Building Income Generator Hub..."

# Check if all required files exist
if [ ! -f "index.html" ]; then
    echo "Error: index.html not found"
    exit 1
fi

if [ ! -f "styles.css" ]; then
    echo "Error: styles.css not found"
    exit 1
fi

if [ ! -f "script.js" ]; then
    echo "Error: script.js not found"
    exit 1
fi

echo "All required files found"
echo "Static site - no build required"
echo "All files ready for deployment"
```

### Environment-Specific Variables

#### Development Environment
```bash
NODE_ENV=development
GA_MEASUREMENT_ID=G-DEVXXXXXXXX
ADSENSE_PUBLISHER_ID=ca-pub-dev-XXXXXXXXXX
STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXX
SITE_URL=http://localhost:3000
```

#### Production Environment
```bash
NODE_ENV=production
GA_MEASUREMENT_ID=G-PRODXXXXXXXX
ADSENSE_PUBLISHER_ID=ca-pub-prod-XXXXXXXXXX
STRIPE_PUBLISHABLE_KEY=pk_live_XXXXXXXXXXXXXXXXXXXXXXXX
SITE_URL=https://your-site-name.onrender.com
```

## 📈 Performance Optimization

### Pre-deployment Checklist
```bash
# 1. Optimize images
# 2. Minify CSS and JS
# 3. Compress files
# 4. Test locally
npm start
```

### Post-deployment Verification
```bash
# 1. Check site loads
curl -I https://your-site-name.onrender.com

# 2. Test mobile responsiveness
# 3. Verify all links work
# 4. Check ad integration
```

## 🚀 Quick Deploy Commands

### One-Command Deployment
```bash
# Complete deployment workflow
git add . && git commit -m "Deploy to Render" && git push origin main
```

### Environment Variable Update
```bash
# Update environment variables in Render dashboard
# Then redeploy
git commit --allow-empty -m "Trigger redeploy" && git push origin main
```

---

## ✅ Success Indicators

Your deployment is successful when you see:

1. **Build Logs:**
   ```
   Building Income Generator Hub...
   Static site - no build required
   All files ready for deployment
   ```

2. **Site Status:** `Live` in Render dashboard

3. **URL Access:** `https://your-site-name.onrender.com` loads correctly

4. **SSL Certificate:** Automatically provided by Render

5. **Performance:** Page loads in under 3 seconds

**Your income-generating website is now live and ready to earn money!** 💰🚀 