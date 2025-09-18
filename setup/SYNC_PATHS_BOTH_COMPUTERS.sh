#!/bin/bash

# Path Sync Script - Run on BOTH computers
# This ensures consistent paths across your Mac and iMac

echo "🔧 Setting up consistent paths for Claude and AI Hub..."

# 1. Add to shell config (works for both zsh and bash)
SHELL_CONFIG="$HOME/.zshrc"
if [ ! -f "$SHELL_CONFIG" ]; then
    SHELL_CONFIG="$HOME/.bash_profile"
fi

# 2. Remove old path entries (clean slate)
grep -v "AI-Hub" "$SHELL_CONFIG" > "$SHELL_CONFIG.tmp" && mv "$SHELL_CONFIG.tmp" "$SHELL_CONFIG"

# 3. Add consistent paths
cat >> "$SHELL_CONFIG" << 'EOF'

# === AI Hub Paths (Synced via iCloud) ===
export AIHUB="$HOME/Library/Mobile Documents/com~apple~CloudDocs/AI-Hub"
export AI_SYNC="$HOME/Library/Mobile Documents/com~apple~CloudDocs/AI-sync"

# AI Hub aliases
alias aihub='cd "$AIHUB"'
alias aistart='cd "$AIHUB" && claude'
alias aisync='cd "$AI_SYNC"'
alias aiprojects='cd "$HOME/Library/Mobile Documents/com~apple~CloudDocs/00_AOC_MASTER_FOLDER/08_EXISTING_PROJECTS"'

# Claude shortcuts
alias cc='claude'
alias ccnew='claude --new'

# Quick status check
alias aicheck='echo "📍 AI Hub: $AIHUB" && echo "🚀 Claude: $(which claude)" && echo "💻 Computer: $(hostname)"'
EOF

# 4. Source the config
source "$SHELL_CONFIG"

# 5. Verify setup
echo "✅ Setup complete!"
echo ""
echo "📊 Status Check:"
echo "Computer: $(hostname)"
echo "AI Hub: $AIHUB"
echo "Claude: $(which claude)"
echo "Shell: $SHELL"
echo ""
echo "🎯 Test commands:"
echo "  aicheck  - Show current setup"
echo "  aihub    - Go to AI Hub"
echo "  aistart  - Start Claude in AI Hub"
echo ""
echo "⚡ Run 'source $SHELL_CONFIG' or restart Terminal to activate"