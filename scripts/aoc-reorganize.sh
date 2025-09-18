#!/usr/bin/env bash
set -euo pipefail

ROOT="The-Art-of-Calisthenics__MASTER-VAULT"

# --- dirs ---
DIRS=(
"00_ADMIN"
"00_ADMIN/LINKS"
"01_TOC"
"02_MANUSCRIPT/Part-01_Start-Here/P1C01_What-How-Why-Who/Figures"
"02_MANUSCRIPT/Part-01_Start-Here/P1C01_What-How-Why-Who/DNA"
"02_MANUSCRIPT/Part-01_Start-Here/P1C02_Getting-Started/Figures"
"02_MANUSCRIPT/Part-01_Start-Here/P1C02_Getting-Started/DNA"
"02_MANUSCRIPT/Part-02_The-Art"
"02_MANUSCRIPT/Part-03_Mastering"
"02_MANUSCRIPT/Part-04_Road-to-Mastery"
"02_MANUSCRIPT/Part-05_Program-Design"
"02_MANUSCRIPT/Part-06_Endless-Journey"
"02_MANUSCRIPT/Part-07_Legacy"
"03_MOVEMENT-DNA"
"03_MOVEMENT-DNA/Taxonomy"
"03_MOVEMENT-DNA/Skill-Edges"
"03_MOVEMENT-DNA/Exports"
"04_RESEARCH"
"04_RESEARCH/Papers"
"04_RESEARCH/Notes"
"04_RESEARCH/Citations"
"04_RESEARCH/Evidence-Snapshots"
"05_ASSETS"
"05_ASSETS/Visuals"
"05_ASSETS/Figures-Raw"
"05_ASSETS/Figures-Edited"
"05_ASSETS/Icons-Fonts-Brand"
"05_ASSETS/Captions"
"06_PROGRAMS"
"06_PROGRAMS/Templates"
"06_PROGRAMS/Hybrids"
"06_PROGRAMS/JSON"
"06_PROGRAMS/QA"
"07_INTERACTIVE"
"07_INTERACTIVE/toc-creator"
"07_INTERACTIVE/galaxy-visualizer"
"07_INTERACTIVE/exports_pdf"
"07_INTERACTIVE/web-previews"
"08_VOICE-&-STYLE"
"08_VOICE-&-STYLE/Examples"
"09_AGENTS-&-PROMPTS"
"09_AGENTS-&-PROMPTS/Claude/session-notes"
"09_AGENTS-&-PROMPTS/GPT"
"09_AGENTS-&-PROMPTS/Perplexity"
"09_AGENTS-&-PROMPTS/Pipelines"
"10_TOOLING"
"10_TOOLING/scripts"
"10_TOOLING/token_economics"
"11_LEGAL-&-RIGHTS"
"11_LEGAL-&-RIGHTS/Image-Releases"
"12_DELIVERABLES"
"99_ARCHIVE/old_versions"
)

for d in "${DIRS[@]}"; do mkdir -p "$ROOT/$d"; done

# --- seed files ---
cat > "$ROOT/00_ADMIN/00_README-FIRST.md" <<'MD'
# Master Vault — How to use
- **Single source of truth**: `01_TOC/TOC_MASTER.json`
- Chapter work lives in `02_MANUSCRIPT/<Part>/<Chapter>/P#C##_Packet.md`
- Movement DNA (fields-only) in `03_MOVEMENT-DNA/`
- Research links in `04_RESEARCH/Research_Link_Matrix.csv`
- Publisher exports staged in `12_DELIVERABLES/`
MD

cat > "$ROOT/01_TOC/TOC_MASTER.json" <<'JSON'
{
  "title": "The Art of Calisthenics",
  "parts": [
    { "id": "P1", "name": "Start Here", "chapters": [
      { "id": "P1C01", "title": "What, How, Why & Who" },
      { "id": "P1C02", "title": "Getting Started" }
    ]},
    { "id": "P2", "name": "The Art of Calisthenics", "chapters": []},
    { "id": "P3", "name": "Mastering Calisthenics", "chapters": []},
    { "id": "P4", "name": "Road to Mastery", "chapters": []},
    { "id": "P5", "name": "Building Your Own Program", "chapters": []},
    { "id": "P6", "name": "The Endless Journey", "chapters": []},
    { "id": "P7", "name": "You Are Now a Master", "chapters": []}
  ]
}
JSON

