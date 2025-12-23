#!/usr/bin/env bash
set -euo pipefail

# Render both Quarto profiles (website + book) in one go.
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO_ROOT"

PATH="$HOME/.local/bin:$PATH"

echo "[1/2] Rendering website profile -> _site_website"
rm -rf _site_website _site_book
quarto render

echo "[2/2] Rendering book profile -> _site_book"
tmp_dir="$(mktemp -d)"
cleanup() {
  if [[ -d "${tmp_dir}/_site_website" ]] && [[ ! -d "_site_website" ]]; then
    mv "${tmp_dir}/_site_website" _site_website
  fi
  rmdir "${tmp_dir}" 2>/dev/null || true
}
trap cleanup EXIT

mv _site_website "${tmp_dir}/_site_website"
rm -rf _site_book
quarto render --profile book
cleanup
trap - EXIT

echo "Done. Outputs are in _site_website/ and _site_book/."
