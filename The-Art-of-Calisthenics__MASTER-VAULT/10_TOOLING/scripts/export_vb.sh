#!/usr/bin/env bash
set -euo pipefail
DATE=$(date +%F)
SRC="The-Art-of-Calisthenics__MASTER-VAULT"
DEST="$SRC/12_DELIVERABLES/VB_Package_($DATE)"
mkdir -p "$DEST"
cp "$SRC/01_TOC/TOC_v4_Abstracts.md" "$DEST/03_TOC_v4_Abstracts.md"
# add your 01_Introductory_Letter.docx, 02_Executive_Summary.pdf, etc. before zipping
echo "Stage your PDFs/DOCs in $DEST then zip that folder for VB."
