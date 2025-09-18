# 🚀 Quick Setup for Your OTHER Computer

## Copy & Paste These Commands (in order):

### Step 1: Run the Unification Script
```bash
cd ~/Library/Mobile\ Documents/com~apple~CloudDocs/
./UNIFY_COMPUTERS.sh
```

### Step 2: Authenticate GitHub (when prompted)
```bash
gh auth login --web
```
Follow the prompts to authenticate through your browser.
(Or use the token I'll give you separately - don't commit tokens!)

### Step 3: Clone the Repository
```bash
cd ~/Projects
gh repo clone gabosaturno11/AI-Hub
```

### Step 4: Activate Your New Commands
```bash
source ~/.zshrc
```

### Step 5: Test Everything Works
```bash
aicheck
```

---

## ✅ That's It! Your Commands Are Now:

| Command | What it does |
|---------|--------------|
| `ai` | Go to AI Hub project |
| `aistart` | Start Claude in AI Hub |
| `aisync` | Pull latest changes from other computer |
| `aipush` | Push your changes to share |
| `aisafety` | Check both computers' sync status |
| `aiwhich` | See which computer you're on |

## 📝 Daily Workflow:

**Before starting work:**
```bash
aisync
```

**After finishing work:**
```bash
aipush
```

---

## 🔧 If Something Goes Wrong:

1. **Can't find script?** Download it:
```bash
curl -o ~/UNIFY_COMPUTERS.sh https://raw.githubusercontent.com/gabosaturno11/AI-Hub/main/UNIFY_COMPUTERS.sh
chmod +x ~/UNIFY_COMPUTERS.sh
./UNIFY_COMPUTERS.sh
```

2. **GitHub auth fails?** Create new token at:
https://github.com/settings/tokens/new

3. **Commands not working?** Restart Terminal or run:
```bash
source ~/.zshrc
```

---
*This file syncs through GitHub - any computer can use it!*