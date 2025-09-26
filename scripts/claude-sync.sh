#!/bin/zsh
# Claude Code Sync - AI-Hub Cross-Computer Management
# Email: gabo@saturnomovement.03

set -euo pipefail

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_ROOT="/Users/Gabosaturno/Projects/AI-Hub"
ICLOUD_SYNC="/Users/Gabosaturno/Library/Mobile Documents/com~apple~CloudDocs/AI-Hub"

echo -e "${BLUE}🤖 Claude Sync - AI-Hub Status${NC}"

case "${1:-status}" in
    "status")
        echo "Project: $PROJECT_ROOT"
        echo "Branch: $(git branch --show-current)"
        echo "Last: $(git log -1 --pretty=format:'%h - %s')"
        echo "Uncommitted: $(git status --porcelain | wc -l) files"
        ;;
    "sync")
        echo -e "${YELLOW}Syncing to iCloud...${NC}"
        cp -r "$PROJECT_ROOT/frontend" "$ICLOUD_SYNC/" 2>/dev/null || true
        cp -r "$PROJECT_ROOT/AOC_FRONTEND" "$ICLOUD_SYNC/" 2>/dev/null || true
        echo -e "${GREEN}✅ Synced${NC}"
        ;;
    "open")
        open "$PROJECT_ROOT/frontend/working-dashboard.html"
        ;;
    "deploy")
        echo -e "${YELLOW}Preparing deployment...${NC}"
        git add .
        git commit -m "🚀 Deploy AI Hub: $(date '+%Y-%m-%d %H:%M:%S')"
        git push origin main
        echo -e "${GREEN}✅ Deployed to GitHub Pages${NC}"
        echo "URL: https://gabosaturno11.github.io/AI-Hub/"
        ;;
esac