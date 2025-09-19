#!/bin/bash
# Unified AI Hub System - Merging SM AI-Command OS with AOC Master

echo "🔄 Setting up Unified AI Hub System..."

# Create unified command structure
create_unified_commands() {
    echo "📋 Creating unified SM + AOC commands..."

    # Base SM functionality adapted for AOC system
    cat >> ~/.zshrc << 'EOF'

# Unified AI Hub Commands (SM + AOC Integration)
# =============================================

# Core Hub Commands
alias sm="unified_hub_command"
alias hub="unified_hub_command"

# Unified Hub Function
unified_hub_command() {
    case "$1" in
        "open"|"hub")
            echo "🚀 Opening AI Hub in VS Code..."
            cd ~/Projects/AI-Hub && code .
            ;;
        "finder")
            echo "📁 Opening AI Hub in Finder..."
            open ~/Projects/AI-Hub
            ;;
        "path")
            echo "~/Projects/AI-Hub"
            ;;
        "copy")
            echo "~/Projects/AI-Hub" | pbcopy
            echo "📋 AI Hub path copied to clipboard"
            ;;
        "link")
            echo "file://$(pwd)/Projects/AI-Hub"
            ;;
        "sync")
            echo "🔄 Syncing AI Hub with iCloud..."
            aisync
            ;;
        "sync-dry")
            echo "🔍 Dry run sync preview..."
            rsync -av --dry-run ~/Projects/AI-Hub/ ~/Library/Mobile\ Documents/com~apple~CloudDocs/AI-Hub/
            ;;
        "backup")
            echo "💾 Creating dated backup..."
            backup_name="AI_Hub_Backup_$(date +%Y%m%d_%H%M%S).zip"
            cd ~ && zip -r ~/Desktop/"$backup_name" Projects/AI-Hub Downloads/AOC_MASTER
            echo "✅ Backup created: ~/Desktop/$backup_name"
            ;;
        "claude")
            echo "🤖 Launching Claude development environment..."
            cd ~/Projects/AI-Hub && code . --extensions-dir ~/.vscode/extensions
            ;;
        "claude-dir")
            echo "~/Downloads/AOC_MASTER/05_STRATEGIC_ASSETS/CLAUDE_PROJECT_FRAMEWORKS"
            ;;
        "claude-link")
            echo "file://$(pwd)/Downloads/AOC_MASTER/05_STRATEGIC_ASSETS/CLAUDE_PROJECT_FRAMEWORKS"
            ;;
        "claude-copy")
            echo "~/Downloads/AOC_MASTER/05_STRATEGIC_ASSETS/CLAUDE_PROJECT_FRAMEWORKS" | pbcopy
            echo "📋 Claude frameworks path copied"
            ;;
        "git-sync")
            echo "🐙 Syncing AI Hub repository..."
            cd ~/Projects/AI-Hub && git pull && git add . && git commit -m "Auto-sync $(date)" && git push
            ;;
        "status")
            echo "📊 AI Hub System Status:"
            echo "✅ Projects/AI-Hub: $([ -d ~/Projects/AI-Hub ] && echo "EXISTS" || echo "MISSING")"
            echo "✅ AOC_MASTER: $([ -d ~/Downloads/AOC_MASTER ] && echo "EXISTS" || echo "MISSING")"
            echo "✅ iCloud Sync: $([ -d ~/Library/Mobile\ Documents/com~apple~CloudDocs/AI-Hub ] && echo "ACTIVE" || echo "INACTIVE")"
            echo "✅ Current Mode: $(cat ~/.ai_hub_current_mode 2>/dev/null || echo "technical")"
            echo "📁 Total Files: $(find ~/Downloads/AOC_MASTER -type f 2>/dev/null | wc -l)"
            ;;
        "menu")
            echo "🎛️ AI Hub Interactive Menu:"
            echo "1) Open Hub in VS Code"
            echo "2) Open Frontend Dashboard"
            echo "3) Sync All Systems"
            echo "4) Check Status"
            echo "5) Switch Modes"
            echo "6) Emergency Commands"
            read -p "Select option (1-6): " choice
            case $choice in
                1) sm open ;;
                2) hub-main ;;
                3) aisync ;;
                4) sm status ;;
                5) hub-modes ;;
                6) hub-status ;;
                *) echo "Invalid option" ;;
            esac
            ;;
        "aoc")
            echo "📖 AOC Master Commands:"
            echo "  aoc - Navigate to AOC Master"
            echo "  aoc-content - Knowledge Vault"
            echo "  aoc-visual - Visual Arsenal"
            echo "  aoc-tech - Strategic Assets"
            aoc
            ;;
        "frontend")
            echo "🌐 Opening Frontend Dashboard..."
            hub-main
            ;;
        "modes")
            echo "🎛️ Opening Mode Selector..."
            hub-modes
            ;;
        "live")
            echo "📊 Opening Live Status Tracker..."
            hub-status
            ;;
        *)
            echo "🤖 Unified AI Hub Commands:"
            echo ""
            echo "Core Commands:"
            echo "  sm open / sm hub     - Open Hub in VS Code"
            echo "  sm finder           - Open Hub in Finder"
            echo "  sm path/copy/link   - Show/copy Hub path"
            echo "  sm sync/sync-dry    - iCloud sync (real/dry-run)"
            echo "  sm backup           - Create dated backup"
            echo "  sm status           - Check system status"
            echo "  sm menu             - Interactive picker"
            echo ""
            echo "Claude Integration:"
            echo "  sm claude           - Launch Claude dev environment"
            echo "  sm claude-dir/link/copy - Claude framework paths"
            echo "  sm git-sync         - Sync repositories"
            echo ""
            echo "AOC Master Integration:"
            echo "  sm aoc              - AOC Master navigation"
            echo "  sm frontend         - Frontend dashboard"
            echo "  sm modes            - Mode selector"
            echo "  sm live             - Live status tracker"
            echo ""
            echo "Quick Actions:"
            echo "  gabo-tech/rebel/phil - Mode switching"
            echo "  aisync              - Multi-computer sync"
            echo "  hub-main            - Main dashboard"
            ;;
    esac
}

