# 🚀 Claude Everywhere Setup Guide

## 🌐 Chrome Integration

### Method 1: Web App (Recommended)
1. **Open**: https://claude.ai in Chrome
2. **Sign in** with your account
3. **Bookmark** for quick access
4. **Pin tab** for always-on access

### Method 2: Chrome Extension
- Search Chrome Web Store for "Claude AI"
- Install official extension (if available)

---

## 📝 Notion Integration

### Step 1: Create Notion Integration
1. **Go to**: https://developers.notion.com/docs/create-a-notion-integration
2. **Click**: "Create new integration"
3. **Name**: "Claude AI Helper"
4. **Workspace**: Select your workspace
5. **Copy**: The API key (starts with `secret_`)

### Step 2: Configure Claude Desktop
```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "NOTION_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

### Step 3: Share Databases
1. **Open** the Notion page/database you want Claude to access
2. **Click** "Share" (top right)
3. **Invite** your Claude integration
4. **Set permissions** (Read/Write as needed)

---

## 💻 Folder Organization with Claude

### Claude Code (Terminal) - Already Set Up ✅
```bash
ai              # Navigate to AI Hub
aimigrate       # Go to Perplexity migration
aistart         # Start Claude in current directory
```

### Folder Organization Commands
```bash
# Organize downloads
aiorganize-downloads() {
    cd ~/Downloads
    claude --prompt "Help me organize these files by category"
}

# Clean desktop
aiclean-desktop() {
    cd ~/Desktop
    claude --prompt "Help me organize and clean up this desktop"
}

# Project organization
aiorganize-project() {
    claude --prompt "Help me organize this project folder structure"
}
```

### Desktop Integration
- **AI-Hub.command** - Opens terminal in AI Hub ✅
- **AI-Migration.command** - Opens migration hub ✅

---

## 🔄 Unified Workflow

### Daily Workflow with Claude Everywhere

**Morning Setup:**
1. **Chrome**: Open claude.ai tab
2. **Terminal**: Run `aistart` in project folder
3. **Notion**: Have Claude-connected database open

**Work Session:**
1. **Research** in Chrome Claude
2. **Code/organize** with Claude Code
3. **Document** in Notion with Claude integration

**Evening Cleanup:**
1. **Organize files** with Claude Code
2. **Update Notion** databases via Claude
3. **Sync everything** with `aipush`

---

## 🛠️ Advanced Integrations

### File Watcher (Auto-Organization)
```bash
# Watch Downloads folder and auto-organize
fswatch ~/Downloads | while read file; do
    cd ~/Downloads && claude --prompt "New file detected: $file. Suggest organization."
done
```

### Alfred/Spotlight Integration
- Create workflows to launch Claude in specific folders
- Quick commands for common organization tasks

### Automator Scripts
- Folder organization workflows
- Right-click context menus for Claude assistance

---

## 🎯 Quick Access Summary

| Platform | Access Method | Use Case |
|----------|---------------|----------|
| **Chrome** | claude.ai bookmark | Research, writing, planning |
| **Terminal** | `aistart` command | Code, files, automation |
| **Notion** | MCP integration | Database management |
| **Desktop** | .command shortcuts | Quick access |
| **Finder** | Right-click (future) | File organization |

---

## 🔧 Troubleshooting

### Chrome Issues
- Clear browser cache
- Check if logged in to correct account
- Try incognito mode

### Notion Issues
- Verify API key is correct
- Check integration permissions
- Restart Claude Desktop after config changes

### Folder Organization Issues
- Ensure Claude Code is updated
- Check file permissions
- Verify working directory

---

*Your Claude is now everywhere you need it! 🎉*