cat > "$ROOT/01_TOC/TOC_v4_Abstracts.md" <<'MD'
# TOC v4 — Abstracts (deliverable)
- P1C01 — Abstract: …
- P1C02 — Abstract: …
MD

cat > "$ROOT/02_MANUSCRIPT/Part-01_Start-Here/P1C01_What-How-Why-Who/P1C01_Packet.md" <<'MD'
# P1C01 — Packet (Assembly Only)
## Scope
## Research (RIDs)
## Movement DNA callouts
## Figures (placeholders)
MD

cat > "$ROOT/03_MOVEMENT-DNA/DNA_Schema.yml" <<'YML'
fields:
  body_split: [Upper, Lower, Core, Full Body]
  pattern: [Push, Pull, Hinge, Squat, Carry, Rotate, Anti-Rotate, Gait]
  mechanic:
    upper: [Straight-Arm, Bent-Arm]
    lower: [Knee-Dominant, Hip-Dominant]
  direction: [Vertical, Horizontal]
  limbs: [Unilateral, Bilateral]
  contraction: [Concentric, Eccentric, Isometric, Mixed]
  equipment: [Floor, Bar, Rings, Parallettes, Dumbbell, Kettlebell, Other]
YML

cat > "$ROOT/03_MOVEMENT-DNA/Taxonomy/Movement-Patterns.csv" <<'CSV'
pattern,notes
Push,
Pull,
Hinge,
Squat,
Carry,
Rotate,
Anti-Rotate,
Gait,
CSV

cat > "$ROOT/04_RESEARCH/Research_Link_Matrix.csv" <<'CSV'
RID,Title,Source,URL,MapsToChapterID,Note,Status
R01,Procrastination Science,,,P1C01,,INTAKE
R02,Movement as First Language,,,P0-Intro,,INTAKE
CSV

cat > "$ROOT/05_ASSETS/Visuals/TOC_Mindmap.mmd" <<'MM'
flowchart TB
  P1["Part 1: Start Here"] --> P2["Part 2: The Art"]
  P2 --> P3["Part 3: Mastering"]
  P3 --> P4["Part 4: Road to Mastery"]
  P4 --> P5["Part 5: Program Design"]
  P5 --> P6["Part 6: Endless Journey"]
  P6 --> P7["Part 7: Master"]
MM

cat > "$ROOT/08_VOICE-&-STYLE/Voice-DNA.md" <<'MD'
# Voice DNA (Gabo)
- "More action, less knowledge."
- "Push the ground away." / "Protract & depress."
- "Direction over speed."
- Honest standards; no ego lifts; film yourself.
MD

cat > "$ROOT/09_AGENTS-&-PROMPTS/Research-Assembly-Mode.md" <<'MD'
# Research Assembly Mode (Guardrails)
- Prevent creation; assemble only.
- Catch redundancy; link research to chapters.
- Time guard: 45 min sprints.
MD

cat > "$ROOT/10_TOOLING/scripts/export_vb.sh" <<'SH'
#!/usr/bin/env bash
set -euo pipefail
DATE=$(date +%F)
SRC="The-Art-of-Calisthenics__MASTER-VAULT"
DEST="$SRC/12_DELIVERABLES/VB_Package_($DATE)"
mkdir -p "$DEST"
cp "$SRC/01_TOC/TOC_v4_Abstracts.md" "$DEST/03_TOC_v4_Abstracts.md"
# add your 01_Introductory_Letter.docx, 02_Executive_Summary.pdf, etc. before zipping
echo "Stage your PDFs/DOCs in $DEST then zip that folder for VB."
SH
chmod +x "$ROOT/10_TOOLING/scripts/export_vb.sh"

cat > "$ROOT/12_DELIVERABLES/Readme_for_VB.txt" <<'TXT'
This folder holds clean, publisher-facing exports only.
TXT

echo "✅ Scaffold created at: $ROOT"