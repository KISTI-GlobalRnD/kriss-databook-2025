#!/usr/bin/env bash
set -euo pipefail

# Render both Quarto profiles (website + book) in one go.
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO_ROOT"

echo "[1/2] Rendering website profile -> _site_website"
PATH="$HOME/.local/bin:$PATH" quarto render

echo "[2/2] Rendering book profile -> _site_book"
PATH="$HOME/.local/bin:$PATH" quarto render --profile book

echo "Done. Outputs are in _site_website/ and _site_book/."
