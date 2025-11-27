/**
 * AI-Hub API Configuration
 *
 * This module handles API key management for Claude, Gemini, and OpenAI.
 *
 * USAGE:
 * - For Node.js backend: Uses process.env (requires dotenv)
 * - For browser frontend: Uses window.ENV_CONFIG (set via server/build process)
 *
 * SETUP:
 * 1. Copy .env.example to .env
 * 2. Add your actual API keys to .env
 * 3. Import this config where needed
 */

// Detect environment (Node.js vs Browser)
const isNode = typeof process !== 'undefined' && process.versions?.node;

/**
 * API Configuration Object
 * Stores API keys and model preferences
 */
const APIConfig = {
    // Claude (Anthropic)
    claude: {
        apiKey: null,
        baseUrl: 'https://api.anthropic.com',
        defaultModel: 'claude-sonnet-4-5-20250929',

        isConfigured() {
            return !!this.apiKey && this.apiKey !== 'your_claude_api_key_here';
        }
    },

    // Google Gemini
    gemini: {
        apiKey: null,
        baseUrl: 'https://generativelanguage.googleapis.com',
        defaultModel: 'gemini-1.5-pro',

        isConfigured() {
            return !!this.apiKey && this.apiKey !== 'your_gemini_api_key_here';
        }
    },

    // OpenAI
    openai: {
        apiKey: null,
        baseUrl: 'https://api.openai.com',
        defaultModel: 'gpt-4o',

        isConfigured() {
            return !!this.apiKey && this.apiKey !== 'your_openai_api_key_here';
        }
    },

    // Notion
    notion: {
        apiKey: null,
        databaseId: null,
        baseUrl: 'https://api.notion.com/v1',
        version: '2022-06-28',

        isConfigured() {
            return !!this.apiKey && this.apiKey !== 'your_notion_api_key_here';
        }
    },

    /**
     * Initialize configuration from environment
     * Call this at app startup
     */
    init() {
        if (isNode) {
            // Node.js environment - load from process.env
            // Note: Requires dotenv to be loaded first: require('dotenv').config()
            this.claude.apiKey = process.env.CLAUDE_API_KEY || null;
            this.claude.defaultModel = process.env.CLAUDE_MODEL || this.claude.defaultModel;

            this.gemini.apiKey = process.env.GEMINI_API_KEY || null;
            this.gemini.defaultModel = process.env.GEMINI_MODEL || this.gemini.defaultModel;

            this.openai.apiKey = process.env.OPENAI_API_KEY || null;
            this.openai.defaultModel = process.env.OPENAI_MODEL || this.openai.defaultModel;

            this.notion.apiKey = process.env.NOTION_API_KEY || null;
            this.notion.databaseId = process.env.NOTION_DATABASE_ID || null;
        } else if (typeof window !== 'undefined' && window.ENV_CONFIG) {
            // Browser environment - load from window.ENV_CONFIG
            // This should be set by your server or build process
            this.claude.apiKey = window.ENV_CONFIG.CLAUDE_API_KEY || null;
            this.gemini.apiKey = window.ENV_CONFIG.GEMINI_API_KEY || null;
            this.openai.apiKey = window.ENV_CONFIG.OPENAI_API_KEY || null;
            this.notion.apiKey = window.ENV_CONFIG.NOTION_API_KEY || null;
            this.notion.databaseId = window.ENV_CONFIG.NOTION_DATABASE_ID || null;
        }

        return this;
    },

    /**
     * Manually set API keys (useful for browser environments)
     * @param {Object} keys - Object containing API keys
     */
    setKeys(keys) {
        if (keys.claude) this.claude.apiKey = keys.claude;
        if (keys.gemini) this.gemini.apiKey = keys.gemini;
        if (keys.openai) this.openai.apiKey = keys.openai;
        if (keys.notion) this.notion.apiKey = keys.notion;
        if (keys.notionDatabaseId) this.notion.databaseId = keys.notionDatabaseId;
        return this;
    },

    /**
     * Get status of all API configurations
     * @returns {Object} Status of each API
     */
    getStatus() {
        return {
            claude: this.claude.isConfigured(),
            gemini: this.gemini.isConfigured(),
            openai: this.openai.isConfigured(),
            notion: this.notion.isConfigured(),
            anyConfigured: this.claude.isConfigured() || this.gemini.isConfigured() || this.openai.isConfigured() || this.notion.isConfigured()
        };
    },

    /**
     * Get headers for API requests
     * @param {string} provider - 'claude', 'gemini', 'openai', or 'notion'
     * @returns {Object} Headers object for fetch requests
     */
    getHeaders(provider) {
        const headers = {
            'Content-Type': 'application/json'
        };

        switch (provider) {
            case 'claude':
                headers['x-api-key'] = this.claude.apiKey;
                headers['anthropic-version'] = '2023-06-01';
                break;
            case 'gemini':
                // Gemini uses API key in URL query param, not header
                break;
            case 'openai':
                headers['Authorization'] = `Bearer ${this.openai.apiKey}`;
                break;
            case 'notion':
                headers['Authorization'] = `Bearer ${this.notion.apiKey}`;
                headers['Notion-Version'] = this.notion.version;
                break;
        }

        return headers;
    },

    /**
     * Validate that an API key looks valid (basic format check)
     * @param {string} provider - 'claude', 'gemini', 'openai', or 'notion'
     * @returns {boolean} Whether the key appears valid
     */
    validateKeyFormat(provider) {
        const key = this[provider]?.apiKey;
        if (!key || key.includes('your_') || key.includes('_here')) {
            return false;
        }

        // Basic format validation
        switch (provider) {
            case 'claude':
                return key.startsWith('sk-ant-');
            case 'gemini':
                return key.length > 20; // Gemini keys are typically 39 chars
            case 'openai':
                return key.startsWith('sk-');
            case 'notion':
                return key.startsWith('secret_') || key.startsWith('ntn_');
            default:
                return key.length > 10;
        }
    }
};

