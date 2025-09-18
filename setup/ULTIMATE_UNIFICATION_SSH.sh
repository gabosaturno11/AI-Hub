#!/bin/bash

# ============================================
# ULTIMATE UNIFICATION SCRIPT - SSH VERSION
# Full control from BOTH computers!
# ============================================

echo "🔐 ULTIMATE UNIFICATION WITH SSH"
echo "================================"
echo "Computer: $(hostname)"
echo ""

COMPUTER_NAME=$(hostname | cut -d'.' -f1)

# 1. Generate unique SSH key for this computer
echo "🔑 Generating SSH key for $COMPUTER_NAME..."
ssh-keygen -t ed25519 -C "gabosaturno11@github.com" -f ~/.ssh/id_ed25519_aihub_$COMPUTER_NAME -N ""

# 2. Configure SSH
echo "⚙️  Configuring SSH..."
cat > ~/.ssh/config << EOF
# AI Hub GitHub Configuration
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_aihub_$COMPUTER_NAME
  AddKeysToAgent yes
  UseKeychain yes
EOF

# 3. Add key to ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519_aihub_$COMPUTER_NAME

# 4. Display public key for GitHub
echo ""
echo "📋 ADD THIS SSH KEY TO GITHUB:"
echo "=============================="
cat ~/.ssh/id_ed25519_aihub_$COMPUTER_NAME.pub
echo "=============================="
echo ""
echo "Steps:"
echo "1. Go to: https://github.com/settings/ssh/new"
echo "2. Title: AI-Hub-$COMPUTER_NAME"
echo "3. Paste the key above"
echo "4. Click 'Add SSH key'"
echo ""
read -p "Press Enter after adding the key to GitHub..."

# 5. Test connection
echo "🔗 Testing SSH connection..."
ssh -T git@github.com 2>&1 | grep -q "successfully" && echo "✅ SSH authenticated!" || echo "⚠️  Check your SSH key on GitHub"

# 6. Clone or update repository
if [ ! -d "$HOME/Projects/AI-Hub/.git" ]; then
    echo "📥 Cloning repository via SSH..."
    cd ~/Projects
    git clone git@github.com:gabosaturno11/AI-Hub.git
else
    echo "📂 Updating existing repository to SSH..."
    cd ~/Projects/AI-Hub
    git remote set-url origin git@github.com:gabosaturno11/AI-Hub.git
    git pull
fi

# 7. Configure Git
git config --global user.name "Gabo Saturno"
git config --global user.email "gabosaturno11@github.com"
git config --global init.defaultBranch main

# 8. Create power aliases
SHELL_CONFIG="$HOME/.zshrc"
[ ! -f "$SHELL_CONFIG" ] && SHELL_CONFIG="$HOME/.bash_profile"

# Remove old configs
grep -v "# ULTIMATE-AI-CONFIG" "$SHELL_CONFIG" > "$SHELL_CONFIG.tmp" && mv "$SHELL_CONFIG.tmp" "$SHELL_CONFIG" 2>/dev/null || true

cat >> "$SHELL_CONFIG" << 'SHELLCONFIG'

# ULTIMATE-AI-CONFIG START
# ========================

# Core paths
export AI_HUB="$HOME/Projects/AI-Hub"
export AI_SHARED="$HOME/Library/Mobile Documents/com~apple~CloudDocs/AI-Shared"

# Power aliases
alias ai='cd "$AI_HUB"'
alias aistart='cd "$AI_HUB" && claude'
alias aiedit='cd "$AI_HUB" && code .'

# Git power commands (no passwords needed!)
alias aipull='cd "$AI_HUB" && git pull'
alias aipush='cd "$AI_HUB" && git add . && git commit -m "Update from $(hostname)" && git push'
alias aistatus='cd "$AI_HUB" && git status'
alias ailog='cd "$AI_HUB" && git log --oneline -10'

# Sync commands
aisync() {
    cd "$AI_HUB"
    echo "🔄 Syncing with GitHub..."
    git pull --rebase
    echo "✅ Sync complete!"
}

aicommit() {
    cd "$AI_HUB"
    git add .
    git commit -m "$1"
    git push
    echo "✅ Changes pushed!"
}

# Computer info
aiinfo() {
    echo "💻 Computer: $(hostname)"
    echo "📁 AI Hub: $AI_HUB"
    echo "🔑 SSH Key: ~/.ssh/id_ed25519_aihub_$(hostname | cut -d. -f1)"
    echo "📡 Remote: $(cd $AI_HUB && git remote -v | head -1)"
}

# ULTIMATE-AI-CONFIG END
SHELLCONFIG

# 9. Create sync status
mkdir -p "$HOME/Library/Mobile Documents/com~apple~CloudDocs/AI-Status"
cat > "$HOME/Library/Mobile Documents/com~apple~CloudDocs/AI-Status/$COMPUTER_NAME.json" << EOF
{
  "computer": "$COMPUTER_NAME",
  "ssh_configured": true,
  "last_setup": "$(date -u +"%Y-%m-%d %H:%M:%S UTC")",
  "key_file": "~/.ssh/id_ed25519_aihub_$COMPUTER_NAME",
  "remote": "git@github.com:gabosaturno11/AI-Hub.git"
}
EOF

# 10. Final message
source "$SHELL_CONFIG"

echo ""
echo "🎯 ULTIMATE UNIFICATION COMPLETE!"
echo "================================="
echo ""
echo "✨ You now have FULL CONTROL with:"
echo "  • No passwords needed (SSH keys)"
echo "  • Instant push/pull (no tokens)"
echo "  • Unique key per computer"
echo "  • Complete GitHub access"
echo ""
echo "⚡ Power Commands:"
echo "  ai        - Go to AI Hub"
echo "  aipush    - Push changes instantly"
echo "  aipull    - Pull changes instantly"
echo "  aisync    - Smart sync with rebase"
echo "  aicommit  - Commit with message"
echo "  aiinfo    - See your setup"
echo ""
echo "🔐 Your SSH key is:"
echo "  ~/.ssh/id_ed25519_aihub_$COMPUTER_NAME"
echo ""
echo "Restart Terminal or run: source $SHELL_CONFIG"