# SM Command Shortcuts (backward compatibility)
alias sm-open="sm open"
alias sm-sync="sm sync"
alias sm-status="sm status"
alias sm-backup="sm backup"

EOF

    echo "✅ Unified commands added to ~/.zshrc"
}

# Merge directory structures
merge_structures() {
    echo "🔗 Merging AI Hub structures..."

    # Ensure AI-Hub has AOC Master link
    if [ ! -L ~/Projects/AI-Hub/AOC_MASTER ]; then
        ln -sf ~/Downloads/AOC_MASTER ~/Projects/AI-Hub/AOC_MASTER
        echo "🔗 Created AOC_MASTER symlink in AI-Hub"
    fi

    # Ensure AOC Master has AI-Hub reference
    mkdir -p ~/Downloads/AOC_MASTER/05_STRATEGIC_ASSETS/AI_HUB_INTEGRATION

    cat > ~/Downloads/AOC_MASTER/05_STRATEGIC_ASSETS/AI_HUB_INTEGRATION/README.md << 'EOF'
# AI Hub Integration

This folder connects the AOC Master system with the main AI-Hub repository.

## Structure:
- **AI-Hub**: ~/Projects/AI-Hub (main development hub)
- **AOC Master**: ~/Downloads/AOC_MASTER (book production system)
- **iCloud Sync**: ~/Library/Mobile Documents/com~apple~CloudDocs/AI-Hub

## Commands:
- `sm` - Unified hub commands
- `aisync` - Multi-computer sync
- `hub-main` - Frontend dashboard

## Integration Points:
- AOC Master is symlinked into AI-Hub for unified access
- Both systems sync via iCloud Drive
- Shared command aliases and workflows
EOF

    echo "✅ Directory structures merged"
}

# Setup deployment structure
setup_deployment() {
    echo "🚀 Setting up unified deployment..."

    # Create deployment folder in AI-Hub
    mkdir -p ~/Projects/AI-Hub/deployment/frontend
    mkdir -p ~/Projects/AI-Hub/deployment/scripts

    # Copy frontend files to deployment
    cp ~/Downloads/AOC_MASTER/04_VISUAL_ARSENAL/HTML_Interfaces/Interactive_Maps/*.html ~/Projects/AI-Hub/deployment/frontend/

    # Copy scripts to deployment
    cp ~/Downloads/AOC_MASTER/05_STRATEGIC_ASSETS/CLAUDE_PROJECT_FRAMEWORKS/AI_WORKFLOWS/*.sh ~/Projects/AI-Hub/deployment/scripts/

    echo "✅ Deployment structure ready"
}

# Main execution
main() {
    create_unified_commands
    merge_structures
    setup_deployment

    echo ""
    echo "🎯 Unified AI Hub System Setup Complete!"
    echo ""
    echo "Available Commands:"
    echo "  sm status    - Check system health"
    echo "  sm open      - Open in VS Code"
    echo "  sm frontend  - Launch dashboard"
    echo "  sm sync      - Sync everything"
    echo "  sm menu      - Interactive menu"
    echo ""
    echo "💡 Run 'source ~/.zshrc' to activate new commands"
    echo "🚀 Run 'sm status' to verify installation"
}

# Run if executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi