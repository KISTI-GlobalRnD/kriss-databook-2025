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
run `quarto render` and deploy `_site_website/`.

## Deployment Model

GitHub Pages publishes the Quarto output rendered from the same `.qmd` sources.

The published branch is expected to have the website output at the repository root:

```
gh-pages/
  index.html          # contents of _site_website
```

### Final Output (Current)

- The final deliverable is the **website build** that embeds the full databook content.
- `web_home.qmd` serves as the landing page (summary removed).
- `web_index.qmd` serves as the preface (summary included).
- The former book-style output is not used for deployment.

### Current (Manual) Deployment

1) Render locally:
   ```bash
   cd final_report_site
   quarto render
   ```
2) Copy the output into the gh-pages worktree and push:
   ```bash
   rsync -a --delete --exclude='.git' _site_website/ ../final_report_site_ghpages/
   git -C ../final_report_site_ghpages add -A
   git -C ../final_report_site_ghpages commit -m "Deploy site"
   git -C ../final_report_site_ghpages push origin gh-pages
   ```

### CI Deployment (GitHub Actions)

GitHub Actions builds and publishes `gh-pages` automatically on `main` updates.
Workflow: `.github/workflows/deploy.yml`

- It checks out the repo.
- Installs Quarto.
- Runs `quarto render` to generate `_site_website/`.
- Publishes `_site_website/` to the `gh-pages` branch root.

## Structure

- `_quarto.yml` – Project configuration, navigation, and HTML output settings.
- `_quarto-pdf.yml` – Print/PDF profile for editor handoff.
- `index.qmd` – Landing page with usage instructions and document map.
- `docs/` – Section content for architecture, scoring logic, configuration, diagnostics, and appendices.
- `docs/assets/` – Images and data assets (architecture diagrams, dashboards, legacy 4PN maps).

## Notes

- If a book-style variant is needed, introduce a separate profile and deployment path.

## Print / Editor Handoffs

- DOCX/HWPX 변환, 머지, 검토용 PDF 생성 워크플로는 `final_report_site/print/README.md` 참고.
