#!/bin/bash
# AI Hub Multi-Computer Sync

echo "🔄 Starting AI Hub Sync across computers..."

SYNC_DIR="$HOME/Library/Mobile Documents/com~apple~CloudDocs/AI-Hub/CLAUDE_SYNC"
ICLOUD_DIR="$HOME/Library/Mobile Documents/com~apple~CloudDocs/AI-Hub"
AOC_DIR="$HOME/Downloads/AOC_MASTER"

mkdir -p "$SYNC_DIR"
mkdir -p "$ICLOUD_DIR"

# 1. Sync current mode
if [ -f ~/.ai_hub_current_mode ]; then
    cp ~/.ai_hub_current_mode "$SYNC_DIR/current_mode.txt"
    echo "🎛️ Mode synced: $(cat ~/.ai_hub_current_mode)"
else
    echo "technical" > ~/.ai_hub_current_mode
    echo "technical" > "$SYNC_DIR/current_mode.txt"
fi

# 2. Sync AOC Master to iCloud
if [ -d "$AOC_DIR" ]; then
    echo "📁 Syncing AOC Master to iCloud..."
    rsync -av --delete "$AOC_DIR/" "$ICLOUD_DIR/AOC_MASTER/"
    echo "✅ AOC Master synced ($(find "$AOC_DIR" -type f | wc -l) files)"
fi

# 3. Update context
echo "$(date): AI sync completed from $(hostname)" >> "$SYNC_DIR/recent_actions.log"

# 4. GitHub sync if available
if [ -d "$HOME/Projects/AI-Hub/.git" ]; then
    echo "🐙 Syncing with GitHub..."
    cd "$HOME/Projects/AI-Hub"
    git add .
    git commit -m "Auto-sync from $(hostname) - $(date)" 2>/dev/null
    git pull --rebase 2>/dev/null
    git push 2>/dev/null
    echo "✅ GitHub synced"
fi

echo "🚀 AI Hub sync complete!"
echo "📋 Run 'claude_sync_in.sh' to load context in Claude"