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

  function countRowColumns(row) {
    return Array.from(row.cells).reduce((total, cell) => {
      const span = parseInt(cell.getAttribute("colspan"), 10);
      return total + (Number.isFinite(span) && span > 0 ? span : 1);
    }, 0);
  }

  function getColumnCount(table) {
    let maxColumns = 0;
    if (table.tHead && table.tHead.rows.length) {
      Array.from(table.tHead.rows).forEach((row) => {
        maxColumns = Math.max(maxColumns, countRowColumns(row));
      });
    }
    if (!maxColumns && table.tBodies.length) {
      const firstRow = table.tBodies[0].rows[0];
      if (firstRow) {
        maxColumns = countRowColumns(firstRow);
      }
    }
    return maxColumns;
  }

  function ensureTableHeader(table) {
    if (table.tHead && table.tHead.rows.length) {
      return;
    }

    const tbody = table.tBodies[0];
    if (!tbody || !tbody.rows.length) {
      return;
    }

    const columnCount = getColumnCount(table);
    let rows = Array.from(tbody.rows);

    const firstRow = rows[0];
    if (rows.length > 1 && firstRow) {
      const cells = Array.from(firstRow.cells);
      const cell = cells[0];
      const span = cell ? parseInt(cell.getAttribute("colspan"), 10) : NaN;
      const text = cell ? (cell.textContent || "").trim() : "";
      const isCaptionRow =
        cells.length === 1 &&
        ((Number.isFinite(span) && span >= columnCount && columnCount > 1) ||
          /표|table/i.test(text));

      if (isCaptionRow) {
        if (!table.caption) {
          const caption = table.createCaption();
          caption.textContent = text;
        }
        firstRow.remove();
        rows = Array.from(tbody.rows);
      }
    }

    const headerRow = rows[0];
    if (!headerRow) {
      return;
    }

    const thead = table.createTHead();
    thead.appendChild(headerRow);

    Array.from(thead.rows[0].cells).forEach((cell) => {
      if (cell.tagName.toLowerCase() !== "td") {
        return;
      }
      const th = document.createElement("th");
      Array.from(cell.attributes).forEach((attr) => th.setAttribute(attr.name, attr.value));
      th.innerHTML = cell.innerHTML;
      cell.replaceWith(th);
    });
  }

  function initDatatables() {
    const DataTable = resolveDataTableConstructor();
    if (!DataTable) return;

    document.querySelectorAll("table").forEach((table) => {
      const shouldInit =
        table.classList.contains("datatable") || getColumnCount(table) >= 10;
      if (!shouldInit) return;
      if (table.dataset.datatableInitialized === "true") return;
      table.dataset.datatableInitialized = "true";

      ensureTableHeader(table);

      new DataTable(table, {
        perPage: 10,
        fixedHeight: true,
        sortable: false,
        labels: {
          placeholder: "검색",
          perPage: "행",
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
