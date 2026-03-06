<style>
  .institution-docs-plot-wrapper {
    border: 1px solid #dee2e6;
    border-radius: 0.5rem;
    padding: 1rem 1rem 0.75rem;
    margin: 1rem 0 1.5rem;
    background: #f8f9fa;
  }
  .institution-docs-plot-controls {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 0.9rem 1rem;
    margin-bottom: 1rem;
  }
  .institution-docs-plot-control .form-label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.35rem;
  }
  .institution-docs-preset-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }
  .institution-docs-checkbox-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.35rem 0.75rem;
    max-height: 10rem;
    overflow-y: auto;
    padding: 0.15rem 0.1rem;
    background: #fff;
    border: 1px solid #dee2e6;
    border-radius: 0.35rem;
  }
  .institution-docs-checkbox-item {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.92rem;
  }
  .institution-docs-plot-note {
    margin-top: 0.25rem;
    min-height: 0.5rem;
  }
</style>

<div class="institution-docs-plot-wrapper" id="institution-docs-plot-tool">
  <div class="institution-docs-plot-controls" id="institution-docs-plot-controls"></div>
  <div id="institution-docs-plot" style="width: 100%; min-height: 560px;"></div>
  <div class="institution-docs-plot-note" id="institution-docs-plot-note"></div>
</div>

<script>
  (function () {
    const existing = Array.from(document.scripts).some((script) =>
      /institution-docs-plot\.js(?:\?.*)?$/.test(script.getAttribute("src") || "")
    );
    if (existing) {
      return;
    }

    const loader = document.createElement("script");
    loader.defer = true;
    loader.src = (window.location.pathname || "").includes("/docs/")
      ? "assets/js/institution-docs-plot.js"
      : "docs/assets/js/institution-docs-plot.js";
    document.body.append(loader);
  })();
</script>
