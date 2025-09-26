#!/bin/zsh
# Fix iCloud Conflicts - AI-Hub Consolidation
# Email: gabo@saturnomovement.03

set -euo pipefail

PROJECT_ROOT="/Users/Gabosaturno/Projects/AI-Hub"
DESKTOP_HUB="/Users/Gabosaturno/Desktop/WRITING_HUBS/HUB_V3_KORTEX"
ICLOUD_HUB="/Users/Gabosaturno/Library/Mobile Documents/com~apple~CloudDocs/AI-Hub"

echo "🔧 Fixing iCloud Conflicts"
echo "=========================="

case "${1:-status}" in
    "status")
        echo "📊 Current Situation:"
        echo "Main Project: $PROJECT_ROOT"
        echo "Desktop Hub: $DESKTOP_HUB"
        echo "iCloud Hub: $ICLOUD_HUB"
        echo ""
        echo "⚠️  PROBLEM: Desktop is iCloud synced!"
        echo "   - Symlinks on Desktop point to local folders"
        echo "   - iCloud has multiple AI-Hub versions"
        echo "   - This causes sync conflicts"
        ;;
    "consolidate")
        echo "🔄 Consolidating to main project..."
        
        # Backup current state
        echo "📦 Creating backup..."
        BACKUP_DIR="$PROJECT_ROOT/backups/$(date +%Y%m%d_%H%M%S)"
        mkdir -p "$BACKUP_DIR"
        
        # Copy unique files from Desktop Hub
        if [ -d "$DESKTOP_HUB" ]; then
            echo "📁 Copying from Desktop Hub..."
            cp -r "$DESKTOP_HUB"/* "$BACKUP_DIR/desktop_hub/" 2>/dev/null || true
        fi
        
        # Copy unique files from iCloud Hub
        if [ -d "$ICLOUD_HUB" ]; then
            echo "☁️ Copying from iCloud Hub..."
            cp -r "$ICLOUD_HUB"/* "$BACKUP_DIR/icloud_hub/" 2>/dev/null || true
        fi
        
        echo "✅ Backup created: $BACKUP_DIR"
        ;;
    "clean-desktop")
        echo "🧹 Cleaning Desktop symlinks..."
        
        # Remove Desktop symlinks
        rm -f "/Users/Gabosaturno/Desktop/AI-Hub-Folder"
        rm -f "/Users/Gabosaturno/Desktop/AI-Hub-Unified"
        
        echo "✅ Desktop symlinks removed"
        echo "💡 Use Projects folder as single source of truth"
        ;;
    "help")
        echo "Available commands:"
        echo "  status      - Show current conflict situation"
        echo "  consolidate - Backup all versions to main project"
        echo "  clean-desktop - Remove Desktop symlinks"
        echo "  help        - Show this help"
        ;;
esac