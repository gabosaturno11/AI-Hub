#!/bin/zsh
# Launch All Repos Script
# Email: gabo@saturnomovement.03

set -euo pipefail

echo "🚀 LAUNCHING ALL REPOS"
echo "======================"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Function to check if repo exists on GitHub
check_github_repo() {
    local repo_name=$1
    gh repo view "gabosaturno11/$repo_name" >/dev/null 2>&1
}

# Function to create GitHub repo
create_github_repo() {
    local repo_path=$1
    local repo_name=$(basename "$repo_path")
    
    echo -e "${BLUE}Creating GitHub repo: $repo_name${NC}"
    
    cd "$repo_path"
    
    # Check if already has remote
    if git remote get-url origin >/dev/null 2>&1; then
        echo -e "${YELLOW}Repo already has remote origin${NC}"
        return 0
    fi
    
    # Create GitHub repo
    gh repo create "gabosaturno11/$repo_name" --public --source=. --remote=origin --push
    
    echo -e "${GREEN}✅ Created and pushed: $repo_name${NC}"
}

# Function to enable GitHub Pages
enable_github_pages() {
    local repo_name=$1
    
    echo -e "${BLUE}Enabling GitHub Pages for: $repo_name${NC}"
    
    # Enable GitHub Pages
    gh api repos/gabosaturno11/$repo_name/pages \
        --method POST \
        --field source='{"branch":"main","path":"/"}'
    
    echo -e "${GREEN}✅ GitHub Pages enabled: https://gabosaturno11.github.io/$repo_name/${NC}"
}

# Main execution
echo -e "${BLUE}Found repositories to launch:${NC}"

# List of repositories to check
repos=(
    "/Users/Gabosaturno/Projects/toc-editor-deploy/interactive-toc-editor"
    "/Users/Gabosaturno/ULTIMATE_WRITING_HUB_MANUStar/writing-hub-backend"
    "/Users/Gabosaturno/Projects/toc-editor-deploy/netlify-deploy/AI-Hub"
)

for repo_path in "${repos[@]}"; do
    if [ -d "$repo_path/.git" ]; then
        repo_name=$(basename "$repo_path")
        echo -e "${YELLOW}📁 $repo_name${NC}"
        
        # Check if repo exists on GitHub
        if check_github_repo "$repo_name"; then
            echo -e "${GREEN}✅ Already on GitHub: https://github.com/gabosaturno11/$repo_name${NC}"
            
            # Enable GitHub Pages if it has web content
            if [ -f "$repo_path/index.html" ] || [ -f "$repo_path/package.json" ]; then
                enable_github_pages "$repo_name"
            fi
        else
            echo -e "${RED}❌ Not on GitHub - creating...${NC}"
            create_github_repo "$repo_path"
            
            # Enable GitHub Pages if it has web content
            if [ -f "$repo_path/index.html" ] || [ -f "$repo_path/package.json" ]; then
                enable_github_pages "$repo_name"
            fi
        fi
        echo ""
    fi
done

echo -e "${GREEN}🎉 ALL REPOS LAUNCHED!${NC}"
echo ""
echo "Live URLs:"
echo "- AI-Hub: https://gabosaturno11.github.io/AI-Hub/"
echo "- Check other repos at: https://github.com/gabosaturno11/"