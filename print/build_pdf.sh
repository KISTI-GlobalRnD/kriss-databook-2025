#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

PATH="$HOME/.local/bin:$PATH"

rm -rf _site_pdf
mkdir -p _site_pdf

quarto render --profile pdf --to pdf

# Quarto may emit PDFs to either _site_pdf/ or the project root depending on version/options.
if [[ -f "_site_pdf/kriss_databook_print.pdf.pdf" ]]; then
  mv "_site_pdf/kriss_databook_print.pdf.pdf" "_site_pdf/kriss_databook_print.pdf"
fi

if [[ -f "index.pdf" ]]; then
  for ext in aux log pdf tex toc out; do
    if [[ -f "index.${ext}" ]]; then
      mv "index.${ext}" "_site_pdf/index.${ext}"
    fi
  done
  if [[ -f "_site_pdf/index.pdf" ]]; then
    mv "_site_pdf/index.pdf" "_site_pdf/kriss_databook_print.pdf"
  fi
fi

echo "Done. PDF output: _site_pdf/kriss_databook_print.pdf"
