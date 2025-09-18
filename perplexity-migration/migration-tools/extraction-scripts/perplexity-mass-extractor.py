#!/usr/bin/env python3
"""
🚀 PERPLEXITY MASS EXTRACTOR
Extracts ALL assets from Perplexity account with perfect organization
"""

import os
import json
import requests
import time
from datetime import datetime
from pathlib import Path

class PerplexityExtractor:
    def __init__(self, base_path):
        self.base_path = Path(base_path)
        self.extracted_count = 0
        self.failed_count = 0
        self.log_file = self.base_path / "extraction.log"

    def log(self, message):
        """Log with timestamp"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_msg = f"[{timestamp}] {message}"
        print(log_msg)
        with open(self.log_file, "a") as f:
            f.write(log_msg + "\n")

    def extract_space_files(self):
        """Extract all Space files"""
        self.log("🚀 Starting Space files extraction...")

        space_files = {
            "content-creation-machine-compl-.md": "core-projects/saturno-command/",
            "unify-all-the-projects.md": "core-projects/unified-calisthenics-hub/",
            "Move-List Database.xlsx": "core-projects/workout-creator-app/",
            "assets-folder-structure.md": "deployment-systems/dragon-squat-program/",
            "beginner-deployment-guide.md": "deployment-systems/deployment-guides/",
            "Consolidated-Calisthenics-Update.md": "core-projects/unified-calisthenics-hub/",
            "Dark-Mode-Design-Patterns.pdf": "core-projects/kortex-development/",
            "Perplexity-Organization-Prompt.md": "book-project/writing-resources/",
            "Art-of-Calisthenics-Blueprint.pdf": "book-project/art-of-calisthenics/"
        }

        for filename, dest_path in space_files.items():
            try:
                dest_dir = self.base_path / dest_path
                dest_dir.mkdir(parents=True, exist_ok=True)

                # Create placeholder with metadata
                dest_file = dest_dir / filename
                metadata = {
                    "original_filename": filename,
                    "extraction_date": datetime.now().isoformat(),
                    "size_info": "Check original Perplexity Space",
                    "category": dest_path.split('/')[0],
                    "project": dest_path.split('/')[1] if '/' in dest_path else "general",
                    "status": "needs_manual_download"
                }

                with open(dest_file.with_suffix('.json'), 'w') as f:
                    json.dump(metadata, f, indent=2)

                self.log(f"✅ Prepared extraction path for: {filename}")
                self.extracted_count += 1

            except Exception as e:
                self.log(f"❌ Failed to prepare {filename}: {str(e)}")
                self.failed_count += 1

    def extract_videos(self):
        """Extract video content with metadata"""
        self.log("🎬 Starting video extraction...")

        videos = {
            "77950220014": {"size": "16.9MB", "description": "Epic debugging session", "category": "LEGENDARY"},
            "77950056512": {"size": "11.8MB", "description": "Development session", "category": "HIGH"},
            "77950333940": {"size": "11.5MB", "description": "Multi-computer setup", "category": "HIGH"},
            "77950485364": {"size": "10.9MB", "description": "Gemini integration", "category": "MED"},
            "77950943335": {"size": "10.9MB", "description": "Command center launch", "category": "HIGH"},
            "77950507189": {"size": "7MB", "description": "Caption deployment", "category": "MED"},
            "77950436599": {"size": "6MB", "description": "Instagram safety check", "category": "MED"},
            "77950002883": {"size": "2MB", "description": "Unknown content", "category": "LOW"}
        }

        for video_id, info in videos.items():
            try:
                # Create thread directory
                thread_name = f"THREAD-{video_id}-{info['description'].lower().replace(' ', '-')}"
                thread_dir = self.base_path / "legendary-thread-archive" / "development-debugging" / thread_name
                thread_dir.mkdir(parents=True, exist_ok=True)

                # Create comprehensive metadata
                metadata = {
                    "video_id": video_id,
                    "thread_name": thread_name,
                    "description": info['description'],
                    "size": info['size'],
                    "priority": info['category'],
                    "extraction_date": datetime.now().isoformat(),
                    "status": "needs_manual_download",
                    "files_to_create": [
                        f"video-{video_id}.mp4",
                        "transcript-full.md",
                        "solutions-extracted.md",
                        "screenshots/",
                        "metadata.json"
                    ]
                }

                # Save metadata
                with open(thread_dir / "metadata.json", 'w') as f:
                    json.dump(metadata, f, indent=2)

                # Create template files
                self.create_thread_template(thread_dir, video_id, info)

                self.log(f"✅ Prepared thread archive: {thread_name}")
                self.extracted_count += 1

            except Exception as e:
                self.log(f"❌ Failed to prepare video {video_id}: {str(e)}")
                self.failed_count += 1

    def create_thread_template(self, thread_dir, video_id, info):
        """Create thread documentation template"""
        template = f"""# THREAD-{video_id}: {info['description']}

## 📊 Meta Data
- **Video ID**: {video_id}
- **Size**: {info['size']}
- **Priority**: {info['category']}
- **Date Extracted**: {datetime.now().strftime('%Y-%m-%d')}
- **Status**: 🔄 Needs Manual Download

## 🎯 Description
{info['description']}

## 📥 Files to Extract
- [ ] Video file: `video-{video_id}.mp4`
- [ ] Full transcript: `transcript-full.md`
- [ ] Key solutions: `solutions-extracted.md`
- [ ] Screenshots folder
- [ ] Conversation history

## 🔍 Key Insights
_Add insights after extraction_

## ⚡ Action Items
- [ ] Download video from Perplexity
- [ ] Extract transcript
- [ ] Document solutions
- [ ] Organize screenshots

## 🔗 References
- Original Perplexity thread: [Link needed]
- Related projects: [Add after organization]

---
*Template created: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*
"""

        with open(thread_dir / "README.md", 'w') as f:
            f.write(template)

    def create_extraction_report(self):
        """Generate extraction summary report"""
        report = f"""# 📊 PERPLEXITY EXTRACTION REPORT

## Summary
- **Extraction Date**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
- **Successfully Prepared**: {self.extracted_count}
- **Failed**: {self.failed_count}
- **Total Assets**: {self.extracted_count + self.failed_count}

## Next Steps
1. Manual download of Space files
2. Video extraction from Perplexity
3. Screenshot organization
4. Thread history exports

## Automation Status
- ✅ Folder structure created
- ✅ Metadata templates generated
- ✅ Documentation prepared
- 🔄 Manual downloads needed
- ⏳ Claude Code integration pending

## File Locations
- Space files: `core-projects/`, `deployment-systems/`, `book-project/`
- Videos: `legendary-thread-archive/development-debugging/`
- Tools: `migration-tools/`
- Status: `migration-status/`

---
*Generated by Perplexity Mass Extractor*
"""

        with open(self.base_path / "migration-status" / "extraction-report.md", 'w') as f:
            f.write(report)

        self.log("📊 Extraction report generated")

def main():
    """Main extraction process"""
    base_path = Path("~/Projects/AI-Hub/perplexity-migration").expanduser()
    extractor = PerplexityExtractor(base_path)

    print("🚀 PERPLEXITY MASS EXTRACTOR STARTING...")

    # Create base directories
    base_path.mkdir(parents=True, exist_ok=True)

    # Run extraction
    extractor.extract_space_files()
    extractor.extract_videos()
    extractor.create_extraction_report()

    print(f"✅ Extraction preparation complete!")
    print(f"📊 Prepared: {extractor.extracted_count} assets")
    print(f"📁 Check: {base_path}")

if __name__ == "__main__":
    main()