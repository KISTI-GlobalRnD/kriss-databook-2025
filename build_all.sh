#!/usr/bin/env bash
set -euo pipefail

# Render the Quarto website output in one go.
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO_ROOT"

PATH="$HOME/.local/bin:$PATH"

echo "[1/1] Rendering website output -> _site_website"
rm -rf _site_website
quarto render

echo "Done. Output is in _site_website/."
