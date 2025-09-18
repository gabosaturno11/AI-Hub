# 🚀 AI Hub - Unified Command Center

## Quick Start (New Computer)

```bash
# Download and run the setup
curl -O https://raw.githubusercontent.com/gabosaturno11/AI-Hub/main/setup/ULTIMATE_UNIFICATION_SSH.sh
chmod +x ULTIMATE_UNIFICATION_SSH.sh
./ULTIMATE_UNIFICATION_SSH.sh
```

## 📁 Directory Structure

```
AI-Hub/
├── setup/                  # Setup & installation scripts
│   ├── ULTIMATE_UNIFICATION_SSH.sh
│   ├── UNIFY_COMPUTERS.sh
│   └── QUICK_SETUP_OTHER_COMPUTER.md
├── docs/                   # Documentation
│   ├── guides/            # How-to guides
│   │   ├── TEAM_SETUP_GUIDE.md
│   │   ├── TEAM_CLAUDE_ACCESS_GUIDE.md
│   │   └── STABLE_SETUP_GUIDE.md
│   └── reference/         # Reference docs
│       ├── CLAUDE.md
│       ├── CLAUDE_RECOVERY_GUIDE.md
│       └── AI_REFERENCE_GUIDE.md
├── scripts/               # Utility scripts
├── templates/             # Project templates
├── resources/             # Shared resources
└── shared/               # Team shared files
```

## ⚡ Essential Commands

| Command | Action | Description |
|---------|--------|-------------|
| `ai` | Navigate | Go to AI Hub directory |
| `aistart` | Launch | Start Claude in AI Hub |
| `aipush` | Share | Push changes to GitHub |
| `aipull` | Update | Pull latest changes |
| `aisync` | Smart Sync | Sync with conflict resolution |
| `aiinfo` | Status | Show current setup info |

## 🔐 Security Setup (SSH)

This repository uses SSH for maximum security and control:

1. **Each computer** has its own SSH key
2. **No passwords** needed after setup
3. **Full control** from both computers
4. **Automatic authentication**

## 💻 Multi-Computer Workflow

### Before Starting Work
```bash
aisync          # Pull latest changes
```

### After Finishing Work
```bash
aipush          # Push your changes
```

### Check Status Anytime
```bash
aiinfo          # See your current setup
aistatus        # Check git status
```

## 📚 Documentation

### For Setup
- [Quick Setup Guide](setup/QUICK_SETUP_OTHER_COMPUTER.md)
- [Ultimate SSH Setup](setup/ULTIMATE_UNIFICATION_SSH.sh)

### For Teams
- [Team Setup Guide](docs/guides/TEAM_SETUP_GUIDE.md)
- [Claude Access Guide](docs/guides/TEAM_CLAUDE_ACCESS_GUIDE.md)

### For Recovery
- [Claude Recovery Guide](docs/reference/CLAUDE_RECOVERY_GUIDE.md)
- [AI Reference Guide](docs/reference/AI_REFERENCE_GUIDE.md)

## 🎯 Project Directives

### Core Principles
1. **Unified Control** - Both computers have equal access
2. **No Conflicts** - Use `aisync` before work, `aipush` after
3. **Security First** - SSH keys, no tokens in code
4. **Documentation** - Keep guides updated

### Workflow Rules
1. **Always sync before starting** (`aisync`)
2. **Commit with clear messages**
3. **Push immediately after work** (`aipush`)
4. **Document new scripts/tools**

### File Organization
- `/setup` - Installation and setup files only
- `/docs` - All documentation
- `/scripts` - Executable utilities
- `/templates` - Reusable templates
- `/resources` - Shared assets
- `/shared` - Team collaboration files

## 🛠️ Maintenance

### Weekly Tasks
- Clean up temporary files
- Review and archive old projects
- Update documentation as needed

### Monthly Tasks
- Rotate SSH keys if needed
- Review access permissions
- Backup important resources

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't push | Run `aisync` first |
| SSH fails | Check key with `aiinfo` |
| Commands not found | Run `source ~/.zshrc` |
| Sync conflicts | Use `git status` to review |

## 📞 Support

- GitHub Issues: [Report problems](https://github.com/gabosaturno11/AI-Hub/issues)
- Documentation: Check `/docs` folder
- Recovery: See [Claude Recovery Guide](docs/reference/CLAUDE_RECOVERY_GUIDE.md)

---

**Repository**: https://github.com/gabosaturno11/AI-Hub
**Owner**: @gabosaturno11
**Setup**: SSH with full control from multiple computers