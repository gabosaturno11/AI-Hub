class AIDriveAssistant {
  constructor() {
    this.isAuthenticated = false;
    this.apis = {
      claude: null,
      openai: null,
      notion: null
    };
    
    this.init();
  }
  
  async init() {
    await this.checkAuthStatus();
    await this.loadSavedConfig();
    this.setupEventListeners();
    this.updateUI();
  }
  
  setupEventListeners() {
    // Auth buttons
    document.getElementById('authBtn').addEventListener('click', () => this.authenticate());
    document.getElementById('disconnectBtn').addEventListener('click', () => this.disconnect());
    
    // API test buttons
    document.querySelectorAll('.test-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.testAPI(e.target.dataset.api));
    });
    
    // Save config button
    document.getElementById('saveConfig').addEventListener('click', () => this.saveConfig());
    
    // Feature buttons
    document.querySelectorAll('.feature-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.executeFeature(e.target.dataset.action));
    });
  }
  
  async authenticate() {
    try {
      this.showStatus('Connecting to Google Drive...', 'info');
      
      const token = await chrome.identity.getAuthToken({ 
        interactive: true,
        scopes: [
          'https://www.googleapis.com/auth/drive',
          'https://www.googleapis.com/auth/drive.file'
        ]
      });
      
      if (token) {
        this.isAuthenticated = true;
        await chrome.storage.local.set({ 'auth_token': token });
        this.showStatus('Successfully connected to Google Drive!', 'success');
        this.updateUI();
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      this.showStatus('Authentication failed. Please try again.', 'error');
    }
  }
  
  async disconnect() {
    try {
      const token = await chrome.storage.local.get('auth_token');
      if (token.auth_token) {
        await chrome.identity.removeCachedAuthToken({ token: token.auth_token });
      }
      
      await chrome.storage.local.clear();
      this.isAuthenticated = false;
      this.apis = { claude: null, openai: null, notion: null };
      
      // Clear input fields
      document.getElementById('claudeKey').value = '';
      document.getElementById('openaiKey').value = '';
      document.getElementById('notionKey').value = '';
      
      this.showStatus('Disconnected successfully', 'info');
      this.updateUI();
    } catch (error) {
      console.error('Disconnect failed:', error);
      this.showStatus('Disconnect failed', 'error');
    }
  }
  
  async checkAuthStatus() {
    try {
      const result = await chrome.storage.local.get('auth_token');
      if (result.auth_token) {
        // Verify token is still valid
        const response = await fetch('https://www.googleapis.com/drive/v3/about?fields=user', {
          headers: {
            'Authorization': `Bearer ${result.auth_token}`
          }
        });
        
        if (response.ok) {
          this.isAuthenticated = true;
        } else {
          // Token expired, remove it
          await chrome.storage.local.remove('auth_token');
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  }
  
  async loadSavedConfig() {
    try {
      const config = await chrome.storage.local.get(['claude_key', 'openai_key', 'notion_key']);
      
      if (config.claude_key) {
        document.getElementById('claudeKey').value = config.claude_key;
        this.apis.claude = config.claude_key;
      }
      
      if (config.openai_key) {
        document.getElementById('openaiKey').value = config.openai_key;
        this.apis.openai = config.openai_key;
      }
      
      if (config.notion_key) {
        document.getElementById('notionKey').value = config.notion_key;
        this.apis.notion = config.notion_key;
      }
    } catch (error) {
      console.error('Failed to load config:', error);
    }
  }
  
  async saveConfig() {
    try {
      const claudeKey = document.getElementById('claudeKey').value;
      const openaiKey = document.getElementById('openaiKey').value;
      const notionKey = document.getElementById('notionKey').value;
      
      await chrome.storage.local.set({
        'claude_key': claudeKey,
        'openai_key': openaiKey,
        'notion_key': notionKey
      });
      
      this.apis.claude = claudeKey;
      this.apis.openai = openaiKey;
      this.apis.notion = notionKey;
      
      this.showStatus('Configuration saved successfully!', 'success');
    } catch (error) {
      console.error('Failed to save config:', error);
      this.showStatus('Failed to save configuration', 'error');
    }
  }
  
  async testAPI(apiName) {
    const testBtn = document.querySelector(`[data-api="${apiName}"]`);
    const originalText = testBtn.textContent;
    
    testBtn.textContent = 'Testing...';
    testBtn.disabled = true;
    
    try {
      let isValid = false;
      
      switch (apiName) {
        case 'claude':
          isValid = await this.testClaude();
          break;
        case 'openai':
          isValid = await this.testOpenAI();
          break;
        case 'notion':
          isValid = await this.testNotion();
          break;
      }
      
      testBtn.className = `test-btn ${isValid ? 'success' : 'error'}`;
      testBtn.textContent = isValid ? '✓' : '✗';
      
      setTimeout(() => {
        testBtn.className = 'test-btn';
        testBtn.textContent = originalText;
        testBtn.disabled = false;
      }, 2000);
      
    } catch (error) {
      console.error(`${apiName} test failed:`, error);
      testBtn.className = 'test-btn error';
      testBtn.textContent = '✗';
      
      setTimeout(() => {
        testBtn.className = 'test-btn';
        testBtn.textContent = originalText;
        testBtn.disabled = false;
      }, 2000);
    }
  }
  
  async testClaude() {
    const key = document.getElementById('claudeKey').value;
    if (!key) return false;
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 10,
        messages: [{ role: 'user', content: 'Hi' }]
      })
    });
    
    return response.ok;
  }
  
  async testOpenAI() {
    const key = document.getElementById('openaiKey').value;
    if (!key) return false;
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Hi' }],
        max_tokens: 5
      })
    });
    
    return response.ok;
  }
  
  async testNotion() {
    const key = document.getElementById('notionKey').value;
    if (!key) return false;
    
    const response = await fetch('https://api.notion.com/v1/users/me', {
      headers: {
        'Authorization': `Bearer ${key}`,
        'Notion-Version': '2022-06-28'
      }
    });
    
    return response.ok;
  }
  
  async executeFeature(action) {
    if (!this.isAuthenticated) {
      this.showStatus('Please connect to Google Drive first', 'error');
      return;
    }
    
    try {
      // Send message to content script to execute the feature
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      await chrome.tabs.sendMessage(tab.id, {
        action: action,
        apis: this.apis
      });
      
      this.showStatus(`Executing ${action}...`, 'info');
      window.close(); // Close popup after action
      
    } catch (error) {
      console.error('Feature execution failed:', error);
      this.showStatus('Feature execution failed', 'error');
    }
  }
  
  updateUI() {
    const authStatus = document.getElementById('authStatus');
    const authBtn = document.getElementById('authBtn');
    const disconnectBtn = document.getElementById('disconnectBtn');
    const features = document.getElementById('features');
    
    if (this.isAuthenticated) {
      authStatus.textContent = 'Connected ✓';
      authStatus.className = 'auth-status connected';
      authBtn.classList.add('hidden');
      disconnectBtn.classList.remove('hidden');
      features.style.display = 'block';
    } else {
      authStatus.textContent = 'Not connected';
      authStatus.className = 'auth-status';
      authBtn.classList.remove('hidden');
      disconnectBtn.classList.add('hidden');
      features.style.display = 'none';
    }
  }
  
  showStatus(message, type) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.className = `status ${type}`;
    
    if (type === 'success' || type === 'info') {
      setTimeout(() => {
        status.style.display = 'none';
      }, 3000);
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new AIDriveAssistant();
});
