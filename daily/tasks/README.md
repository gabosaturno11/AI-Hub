# 📅 Daily Tasks

## How to Use
1. Create a new file for each day: `2024-09-17.md`
2. Use the template below
3. Sync at end of day with `aipush`

## Daily Template

```markdown
# Tasks for [DATE]

## 🎯 Priority (Must do)
- [ ] Task 1
- [ ] Task 2

## 📋 Regular (Should do)
- [ ] Task 3
- [ ] Task 4

## 💡 Ideas (Could do)
- [ ] Task 5

## ✅ Completed
- [x] Move completed tasks here

## 📝 Notes
- Any observations from today

---
*Updated from: [COMPUTER_NAME]*
```

## Quick Commands
- New day: `echo "# Tasks for $(date +%Y-%m-%d)" > daily/tasks/$(date +%Y-%m-%d).md`
- Open today: `open daily/tasks/$(date +%Y-%m-%d).md`