#!/bin/bash

# FieldCheck Backend Deployment Script

echo "🚀 Starting FieldCheck Backend Deployment..."

# Add all changes
echo "📦 Adding files to git..."
git add .

# Prompt for commit message
echo "💬 Enter commit message:"
read commit_message

# If no message provided, use default
if [ -z "$commit_message" ]; then
    commit_message="Update backend code"
fi

# Commit changes
echo "💾 Committing changes..."
git commit -m "$commit_message"

# Push to GitHub
echo "🔼 Pushing to GitHub..."
git push origin main

echo "✅ Deployment complete! Render will auto-deploy in a few moments."
echo "📊 Check deployment status: https://dashboard.render.com"
