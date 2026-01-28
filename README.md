# Final Report Quarto Site

This directory hosts the Quarto project for the KRISS keyword extraction final report. It can be
promoted to a standalone repository or rendered in place during documentation reviews.

## Quickstart (Book Only)

Install the Quarto CLI from <https://quarto.org/docs/get-started/>. Then run:

```bash
cd final_report_site
quarto preview --profile book
```

Open `http://127.0.0.1:4200/` (default) to view the book with live reload. To produce a static bundle,
run `quarto render --profile book` and deploy `_site_book/`.

## Deployment Model (Book-Only)

The live GitHub Pages deployment uses **book-only output** from the same `.qmd` sources:

- Book: `quarto render --profile book` → outputs to `_site_book/` with numbered sections, floating sidebar,
  and the interactive tools included.

The published branch is expected to have the book output at the repository root (no `/book/` path):

```
gh-pages/
  index.html          # contents of _site_book
```

The legacy website profile is retained only for reference and is not deployed.

## Structure

- `_quarto.yml` – Project configuration, navigation, and HTML output settings.
- `_quarto-book.yml` – Book-profile overrides (numbering, sidebar, output dir).
- `index.qmd` – Landing page with usage instructions and document map.
- `docs/` – Section content for architecture, scoring logic, configuration, diagnostics, and appendices.
- `docs/assets/` – Images and data assets (architecture diagrams, dashboards, legacy 4PN maps).
- `web_*.qmd` – Legacy website wrappers (kept for backward compatibility; not used in current deployment).

## Notes

- The website output (`_site_website/`) is no longer published; use the book profile for all updates.
- If the website variant is revived in the future, update `_quarto.yml` and reinstate a dual-deploy workflow.

## Print / Editor Handoffs

- DOCX/HWPX 변환, 머지, 검토용 PDF 생성 워크플로는 `final_report_site/print/README.md` 참고.
