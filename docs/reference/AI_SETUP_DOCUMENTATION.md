# AI Hub Setup Documentation

## Primary Paths (iCloud Synced)

### Main AI Hub Location
```bash
~/Library/Mobile\ Documents/com~apple~CloudDocs/AI-Hub/
```

### Alternative Access Path
```bash
~/iCloud\ Drive/AI-Hub/
```

## Folder Structure

```
AI-Hub/
├── CLAUDE.md           # Command center documentation
├── deploy-hub.sh       # Deployment script
├── configs/            # Configuration files
├── Development/        # Development environment
├── Production/         # Production environment
├── Testing/            # Testing environment
├── scripts/            # Utility scripts
├── templates/          # Project templates
├── workflows/          # Workflow definitions
├── docs/              # Documentation
└── logs/              # System logs
```

## Related AI Folders in iCloud

1. **AI Projects Library**
   ```
   ~/Library/Mobile\ Documents/com~apple~CloudDocs/00_AOC_MASTER_FOLDER/08_EXISTING_PROJECTS/03_PROJECTS_LIBRARY/00_DEPLOYMENT READY/AI-Agents-Massive-Projects
   ```

2. **AI Agents Master**
   ```
   ~/Library/Mobile\ Documents/com~apple~CloudDocs/00_AOC_MASTER_FOLDER/08_EXISTING_PROJECTS/04_Documents/03_Saturno Movement/AI-Agents-Master-Folder
   ```

3. **Claude Frameworks**
   ```
   ~/Library/Mobile\ Documents/com~apple~CloudDocs/00_AOC_MASTER_FOLDER/05_STRATEGIC_ASSETS/CLAUDE_PROJECT_FRAMEWORKS/AI_Workflows
   ```

4. **AI Sync Folder**
   ```
   ~/Library/Mobile\ Documents/com~apple~CloudDocs/AI-sync/
   ```

## Quick Access Commands

### Navigate to AI Hub
```bash
cd ~/Library/Mobile\ Documents/com~apple~CloudDocs/AI-Hub/
```

### Start Claude in AI Hub
```bash
cd ~/Library/Mobile\ Documents/com~apple~CloudDocs/AI-Hub/ && claude
```

### Create Alias for Easy Access (add to ~/.zshrc or ~/.bash_profile)
```bash
alias aihub='cd ~/Library/Mobile\ Documents/com~apple~CloudDocs/AI-Hub/'
alias aistart='cd ~/Library/Mobile\ Documents/com~apple~CloudDocs/AI-Hub/ && claude'
```

## Cross-Computer Sync Setup

### For Both Computers (Mac & iMac)

1. **Ensure iCloud Drive is enabled**
   - System Settings → Apple ID → iCloud → iCloud Drive (ON)
   - Options → Desktop & Documents Folders (ON if needed)

2. **Verify AI Hub Access**
   ```bash
   ls -la ~/Library/Mobile\ Documents/com~apple~CloudDocs/AI-Hub/
   ```

3. **Create Consistent Aliases** (add to shell config)
   ```bash
   # AI Hub shortcuts
   export AIHUB="$HOME/Library/Mobile Documents/com~apple~CloudDocs/AI-Hub"
   alias aihub='cd "$AIHUB"'
   alias aistart='cd "$AIHUB" && claude'
   alias aisync='cd "$AIHUB/../AI-sync"'

   # Quick navigation
   alias aiprojects='cd "$HOME/Library/Mobile Documents/com~apple~CloudDocs/00_AOC_MASTER_FOLDER/08_EXISTING_PROJECTS"'
   ```

4. **Claude Code Settings** (~/. claude/settings.json)
   ```json
   {
     "theme": "dark",
     "statusLine": "enhanced",
     "permissions": {
       "allowedDirectories": [
         "~/Library/Mobile Documents/com~apple~CloudDocs/AI-Hub",
         "~/Library/Mobile Documents/com~apple~CloudDocs/AI-sync"
       ]
     }
   }
   ```

## Workflow Commands

| Command | Description |
|---------|-------------|
| `aihub` | Navigate to AI Hub |
| `aistart` | Start Claude in AI Hub |
| `aisync` | Go to AI sync folder |
| `aiprojects` | Navigate to AI projects |

## Verification Checklist

- [ ] AI Hub folder exists in iCloud
- [ ] Both computers can access the folder
- [ ] Aliases are set up in shell config
- [ ] Claude Code can read/write to AI Hub
- [ ] iCloud sync is active and working
- [ ] deploy-hub.sh script is executable

## Notes

- All paths use iCloud Drive for automatic sync between Mac and iMac
- The AI Hub serves as the central command center for all AI operations
- Changes made on one computer automatically sync to the other via iCloud
- Keep sensitive API keys in local ~/.claude/settings.json, not in iCloud

Last Updated: September 15, 2025