import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Create AI-Hub webview panel
    const aiHubPanel = vscode.window.createWebviewPanel(
        'aiHub',
        '🤖 AI-Hub Control Center',
        vscode.ViewColumn.Beside,
        {
            enableScripts: true,
            retainContextWhenHidden: true
        }
    );

    // Set the webview content to the unified AI-Hub
    aiHubPanel.webview.html = getWebviewContent();

    // Register commands for sidebar
    const commands = [
        vscode.commands.registerCommand('aiHub.openHub', () => {
            aiHubPanel.reveal();
        }),
        vscode.commands.registerCommand('aiHub.openFunctional', () => {
            vscode.commands.executeCommand('vscode.open', vscode.Uri.parse('https://gabosaturno11.github.io/AI-Hub/frontend/unified-ai-hub.html'));
        }),
        vscode.commands.registerCommand('aiHub.sync', async () => {
            const terminal = vscode.window.createTerminal('AI-Hub Sync');
            terminal.sendText('cd /Users/Gabosaturno/Projects/AI-Hub && ./scripts/claude-connect.sh sync');
            terminal.show();
            vscode.window.showInformationMessage('🔄 Syncing AI-Hub to GitHub...');
        }),
        vscode.commands.registerCommand('aiHub.status', async () => {
            const terminal = vscode.window.createTerminal('AI-Hub Status');
            terminal.sendText('cd /Users/Gabosaturno/Projects/AI-Hub && ./scripts/claude-connect.sh status');
            terminal.show();
            vscode.window.showInformationMessage('📊 Checking AI-Hub status...');
        })
    ];
    
    context.subscriptions.push(...commands);
}

function getWebviewContent(): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>🤖 AI-Hub Control Center</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                margin: 0;
                padding: 20px;
                min-height: 100vh;
            }
            .container {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                padding: 40px;
                text-align: center;
                max-width: 800px;
                margin: 0 auto;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            }
            h1 {
                font-size: 48px;
                margin-bottom: 20px;
                color: #2d3748;
            }
            p {
                font-size: 18px;
                color: #718096;
                margin-bottom: 30px;
            }
            .btn {
                display: inline-block;
                padding: 15px 30px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-decoration: none;
                border-radius: 10px;
                font-weight: 600;
                font-size: 16px;
                margin: 10px;
                transition: transform 0.2s ease;
                border: none;
                cursor: pointer;
            }
            .btn:hover {
                transform: translateY(-2px);
            }
            .status {
                margin-top: 30px;
                padding: 15px;
                background: #c6f6d5;
                color: #22543d;
                border-radius: 10px;
                font-weight: 500;
            }
            .grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-top: 30px;
            }
            .grid-item {
                background: #f7fafc;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
            }
            .grid-item h3 {
                color: #2d3748;
                margin-bottom: 10px;
            }
            .grid-item p {
                color: #718096;
                font-size: 14px;
                margin: 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🤖 AI-Hub</h1>
            <p>Unified Control Center - Claude Code Integration</p>
            
            <div class="grid">
                <div class="grid-item">
                    <h3>⚡ Functional Interface</h3>
                    <p>API integration with OpenAI, Claude, Gemini</p>
                    <button class="btn" onclick="openFunctional()">Open</button>
                </div>
                <div class="grid-item">
                    <h3>🏋️ Movement Studio</h3>
                    <p>Drag-and-drop workout builder</p>
                    <button class="btn" onclick="openMovement()">Open</button>
                </div>
                <div class="grid-item">
                    <h3>📖 Cortex Control</h3>
                    <p>Book writing and chapter generation</p>
                    <button class="btn" onclick="openCortex()">Open</button>
                </div>
                <div class="grid-item">
                    <h3>📊 Working Dashboard</h3>
                    <p>Main hub dashboard</p>
                    <button class="btn" onclick="openDashboard()">Open</button>
                </div>
            </div>
            
            <div style="margin-top: 30px;">
                <button class="btn" onclick="syncHub()">🔄 Sync to GitHub</button>
                <button class="btn" onclick="checkStatus()">📊 Check Status</button>
            </div>
            
            <div class="status">
                ✅ Claude Code Integration Active
            </div>
        </div>

        <script>
            const vscode = acquireVsCodeApi();
            
            function openFunctional() {
                vscode.postMessage({ command: 'openFunctional' });
            }
            
            function openMovement() {
                vscode.postMessage({ command: 'openMovement' });
            }
            
            function openCortex() {
                vscode.postMessage({ command: 'openCortex' });
            }
            
            function openDashboard() {
                vscode.postMessage({ command: 'openDashboard' });
            }
            
            function syncHub() {
                vscode.postMessage({ command: 'sync' });
            }
            
            function checkStatus() {
                vscode.postMessage({ command: 'status' });
            }
        </script>
    </body>
    </html>
    `;
}

export function deactivate() {}