#!/bin/bash
# Security guard script
echo "🛡️ Running security checks..."

# Check for exposed API keys
if grep -r "sk-" ~/Projects/AI-Hub/ --exclude-dir=logs 2>/dev/null; then
    echo "⚠️ WARNING: Potential API key exposure detected!"
fi

# Check file permissions
find ~/Projects/AI-Hub/ -type f -perm -004 | grep -v "\.md$" && echo "⚠️ WARNING: World-readable files found!"

# Backup sensitive configs
cp ~/.zshrc ~/Projects/AI-Hub/configs/zshrc.backup 2>/dev/null
echo "✅ Security check complete"
