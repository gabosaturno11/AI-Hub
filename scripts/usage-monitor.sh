#!/bin/bash
# Monitor AI usage and costs
LOG_FILE="~/Projects/AI-Hub/logs/usage.log"
DATE=$(date)

# Log OpenAI API usage
echo "$DATE - OpenAI API call logged" >> $LOG_FILE

# System resource check
echo "$DATE - CPU: $(top -l 1 | grep "CPU usage" | awk '{print $3}')" >> $LOG_FILE
echo "$DATE - Memory: $(memory_pressure | head -1)" >> $LOG_FILE

# Hub activity
echo "$DATE - Hub accessed" >> $LOG_FILE
