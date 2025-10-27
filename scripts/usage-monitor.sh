#!/usr/bin/env bash
# Monitor AI usage and costs (Linux-compatible)
set -euo pipefail

LOG_FILE="$HOME/Projects/AI-Hub/logs/usage.log"
DATE=$(date)

# Ensure log directory exists
mkdir -p "$(dirname "$LOG_FILE")"

# Log OpenAI API usage
echo "$DATE - OpenAI API call logged" >> "$LOG_FILE"

# System resource check (Linux)
CPU_LINE=$(top -bn1 | grep "%Cpu(s)" || true)
if [[ -n "$CPU_LINE" ]]; then
  echo "$DATE - CPU: $CPU_LINE" >> "$LOG_FILE"
else
  # Fallback: whole top header
  echo "$DATE - CPU: $(top -bn1 | head -n 5 | tr "\n" ' ')" >> "$LOG_FILE"
fi

MEM_LINE=$(free -h | awk '/Mem:/ {print $3"/"$2" used"}')
echo "$DATE - Memory: $MEM_LINE" >> "$LOG_FILE"

# Hub activity
echo "$DATE - Hub accessed" >> "$LOG_FILE"