/**
 * Notion API Helper
 * Provides easy-to-use methods for common Notion operations
 */
const NotionHelper = {
    /**
     * Query a Notion database
     * @param {Object} filter - Optional filter object
     * @param {Array} sorts - Optional sort array
     * @returns {Promise<Object>} Database query results
     */
    async queryDatabase(filter = {}, sorts = []) {
        if (!APIConfig.notion.isConfigured()) {
            throw new Error('Notion API not configured. Add NOTION_API_KEY to your .env file.');
        }

        const response = await fetch(
            `${APIConfig.notion.baseUrl}/databases/${APIConfig.notion.databaseId}/query`,
            {
                method: 'POST',
                headers: APIConfig.getHeaders('notion'),
                body: JSON.stringify({ filter, sorts })
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Notion API error: ${error.message || response.statusText}`);
        }

        return response.json();
    },

    /**
     * Get a page from Notion
     * @param {string} pageId - The page ID
     * @returns {Promise<Object>} Page data
     */
    async getPage(pageId) {
        if (!APIConfig.notion.isConfigured()) {
            throw new Error('Notion API not configured. Add NOTION_API_KEY to your .env file.');
        }

        const response = await fetch(
            `${APIConfig.notion.baseUrl}/pages/${pageId}`,
            {
                method: 'GET',
                headers: APIConfig.getHeaders('notion')
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Notion API error: ${error.message || response.statusText}`);
        }

        return response.json();
    },

    /**
     * Create a new page in Notion
     * @param {Object} properties - Page properties
     * @param {Array} children - Optional content blocks
     * @returns {Promise<Object>} Created page data
     */
    async createPage(properties, children = []) {
        if (!APIConfig.notion.isConfigured()) {
            throw new Error('Notion API not configured. Add NOTION_API_KEY to your .env file.');
        }

        const body = {
            parent: { database_id: APIConfig.notion.databaseId },
            properties
        };

        if (children.length > 0) {
            body.children = children;
        }

        const response = await fetch(
            `${APIConfig.notion.baseUrl}/pages`,
            {
                method: 'POST',
                headers: APIConfig.getHeaders('notion'),
                body: JSON.stringify(body)
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Notion API error: ${error.message || response.statusText}`);
        }

        return response.json();
    },

    /**
     * Update a page in Notion
     * @param {string} pageId - The page ID to update
     * @param {Object} properties - Properties to update
     * @returns {Promise<Object>} Updated page data
     */
    async updatePage(pageId, properties) {
        if (!APIConfig.notion.isConfigured()) {
            throw new Error('Notion API not configured. Add NOTION_API_KEY to your .env file.');
        }

        const response = await fetch(
            `${APIConfig.notion.baseUrl}/pages/${pageId}`,
            {
                method: 'PATCH',
                headers: APIConfig.getHeaders('notion'),
                body: JSON.stringify({ properties })
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Notion API error: ${error.message || response.statusText}`);
        }

        return response.json();
    }
};

// Auto-initialize on load
APIConfig.init();

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    // Node.js / CommonJS
    module.exports = { APIConfig, NotionHelper };
} else if (typeof window !== 'undefined') {
    // Browser global
    window.APIConfig = APIConfig;
    window.NotionHelper = NotionHelper;
}
