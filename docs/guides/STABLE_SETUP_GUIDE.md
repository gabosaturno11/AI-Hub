# Stable Multi-Computer Setup Guide

## Recommended Architecture

### Option 1: GitHub as Primary (MOST STABLE) ✅

**Local Work Folders** (NOT in iCloud):
```
~/Projects/AI-Hub/          # Computer 1 working copy
~/Projects/AI-Hub/          # Computer 2 working copy
```

**Shared Resources** (IN iCloud):
```
~/Library/Mobile Documents/com~apple~CloudDocs/AI-Resources/
├── templates/              # Shared templates
├── docs/                   # Documentation
├── configs/                # Shared configs
└── assets/                 # Images, data
```

**Workflow**:
1. Work locally in ~/Projects/AI-Hub
2. Push to GitHub frequently
3. Pull on other computer before starting
4. Keep only resources/docs in iCloud

### Option 2: Local + Cloud Backup

**Structure**:
```
~/Projects/AI-Hub/          # Active work (Git repo)
~/Dropbox/AI-Hub-Backup/    # Auto-backup (no Git)
~/iCloud/AI-Resources/      # Shared resources only
```

### Option 3: Smart Sync Script

Create a sync strategy that avoids conflicts:

```bash
#!/bin/bash
# smart-sync.sh

# 1. Always pull from GitHub first
cd ~/Projects/AI-Hub
git pull origin main

# 2. Do your work
# ...

# 3. Commit and push immediately
git add .
git commit -m "Update from $(hostname)"
git push origin main

# 4. Sync resources to iCloud (non-Git files)
rsync -av --exclude='.git' ~/Projects/AI-Hub/docs/ ~/Library/Mobile\ Documents/com~apple~CloudDocs/AI-Resources/docs/
```

## ⚠️ What NOT to Do

1. **Don't** put active Git repos in iCloud
2. **Don't** work on same files simultaneously on both computers
3. **Don't** store large binary files in iCloud Git repos
4. **Don't** rely on iCloud for version control

## ✅ Stable Best Practices

### Daily Workflow
```bash
# Morning - Computer 1
cd ~/Projects/AI-Hub
git pull
# ... work ...
git push

# Evening - Computer 2
cd ~/Projects/AI-Hub
git pull
# ... work ...
git push
```

### Use iCloud For
- Documentation (*.md files)
- Templates
- Configurations
- Small shared resources
- Personal notes

### Use GitHub For
- All code
- Version control
- Team collaboration
- CI/CD workflows
- Issue tracking

### Use Local For
- Active development
- Git operations
- Large files
- Temporary work

## Migration Commands

Move your Git repo OUT of iCloud:
```bash
# 1. Clone fresh copy to local
cd ~/Projects
git clone https://github.com/gabosaturno03/AI-Hub.git

# 2. Keep resources in iCloud
mkdir -p ~/Library/Mobile\ Documents/com~apple~CloudDocs/AI-Resources
cp -r ~/Library/Mobile\ Documents/com~apple~CloudDocs/AI-Hub/docs ~/Library/Mobile\ Documents/com~apple~CloudDocs/AI-Resources/
cp -r ~/Library/Mobile\ Documents/com~apple~CloudDocs/AI-Hub/templates ~/Library/Mobile\ Documents/com~apple~CloudDocs/AI-Resources/

# 3. Update your aliases
alias aihub='cd ~/Projects/AI-Hub'
alias airesources='cd ~/Library/Mobile\ Documents/com~apple~CloudDocs/AI-Resources'
```

## Summary

**Most Stable Setup**:
- Git repo: `~/Projects/AI-Hub` (local, not iCloud)
- Sync method: GitHub (push/pull)
- Shared resources: iCloud (docs/templates only)
- Backup: Time Machine + GitHub

This avoids ALL iCloud Git issues while keeping convenience!