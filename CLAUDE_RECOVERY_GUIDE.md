# 🔧 Claude Recovery Guide - If Things Go Wrong

## Quick Recovery Steps

### 1. Re-establish Context
```bash
cd ~/Library/Mobile\ Documents/com~apple~CloudDocs/AI-Hub/
claude
```
Then tell Claude: "Read CLAUDE.md and AI_SETUP_DOCUMENTATION.md in current directory"

### 2. Key Information to Give Claude

Copy & paste this to Claude if needed:
```
My AI Hub is at: ~/Library/Mobile Documents/com~apple~CloudDocs/AI-Hub/
I use iCloud to sync between Mac and iMac
Read these files for context:
- CLAUDE.md
- AI_SETUP_DOCUMENTATION.md
- AI_REFERENCE_GUIDE.md
```

### 3. Essential Aliases to Restore

If aliases stop working, paste this in Terminal:
```bash
echo '
# AI Hub shortcuts
export AIHUB="$HOME/Library/Mobile Documents/com~apple~CloudDocs/AI-Hub"
alias aihub="cd \"$AIHUB\""
alias aistart="cd \"$AIHUB\" && claude"
alias aisync="cd \"$AIHUB/../AI-sync\""
' >> ~/.zshrc && source ~/.zshrc
```

## 📋 Critical Information Backup

### Your Setup:
- **Main Path**: `~/Library/Mobile Documents/com~apple~CloudDocs/AI-Hub/`
- **Platform**: macOS (both Mac and iMac)
- **Sync Method**: iCloud Drive
- **Shell**: zsh

### Your Folder Structure:
```
AI-Hub/
├── Development/
├── Production/
├── Testing/
├── configs/
├── scripts/
├── templates/
├── workflows/
├── docs/
└── logs/
```

## 🚨 Common Issues & Fixes

| Problem | Fix |
|---------|-----|
| Claude doesn't know paths | Show this file: `open CLAUDE_RECOVERY_GUIDE.md` |
| Aliases not working | Run the restore command above |
| Can't find AI Hub | Use full path: `cd ~/Library/Mobile\ Documents/com~apple~CloudDocs/AI-Hub/` |
| Claude seems confused | Start fresh: `claude --new` then give context |

## 📝 Magic Phrase for Claude

If Claude seems lost, say exactly this:
```
"You are helping me with my AI Hub located at ~/Library/Mobile Documents/com~apple~CloudDocs/AI-Hub/ which syncs via iCloud between my Mac and iMac. Please read CLAUDE.md and AI_SETUP_DOCUMENTATION.md in that directory for context."
```

## 🔄 Full Reset Procedure

1. **Exit Claude**: Type `exit`
2. **Clear settings**: `rm -rf ~/.claude/projects/*`
3. **Restart Claude**: `aistart` or `cd ~/Library/Mobile\ Documents/com~apple~CloudDocs/AI-Hub/ && claude`
4. **Give context**: Use the magic phrase above

## 💾 Backup Commands

Run monthly to save your setup:
```bash
# Backup your aliases
cp ~/.zshrc ~/Library/Mobile\ Documents/com~apple~CloudDocs/AI-Hub/configs/zshrc-backup

# Document your Claude version
claude --version > ~/Library/Mobile\ Documents/com~apple~CloudDocs/AI-Hub/configs/claude-version.txt

# List your AI Hub structure
ls -la ~/Library/Mobile\ Documents/com~apple~CloudDocs/AI-Hub/ > ~/Library/Mobile\ Documents/com~apple~CloudDocs/AI-Hub/configs/structure-backup.txt
```

## ✅ Recovery Checklist

When Claude gets confused:
- [ ] Navigate to AI Hub folder
- [ ] Tell Claude to read CLAUDE.md
- [ ] Mention you use iCloud sync
- [ ] Specify Mac and iMac setup
- [ ] Point to this recovery guide

## 🆘 Emergency Contact

If nothing works:
1. Check Claude Code issues: https://github.com/anthropics/claude-code/issues
2. Restart Terminal completely
3. Restart computer (fixes 90% of weird issues)
4. Check iCloud sync status

---
*Keep this guide in your AI Hub - it's your "break glass in case of emergency" document!*