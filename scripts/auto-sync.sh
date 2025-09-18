#!/bin/bash
# Auto-sync AI Hub to iCloud every hour
rsync -avz ~/Projects/AI-Hub/ ~/Library/Mobile\ Documents/com~apple~CloudDocs/AI-Hub/
echo "$(date): AI Hub synced to iCloud" >> ~/Projects/AI-Hub/logs/sync.log
