#!/bin/zsh
# Claude Connection Script for AI-Hub
# Email: gabo@saturnomovement.03

set -euo pipefail

PROJECT_ROOT="/Users/Gabosaturno/Projects/AI-Hub"

echo "🤖 Claude Connection Helper"
echo "=========================="

case "${1:-help}" in
    "status")
        echo "📊 Current Status:"
        echo "Project: $PROJECT_ROOT"
        echo "Branch: $(git branch --show-current)"
        echo "Last Commit: $(git log -1 --pretty=format:'%h - %s')"
        echo "GitHub: https://github.com/gabosaturno11/AI-Hub"
        echo "Live URL: https://gabosaturno11.github.io/AI-Hub/"
        ;;
    "sync")
        echo "🔄 Syncing with Claude..."
        git add .
        git commit -m "🤖 Claude sync: $(date '+%Y-%m-%d %H:%M:%S')"
        git push origin main
        echo "✅ Synced to GitHub"
        ;;
    "open")
        echo "🎯 Opening main dashboard..."
        open "https://gabosaturno11.github.io/AI-Hub/"
        ;;
    "help")
        echo "Available commands:"
        echo "  status  - Show current project status"
        echo "  sync    - Sync changes to GitHub"
        echo "  open    - Open live site"
        echo "  help    - Show this help"
        ;;
esac