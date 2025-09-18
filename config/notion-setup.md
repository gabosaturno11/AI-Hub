# Notion Integration Setup for AI-Hub

## 🔗 Share Notion Access Between Claude Code Instances

### Step 1: Get Your Notion Integration Token
1. Go to https://www.notion.so/my-integrations
2. Click "New integration"
3. Name it: "AI-Hub Claude"
4. Copy the Internal Integration Token

### Step 2: Save Token to AI-Hub (Secure)
Create `.env.local` file in AI-Hub:
```bash
cd ~/Projects/AI-Hub
echo "NOTION_API_KEY=your-token-here" > config/.env.local
echo "NOTION_DATABASE_ID=your-database-id" >> config/.env.local
```

### Step 3: Get Database ID
1. Open your Notion database
2. Copy the URL: notion.so/xxxxx/**THIS-PART-IS-THE-ID**/yyyy
3. Add to `.env.local`

### Step 4: Share Pages with Integration
In Notion:
1. Open the page/database
2. Click "..." menu → "Connections"
3. Add your "AI-Hub Claude" integration

### Step 5: Sync Configuration
```bash
cd ~/Projects/AI-Hub
git add config/notion-setup.md
git commit -m "Add Notion setup guide"
git push
```

### Step 6: On Other Computer
```bash
cd ~/Projects/AI-Hub
git pull
# Create same .env.local with tokens
```

## 🔒 Security Notes
- Never commit `.env.local` to git
- Add to `.gitignore`: `config/.env.local`
- Tokens are shared via secure channels only

## 📝 Test Script
Save this as `test-notion.js`:
```javascript
// Test Notion connection
const { Client } = require('@notionhq/client');
require('dotenv').config({ path: './config/.env.local' });

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function test() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  });
  console.log('Connected! Found', response.results.length, 'pages');
}

test();
```

## ✅ Once Set Up
Both Claude Code instances can:
- Read from same Notion workspace
- Write to shared databases
- Sync project documentation
- Access same knowledge base

---
*Token sharing must be done securely outside of git*