# AI Hub Reference Guide (Non-Developer Edition)

## 🗂️ What Is This?
Your AI Hub is like a shared digital workspace that automatically syncs between your computers through iCloud - think of it like a smart folder that's always up-to-date everywhere.

## 📍 Quick Reference Chart

| What You Want | Type This | What Happens |
|--------------|-----------|--------------|
| Open AI workspace | `aihub` | Takes you to your AI Hub folder |
| Start AI assistant | `aistart` | Opens Claude in your AI Hub |
| View your files | `ls` | Shows all files in current location |
| Read a document | `open FILENAME` | Opens file in default app |
| Check where you are | `pwd` | Shows your current folder location |

## 🏗️ Your AI Hub Structure

```
AI-Hub/                Your main AI workspace
├── 📝 Development/    Work in progress
├── ✅ Production/     Finished projects
├── 🧪 Testing/        Try new things here
├── 📚 docs/           Documentation
├── 🛠️ scripts/        Automated tasks
└── 📋 templates/      Reusable formats
```

## ✨ Best Practices (Simple Rules)

### DO's ✅
1. **Save everything in AI Hub** - It syncs automatically
2. **Use clear file names** - `project-name-v2.md` not `untitled23.txt`
3. **Organize by project** - Create folders for each initiative
4. **Test before production** - Try things in Testing/ first
5. **Document as you go** - Future you will thank present you

### DON'Ts ❌
1. **Don't save passwords here** - iCloud = not for secrets
2. **Don't delete without checking** - Deletes sync everywhere
3. **Don't work offline too long** - Sync conflicts are annoying
4. **Don't skip backups** - Even iCloud can have issues
5. **Don't ignore error messages** - They're trying to help

## 🎯 Common Tasks

### Starting Your Day
```bash
aistart              # Opens Claude in AI Hub
ls                   # See what's there
```

### Creating New Project
```bash
aihub                # Go to AI Hub
mkdir "ProjectName"  # Create project folder
cd ProjectName       # Enter the folder
```

### Finding Your Work
```bash
aihub                # Go to AI Hub
ls Development/      # See work in progress
ls Production/       # See completed work
```

## 🔄 Team Collaboration

### Sharing Access
1. Share AI Hub folder via iCloud
2. Team members get automatic updates
3. Changes sync within minutes

### File Naming Convention
```
YYYY-MM-DD-project-name-version.ext
2024-09-15-marketing-campaign-v1.md
```

### Folder Organization
```
ProjectName/
├── drafts/          # Work in progress
├── final/           # Approved versions
├── resources/       # Images, data, etc.
└── archive/         # Old versions
```

## 🚨 Quick Fixes

| Problem | Solution |
|---------|----------|
| "Command not found" | Restart Terminal |
| Files not syncing | Check iCloud status in System Settings |
| Can't find AI Hub | Type: `cd ~/Library/Mobile\ Documents/com~apple~CloudDocs/AI-Hub/` |
| Lost in folders | Type: `aihub` to go home |

## 📱 Access From Anywhere

### On Mac
- Finder → iCloud Drive → AI-Hub
- Terminal → Type `aihub`

### On iPhone/iPad
- Files app → iCloud Drive → AI-Hub

### On Windows (via iCloud)
- iCloud for Windows → iCloud Drive → AI-Hub

## 💡 Pro Tips

1. **Morning Routine**: `aistart` → Check tasks → Start working
2. **Evening Routine**: Save work → Check sync status → Close
3. **Weekly**: Clean up Testing/ folder
4. **Monthly**: Archive old projects

## 🎓 Learning Commands

Start with these 5 commands:
1. `aihub` - Go to workspace
2. `ls` - List files
3. `cd foldername` - Enter folder
4. `cd ..` - Go back one folder
5. `open .` - Open current folder in Finder

---
*Remember: You don't need to memorize everything. This guide lives in your AI Hub for quick reference anytime!*