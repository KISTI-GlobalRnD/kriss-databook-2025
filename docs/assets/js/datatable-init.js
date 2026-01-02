(function () {
  function resolveDataTableConstructor() {
    if (window.simpleDatatables && window.simpleDatatables.DataTable) {
      return window.simpleDatatables.DataTable;
    }
    if (window.DataTable) {
      return window.DataTable;
    }
    return null;
  }

  function initDatatables() {
    const DataTable = resolveDataTableConstructor();
    if (!DataTable) return;

    document.querySelectorAll("table.datatable").forEach((table) => {
      if (table.dataset.datatableInitialized === "true") return;
      table.dataset.datatableInitialized = "true";

      new DataTable(table, {
        perPage: 10,
        fixedHeight: true,
        labels: {
          placeholder: "검색",
          perPage: "{select} 행",
          noRows: "표에 데이터가 없습니다",
          info: "{start}–{end} / {rows} 행",
        },
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDatatables);
  } else {
    initDatatables();
  }
})();

