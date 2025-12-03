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
run `quarto render` (website) or `quarto render --profile book` and deploy `_site_website/` and
`_site_book/` as needed.

## Dual Builds (Website + Book)

This repo now renders two versions from the same `.qmd` files using Quarto profiles:

- Website (default): `quarto render` → outputs to `_site_website/`.
- Book: `quarto render --profile book` → outputs to `_site_book/` with numbered sections and floating sidebar.

To host both on GitHub Pages under sibling paths (e.g., `/website/` and `/book/`), publish a branch with:

```
gh-pages/
  website/index.html  # contents of _site_website
  book/index.html     # contents of _site_book
```

Preview either locally with `quarto preview` or `quarto preview --profile book`.

## Structure

- `_quarto.yml` – Project configuration, navigation, and HTML output settings.
- `_quarto-book.yml` – Book-profile overrides (numbering, sidebar, output dir).
- `index.qmd` – Landing page with usage instructions and document map.
- `docs/` – Section content for architecture, scoring logic, configuration, diagnostics, and appendices.
- `docs/assets/` – Images and data assets (architecture diagrams, dashboards, legacy 4PN maps).

## Next Steps

- Replace the placeholder repository URL in `_quarto.yml` once the site lives in its own repo.
- Add real dashboards or diagrams to `docs/assets/` and embed them with Markdown.
- Integrate with CI to run `quarto render` and publish the site on merge to `main`.
