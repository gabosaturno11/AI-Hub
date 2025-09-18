# 🤖 Claude Code Access for Team Members

## ⚠️ Important: Account & Licensing

### What Your Team Needs

1. **Claude Code CLI Installation**
   - Download from: https://claude.ai/download
   - Available for Mac, Windows, Linux
   - Free to install the software

2. **Claude Account Access** (HERE'S THE KEY PART!)

   **Option A: Individual Accounts (Recommended)**
   - Each team member needs their own Claude account
   - Sign up at: https://claude.ai
   - Plans: Free (limited) or Pro ($20/month per person)

   **Option B: Team Plan**
   - Claude Team subscription
   - Contact Anthropic for team pricing
   - Centralized billing and management

   **Option C: API Key Sharing (NOT Recommended)**
   - Security risk
   - Violates terms of service
   - No individual usage tracking

## 📋 Setup Steps for Team Members

### Step 1: Install Claude Code
```bash
# Mac (Homebrew)
brew install claude

# Or download directly from:
# https://claude.ai/download
```

### Step 2: Authenticate
```bash
# Each team member runs:
claude login

# This opens browser for individual authentication
# They'll need their own account credentials
```

### Step 3: Verify Installation
```bash
claude --version
# Should show: 1.0.xxx (Claude Code)
```

### Step 4: Navigate to Team AI Hub
```bash
cd ~/Documents/AI-Hub/
claude
```

## 💰 Cost Breakdown

| Plan | Cost | Users | Best For |
|------|------|-------|----------|
| Free | $0 | 1 | Testing, light use |
| Pro | $20/mo | 1 | Individual power users |
| Team | Custom | 2+ | Organizations |
| API | Pay-per-use | Unlimited | Developers |

## 🔐 Account Management Best Practices

### DO ✅
- Have each team member create their own account
- Use company email addresses for team members
- Set up team billing if you have 3+ users
- Document who has access in a secure location

### DON'T ❌
- Share your personal login credentials
- Post API keys in shared folders
- Use one account for multiple people
- Store passwords in AI Hub

## 📊 Team Access Matrix

| Team Member | Account Type | Access Level | Setup Status |
|-------------|--------------|--------------|--------------|
| You (Admin) | Pro | Full | ✅ Complete |
| Member 1 | Free/Pro | User | ⏳ Pending |
| Member 2 | Free/Pro | User | ⏳ Pending |
| Member 3 | Free/Pro | User | ⏳ Pending |

## 🚀 Quick Team Onboarding

Send this message to team members:
```
Hi Team,

To access our AI Hub with Claude:

1. Download Claude Code: https://claude.ai/download
2. Create your own Claude account: https://claude.ai/signup
3. Install and run 'claude login' to authenticate
4. Create AI-Hub folder: mkdir ~/Documents/AI-Hub
5. Start using: cd ~/Documents/AI-Hub && claude

For Pro features ($20/month), upgrade at: https://claude.ai/subscription
Company can reimburse with receipt.

See TEAM_CLAUDE_ACCESS_GUIDE.md for full details.
```

## 💡 Alternative Access Methods

### For Non-Technical Team Members
1. **Claude Web Interface**: https://claude.ai
   - No installation needed
   - Copy/paste from shared documents
   - Still needs individual account

2. **Shared Screen Sessions**
   - One person runs Claude Code
   - Others join via Zoom/Teams
   - Good for training

3. **API Integration**
   - Build custom interface
   - Requires developer setup
   - More control over access

## 📈 Usage Monitoring

### Track Team Usage
- Each member's account shows individual usage
- Pro accounts: Higher message limits
- Free accounts: ~30 messages/day limit

### Budget Planning
- 5 team members × $20/month = $100/month
- Consider Team plan if 10+ members
- API might be cheaper for high volume

## 🆘 Common Issues

| Problem | Solution |
|---------|----------|
| "Rate limit reached" | Upgrade to Pro or wait |
| "Authentication failed" | Run `claude logout` then `claude login` |
| "Command not found" | Reinstall Claude Code |
| "No access to AI Hub" | Check folder permissions |

## 📝 License Compliance

**Important Legal Notes:**
- Each user needs their own account per Anthropic's Terms of Service
- Account sharing may result in suspension
- Business use requires appropriate plan
- Keep receipts for tax/reimbursement

---
*Questions about team access? Contact Anthropic support or check https://claude.ai/business*