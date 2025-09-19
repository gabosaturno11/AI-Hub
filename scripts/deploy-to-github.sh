#!/bin/bash
# AI Hub GitHub Deployment Script

echo "🚀 Starting AI Hub deployment to GitHub..."

# Navigate to project directory
cd ~/Projects/AI-Hub

# Clean up
find . -name ".DS_Store" -delete
echo "🧹 Cleaned .DS_Store files"

# Create .gitignore if it doesn't exist
if [ ! -f .gitignore ]; then
    cat > .gitignore << 'EOF'
.DS_Store
node_modules/
*.log
.env
.vscode/
EOF
    echo "📝 Created .gitignore"
fi

# Stage all changes
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "ℹ️  No changes to deploy"
    exit 0
fi

# Commit with timestamp
git commit -m "🚀 Deploy AI Hub: $(date '+%Y-%m-%d %H:%M:%S')

✅ Updated frontend dashboards
✅ Synced AOC Master content
✅ Integrated voice systems
✅ Ready for public access

🤖 Auto-deployed via script"

# Push to GitHub
if git push origin main; then
    echo "✅ Deployed successfully!"
    echo "🌐 Public access: https://gabosaturno11.github.io/AI-Hub/"
    echo "🐙 Repository: https://github.com/gabosaturno11/AI-Hub"
    echo "📊 Working Dashboard: https://gabosaturno11.github.io/AI-Hub/frontend/working-dashboard.html"
    echo "🔵 Main Dashboard: https://gabosaturno11.github.io/AI-Hub/AOC_FRONTEND/AI_HUB_FRONTEND_DASHBOARD.html"
    echo "🎛️  Mode Selector: https://gabosaturno11.github.io/AI-Hub/AOC_FRONTEND/AI_HUB_MODE_SELECTOR.html"
    echo "📖 Cortex Center: https://gabosaturno11.github.io/AI-Hub/frontend/cortex-control-center.html"
else
    echo "❌ Deployment failed - please check git status"
    exit 1
fi