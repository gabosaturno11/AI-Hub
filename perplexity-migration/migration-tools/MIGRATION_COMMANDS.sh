#!/bin/bash

# 🚀 PERPLEXITY MIGRATION COMMANDS
# Add these to your ~/.zshrc for instant access

echo "🚀 Setting up Perplexity Migration Commands..."

# Migration path
export PERPLEXITY_MIGRATION="$HOME/Projects/AI-Hub/perplexity-migration"

# Core Commands
alias aimigrate='cd "$PERPLEXITY_MIGRATION"'
alias aiextract='cd "$PERPLEXITY_MIGRATION" && python3 migration-tools/extraction-scripts/perplexity-mass-extractor.py'
alias aiorganize='cd "$PERPLEXITY_MIGRATION" && echo "🎯 Organizing assets..." && find . -name "*.json" | wc -l && echo "metadata files created"'
alias aivalidate='cd "$PERPLEXITY_MIGRATION" && echo "✅ Validating migration..." && ls -la migration-status/'
alias aideploy='cd "$PERPLEXITY_MIGRATION" && echo "🚀 Ready for new account deployment"'

# Navigation Shortcuts
alias aibooks='cd "$PERPLEXITY_MIGRATION/book-project"'
alias aiprojects='cd "$PERPLEXITY_MIGRATION/core-projects"'
alias aithreads='cd "$PERPLEXITY_MIGRATION/legendary-thread-archive"'
alias aitools='cd "$PERPLEXITY_MIGRATION/migration-tools"'
alias aistatus='cd "$PERPLEXITY_MIGRATION/migration-status"'

# Quick Status
aimigration_status() {
    echo "📊 PERPLEXITY MIGRATION STATUS"
    echo "=============================="
    echo "📁 Base Path: $PERPLEXITY_MIGRATION"
    echo "📊 Folders Created: $(find "$PERPLEXITY_MIGRATION" -type d | wc -l)"
    echo "📄 Files Prepared: $(find "$PERPLEXITY_MIGRATION" -type f | wc -l)"
    echo "🎯 Projects: $(ls "$PERPLEXITY_MIGRATION/core-projects" 2>/dev/null | wc -l)"
    echo "🎬 Threads: $(ls "$PERPLEXITY_MIGRATION/legendary-thread-archive/development-debugging" 2>/dev/null | wc -l)"
    echo ""
    echo "⚡ Quick Commands:"
    echo "  aimigrate   - Go to migration folder"
    echo "  aiextract   - Run extraction script"
    echo "  aiorganize  - Organize content"
    echo "  aivalidate  - Check migration status"
    echo "  aithreads   - View thread archive"
    echo ""
}

# Installation message
echo "✅ Migration commands ready!"
echo ""
echo "🎯 Available Commands:"
echo "  aimigrate           - Navigate to migration"
echo "  aiextract           - Extract all assets"
echo "  aiorganize          - Organize content"
echo "  aivalidate          - Validate migration"
echo "  aimigration_status  - Full status report"
echo ""
echo "🚀 Start with: aimigrate"