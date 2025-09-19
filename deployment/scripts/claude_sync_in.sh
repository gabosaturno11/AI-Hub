#!/bin/bash
# Claude Context Sync In - Load context for new session

SYNC_DIR="$HOME/Library/Mobile Documents/com~apple~CloudDocs/AI-Hub/CLAUDE_SYNC"
mkdir -p "$SYNC_DIR"

echo "🤖 Loading Claude context from sync..."

# Generate current context
cat << EOF
🤖 **Claude Context Restore - $(date)**

## Current System State:
- **Computer**: $(hostname)
- **Mode**: $(cat ~/.ai_hub_current_mode 2>/dev/null || echo "technical")
- **Working Directory**: $(pwd)

## Recent Activity:
$(tail -5 "$SYNC_DIR/recent_actions.log" 2>/dev/null || echo "No recent activity logged")

## Active Projects Status:
- **AOC Master Files**: $(find ~/Downloads/AOC_MASTER -type f 2>/dev/null | wc -l) files organized
- **Current Mode**: $(cat ~/.ai_hub_current_mode 2>/dev/null || echo "🔧 Technical")
- **Last Sync**: $(stat -f "%Sm" "$SYNC_DIR/current_mode.txt" 2>/dev/null || echo "Unknown")

## Continue Where We Left Off:
$(cat "$SYNC_DIR/current_context.md" 2>/dev/null || echo "Starting fresh session")

---
**Please use this context to continue our work seamlessly.**
EOF