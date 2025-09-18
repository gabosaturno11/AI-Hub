#!/bin/bash
echo "🔄 SYNC STATUS REPORT"
echo "===================="
echo ""
echo "📍 Current Computer: $(hostname | cut -d'.' -f1)"
echo ""
echo "📊 All Computers Status:"
for file in "$HOME/Library/Mobile Documents/com~apple~CloudDocs/AI-Sync-Status"/*.json; do
    if [ -f "$file" ]; then
        computer=$(basename "$file" .json)
        last_sync=$(grep last_sync "$file" | cut -d'"' -f4)
        echo "  • $computer: $last_sync"
    fi
done
echo ""
echo "📁 Project Status:"
cd "$HOME/Projects/AI-Hub" 2>/dev/null && git status --short || echo "No repo found"
