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
run `quarto render` and deploy the `_site/` directory to GitHub Pages or your documentation host.

## Structure

- `_quarto.yml` – Project configuration, navigation, and HTML output settings.
- `index.qmd` – Landing page with usage instructions and document map.
- `docs/` – Section content for architecture, scoring logic, configuration, diagnostics, and appendices.
- `docs/assets/` – Placeholder for images (architecture diagrams, dashboards, etc.).

## Next Steps

- Replace the placeholder repository URL in `_quarto.yml` once the site lives in its own repo.
- Add real dashboards or diagrams to `docs/assets/` and embed them with Markdown.
- Integrate with CI to run `quarto render` and publish the site on merge to `main`.
