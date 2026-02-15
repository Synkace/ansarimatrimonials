#!/bin/bash

# VPS Deployment Script for Ansari Matrimonials
# Run this script on the VPS to deploy the latest changes

set -e  # Exit on any error

echo "🚀 Starting deployment..."

# Navigate to project directory
cd /root/ansarimatrimonials || { echo "❌ Project directory not found"; exit 1; }

# Stop PM2 process
echo "⏸️  Stopping PM2 process..."
pm2 stop ansari-matrimonials || echo "⚠️  Process not running, continuing..."

# Pull latest changes
echo "📥 Pulling latest code from GitHub..."
git pull origin main

# Install/update dependencies
echo "📦 Installing dependencies..."
npm install

# Update .env.local with Firebase credentials if not exists
if ! grep -q "NEXT_PUBLIC_FIREBASE_API_KEY" .env.local 2>/dev/null; then
    echo "🔧 Adding Firebase credentials to .env.local..."
    cat >> .env.local << 'EOF'

# Firebase Client Configuration (Public - used in browser)
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyDda5oTHKom1Jk1Kx8GuNCxU5dJKF0IbE0"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="ansari-matrimony.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="ansari-matrimony"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="ansari-matrimony.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="781772137282"
NEXT_PUBLIC_FIREBASE_APP_ID="1:781772137282:web:de4010c2736467071f1edb"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-Y68JHPX57C"
EOF
fi

# Build the application
# Clean previous build to ensure env vars are baked in
echo "Cc Cleaning previous build..."
rm -rf .next

echo "🔨 Building Next.js application..."
npm run build

# Restart PM2
echo "▶️  Restarting application with PM2..."
pm2 start ansari-matrimonials --update-env || pm2 restart ansari-matrimonials --update-env

# Save PM2 configuration
pm2 save

# Show status
echo "📊 Application status:"
pm2 status ansari-matrimonials

echo "✅ Deployment completed successfully!"
echo "🌐 Application running at: http://ansarimatrimonials.com"
