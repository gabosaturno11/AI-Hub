# 🏢 AI Hub Setup for Team Members (Without iCloud Access)

## 📍 Recommended Locations by Platform

### Mac Users
```bash
~/Documents/AI-Hub/
```
**Why**: Documents folder is standard, backed up by Time Machine, and easy to find

### Windows Users
```
C:\Users\[Username]\Documents\AI-Hub\
```
**Why**: Documents folder syncs with OneDrive if enabled, standard location

### Linux Users
```bash
~/Documents/AI-Hub/
```
**Why**: Consistent with other platforms, easy to remember

## 🔧 Team Setup Instructions

### Step 1: Create AI Hub Folder

**Mac/Linux Terminal:**
```bash
mkdir -p ~/Documents/AI-Hub
cd ~/Documents/AI-Hub
```

**Windows Command Prompt:**
```cmd
mkdir %USERPROFILE%\Documents\AI-Hub
cd %USERPROFILE%\Documents\AI-Hub
```

### Step 2: Set Up Shortcuts

**Mac/Linux (.zshrc or .bashrc):**
```bash
echo '
# Team AI Hub (Local Version)
export AIHUB="$HOME/Documents/AI-Hub"
alias aihub="cd \"$AIHUB\""
alias aistart="cd \"$AIHUB\" && claude"
' >> ~/.zshrc && source ~/.zshrc
```

**Windows (PowerShell Profile):**
```powershell
# Add to PowerShell profile
Add-Content $PROFILE @"
function aihub { Set-Location "$HOME\Documents\AI-Hub" }
function aistart { Set-Location "$HOME\Documents\AI-Hub"; claude }
"@
```

## 🔄 Sync Options for Teams

### Option 1: GitHub (Recommended for Technical Teams)
```bash
cd ~/Documents/AI-Hub
git init
git remote add origin [your-repo-url]
git pull origin main
```

### Option 2: Dropbox
- Install Dropbox
- Move AI-Hub to: `~/Dropbox/AI-Hub/`
- Share folder with team

### Option 3: Google Drive
- Install Google Drive Desktop
- Place AI-Hub in: `~/Google Drive/AI-Hub/`
- Share with team via Google Workspace

### Option 4: OneDrive (Windows/Microsoft Teams)
- Place in: `~/OneDrive/AI-Hub/`
- Share via Microsoft Teams or OneDrive

## 📂 Team Folder Structure

```
AI-Hub/
├── SHARED/           # Everyone can access
│   ├── templates/    # Shared templates
│   ├── docs/         # Team documentation
│   └── resources/    # Common resources
├── PERSONAL/         # Individual workspaces
│   ├── [Name1]/      # Person 1's workspace
│   ├── [Name2]/      # Person 2's workspace
│   └── [Name3]/      # Person 3's workspace
├── PROJECTS/         # Active projects
│   ├── Project-A/
│   ├── Project-B/
│   └── Project-C/
└── ARCHIVE/          # Completed work
```

## 🔐 Access Control Best Practices

### For Shared Folders
- **Read/Write**: SHARED/templates, SHARED/resources
- **Read Only**: SHARED/docs (only admins write)
- **Personal**: PERSONAL/[name] (only owner has access)

### Security Rules
1. **Never store passwords/API keys** in shared folders
2. **Use .env files** for sensitive data (add to .gitignore)
3. **Document permissions** in README files

## 💻 Quick Setup Script for New Team Members

Save as `setup-team-ai-hub.sh`:
```bash
#!/bin/bash

# Create AI Hub structure
mkdir -p ~/Documents/AI-Hub/{SHARED/{templates,docs,resources},PERSONAL,PROJECTS,ARCHIVE}

# Create welcome file
cat > ~/Documents/AI-Hub/README.md << 'EOF'
# Welcome to AI Hub!

## Your Personal Workspace
Create a folder in PERSONAL/ with your name

## Getting Started
1. Read docs in SHARED/docs/
2. Check templates in SHARED/templates/
3. Start your first project in PROJECTS/

## Need Help?
- Check TEAM_SETUP_GUIDE.md
- Ask your team lead
EOF

echo "✅ AI Hub created at ~/Documents/AI-Hub/"
echo "📂 Run 'cd ~/Documents/AI-Hub' to start"
```

## 🚀 First Day Checklist for Team Members

- [ ] Create AI-Hub folder in Documents
- [ ] Set up aliases/shortcuts
- [ ] Create personal folder in PERSONAL/
- [ ] Read team documentation
- [ ] Test Claude access with `aistart`
- [ ] Join team sync solution (GitHub/Dropbox/etc.)

## 📊 Comparison Table

| Method | Pros | Cons | Best For |
|--------|------|------|----------|
| Local Only | Simple, secure | No sync | Solo work |
| GitHub | Version control, free | Technical knowledge needed | Dev teams |
| Dropbox | Easy sync, simple | Costs money | Mixed teams |
| Google Drive | Free 15GB, familiar | Needs Google account | Small teams |
| OneDrive | Windows integrated | Microsoft account needed | Corporate teams |

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Permission denied" | Check folder permissions: `chmod 755 ~/Documents/AI-Hub` |
| Can't sync | Verify cloud service is running |
| Conflicts | Use dated folders: `Project-2024-09-15/` |
| Lost work | Check ARCHIVE/ folder or cloud service trash |

---
*Share this guide with team members who need to set up their own AI Hub!*