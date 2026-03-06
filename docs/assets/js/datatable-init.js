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

      const hasCustomFilters = table.classList.contains("datatable-filtered");
      const filterConfig = hasCustomFilters ? extractFilterConfig(table) : null;
      const columnSettings = hasCustomFilters ? inferColumnSettings(table) : [];

      const dataTable = new DataTable(table, {
        perPage: 10,
        fixedHeight: !hasCustomFilters,
        searchable: !hasCustomFilters,
        sortable: hasCustomFilters,
        columns: columnSettings,
        labels: {
          placeholder: "검색",
          perPage: "행",
          noRows: "표에 데이터가 없습니다",
          info: "{start}–{end} / {rows} 행",
        },
      });

      if (hasCustomFilters && filterConfig) {
        attachCustomFilters(dataTable, filterConfig);
      }
    });
  }

  function getCellText(cell) {
    return (cell?.textContent || "").trim();
  }

  function getHeadingText(heading) {
    if (typeof heading === "string") {
      return heading.trim();
    }
    if (heading && typeof heading.text === "string") {
      return heading.text.trim();
    }
    if (heading && typeof heading.data === "string") {
      return heading.data.trim();
    }
    return String(heading ?? "").trim();
  }

  function isNumericLike(value) {
    const normalized = (value || "")
      .replace(/[,%()\s]/g, "")
      .replace(/[+−]/g, "-")
      .replace(/위$/g, "");
    return normalized.length > 0 && /^-?\d*\.?\d+$/.test(normalized);
  }

  function shouldFilterColumn(heading, values) {
    if (!values.length || values.length > 30) {
      return false;
    }

    if (/연도|year/i.test(heading)) {
      return true;
    }

    if (/영역|기관|순위|구분|유형/i.test(heading)) {
      return true;
    }

    return !values.every(isNumericLike);
  }

  function inferColumnSettings(table) {
    const headingCells = Array.from(table.tHead?.rows?.[0]?.cells || []);
    const bodyRows = Array.from(table.tBodies?.[0]?.rows || []);
    if (!headingCells.length || !bodyRows.length) {
      return [];
    }

    return headingCells
      .map((cell, index) => {
        const values = bodyRows
          .map((row) => getCellText(row.cells[index]))
          .filter((value) => value.length > 0);

        const settings = {
          select: index,
        };

        const type = cell.dataset.type || (values.length && values.every(isNumericLike) ? "number" : "");
        if (type) {
          settings.type = type;
        }

        if (cell.dataset.sortable === "false") {
          settings.sortable = false;
        }

        return Object.keys(settings).length > 1 ? settings : null;
      })
      .filter(Boolean);
  }

  function extractFilterConfig(table) {
    const headingCells = table.tHead?.rows?.[0]?.cells;
    const bodyRows = Array.from(table.tBodies?.[0]?.rows || []);
    if (!headingCells || !bodyRows.length) {
      return null;
    }

    const headings = Array.from(headingCells).map(getCellText);
    const columns = headings
      .map((heading, index) => {
        const values = Array.from(
          new Set(
            bodyRows
              .map((row) => getCellText(row.cells[index]))
              .filter((value) => value.length > 0)
          )
        );

        if (!shouldFilterColumn(heading, values)) {
          return null;
        }

        return {
          index,
          heading,
          values,
        };
      })
      .filter(Boolean);

    return {
      columns,
    };
  }

  function buildFilterControl(labelText) {
    const wrapper = document.createElement("div");
    wrapper.className = "d-flex flex-column gap-1";
    wrapper.style.minWidth = "10rem";

    const label = document.createElement("label");
    label.className = "small text-muted";
    label.textContent = labelText;

    wrapper.append(label);

    return {
      wrapper,
      label,
    };
  }

  function attachCustomFilters(dataTable, filterConfig) {
    const toolbar = document.createElement("div");
    toolbar.className = "datatable-toolbar d-flex flex-wrap gap-2 align-items-end mb-3";

    const searchControl = buildFilterControl("검색");
    const searchInput = document.createElement("input");
    searchInput.type = "search";
    searchInput.className = "form-control form-control-sm";
    searchInput.placeholder = "키워드 검색";
    searchControl.wrapper.style.minWidth = "14rem";
    searchControl.wrapper.append(searchInput);
    toolbar.append(searchControl.wrapper);

    const selects = filterConfig.columns.map((column) => {
      const control = buildFilterControl(column.heading);
      const select = document.createElement("select");
      select.className = "form-select form-select-sm";

      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "전체";
      select.append(defaultOption);

      column.values.forEach((value) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        select.append(option);
      });

      control.wrapper.append(select);
      toolbar.append(control.wrapper);

      return {
        index: column.index,
        select,
      };
    });

    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.className = "btn btn-outline-secondary btn-sm";
    resetButton.textContent = "초기화";
    toolbar.append(resetButton);

    const exportCsvButton = document.createElement("button");
    exportCsvButton.type = "button";
    exportCsvButton.className = "btn btn-outline-primary btn-sm";
    exportCsvButton.textContent = "CSV 내보내기";
    toolbar.append(exportCsvButton);

    const exportTsvButton = document.createElement("button");
    exportTsvButton.type = "button";
    exportTsvButton.className = "btn btn-outline-primary btn-sm";
    exportTsvButton.textContent = "TSV 내보내기";
    toolbar.append(exportTsvButton);

    const applyFilters = () => {
      const queries = [];
      const searchValue = searchInput.value.trim();

      if (searchValue) {
        queries.push({ terms: [searchValue] });
      }

      selects.forEach(({ index, select }) => {
        const value = select.value.trim();
        if (!value) {
          return;
        }

        queries.push({
          terms: [value],
          columns: [index],
        });
      });

      dataTable.multiSearch(queries);
    };

    searchInput.addEventListener("input", applyFilters);
    selects.forEach(({ select }) => {
      select.addEventListener("change", applyFilters);
    });

    resetButton.addEventListener("click", () => {
      searchInput.value = "";
      selects.forEach(({ select }) => {
        select.value = "";
      });
      applyFilters();
    });

    exportCsvButton.addEventListener("click", () => {
      exportFilteredRows(dataTable, ",", "csv");
    });

    exportTsvButton.addEventListener("click", () => {
      exportFilteredRows(dataTable, "\t", "tsv");
    });

    dataTable.wrapperDOM.prepend(toolbar);
  }

  function getCurrentRowIndices(dataTable) {
    if (Array.isArray(dataTable.pages) && dataTable.pages.length) {
      return dataTable.pages.flatMap((page) => page.map((entry) => entry.index));
    }
    return dataTable.data.data.map((_, index) => index);
  }

  function escapeDelimitedValue(value, delimiter) {
    const text = String(value ?? "");
    const needsQuotes =
      text.includes('"') || text.includes("\n") || text.includes("\r") || text.includes(delimiter);
    const escaped = text.replace(/"/g, '""');
    return needsQuotes ? `"${escaped}"` : escaped;
  }

  function downloadTextFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function exportFilteredRows(dataTable, delimiter, extension) {
    const headings = dataTable.data.headings.map(getHeadingText);
    const rowIndices = getCurrentRowIndices(dataTable);
    const lines = [
      headings.map((value) => escapeDelimitedValue(value, delimiter)).join(delimiter),
      ...rowIndices.map((rowIndex) => {
        const row = dataTable.data.data[rowIndex];
        const values = row.cells.map((cell) =>
          escapeDelimitedValue(cell?.text ?? cell?.data ?? "", delimiter)
        );
        return values.join(delimiter);
      }),
    ];

    const tableId = dataTable.dom?.closest(".quarto-float")?.id || dataTable.dom?.id || "datatable";
    downloadTextFile(
      `${tableId}.${extension}`,
      lines.join("\n"),
      extension === "csv" ? "text/csv;charset=utf-8;" : "text/tab-separated-values;charset=utf-8;"
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDatatables);
  } else {
    initDatatables();
  }
})();
