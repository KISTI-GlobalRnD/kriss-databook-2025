#!/usr/bin/env bash
set -euo pipefail

# Render the Quarto book output in one go.
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO_ROOT"

PATH="$HOME/.local/bin:$PATH"

echo "[1/1] Rendering book output -> _site_book"
rm -rf _site_book
quarto render

echo "Done. Output is in _site_book/."
