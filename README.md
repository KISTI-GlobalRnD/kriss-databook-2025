# Final Report Quarto Site

This directory hosts the Quarto project for the KRISS keyword extraction final report. It can be
promoted to a standalone repository or rendered in place during documentation reviews.

## Quickstart

Install the Quarto CLI from <https://quarto.org/docs/get-started/>. Then run:

```bash
cd final_report_site
quarto preview
```

Open `http://127.0.0.1:4200/` (default) to view the site with live reload. To produce a static bundle,
run `quarto render` and deploy `_site_book/`.

## Deployment Model

GitHub Pages publishes the Quarto book output rendered from the same `.qmd` sources.

The published branch is expected to have the book output at the repository root (no `/book/` path):

```
gh-pages/
  index.html          # contents of _site_book
```

The legacy website variant has been removed; the current configuration maintains a single build.

## Structure

- `_quarto.yml` – Project configuration, navigation, and HTML output settings.
- `_quarto-pdf.yml` – Print/PDF profile for editor handoff.
- `index.qmd` – Landing page with usage instructions and document map.
- `docs/` – Section content for architecture, scoring logic, configuration, diagnostics, and appendices.
- `docs/assets/` – Images and data assets (architecture diagrams, dashboards, legacy 4PN maps).

## Notes

- If a website variant is needed again, introduce a separate profile and deployment path.

## Print / Editor Handoffs

- DOCX/HWPX 변환, 머지, 검토용 PDF 생성 워크플로는 `final_report_site/print/README.md` 참고.
