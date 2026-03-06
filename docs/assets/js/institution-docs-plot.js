(function () {
  if (window.__institutionDocsPlotInitialized) {
    return;
  }
  window.__institutionDocsPlotInitialized = true;

  const ROOT_ID = "institution-docs-plot-tool";
  const DATA_PATH = "docs/assets/institution_docs_timeseries.json";
  const PLOTLY_URL = "https://cdn.plot.ly/plotly-2.27.1.min.js";
  const DEFAULT_SELECTION = [
    "KRISS",
    "NIST",
    "BAM",
    "PTB",
    "NPLI",
    "NPL",
    "NRC",
    "INRIM",
    "NMIJ/AIST",
    "NIM",
  ];
  const COLOR_MAP = {
    "BIPM 소속 기관": "#3d3d3d",
    KRISS: "#f3a000",
    NIST: "#6f87c5",
    BAM: "#666666",
    PTB: "#f2bf8a",
    NPLI: "#4fb07f",
    NPL: "#7383b5",
    NRC: "#ff6b6b",
    INRIM: "#74c69d",
    "NMIJ/AIST": "#f0aaaa",
    NIM: "#e58f84",
  };
  const SYMBOL_MAP = {
    "BIPM 소속 기관": "diamond-open",
    KRISS: "circle",
    NIST: "square",
    BAM: "cross",
    PTB: "circle-open",
    NPLI: "star",
    NPL: "triangle-down",
    NRC: "x",
    INRIM: "asterisk",
    "NMIJ/AIST": "triangle-up",
    NIM: "diamond",
  };
  const YEAR_WINDOW_PRESETS = [
    { id: "all", label: "전체" },
    { id: "last10", label: "최근 10년" },
    { id: "last5", label: "최근 5년" },
  ];
  const TOPN_PRESETS = [
    { id: "all", label: "전체" },
    { id: "5", label: "상위 5" },
    { id: "10", label: "상위 10" },
  ];

  function getRoot() {
    return document.getElementById(ROOT_ID);
  }

  function resolveDocsAssetPath(path) {
    const pathname = window.location.pathname || "";
    return pathname.includes("/docs/") ? path.replace(/^docs\//, "") : path;
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        if (window.Plotly) {
          resolve();
          return;
        }
        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), {
          once: true,
        });
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.addEventListener("load", () => resolve(), { once: true });
      script.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), {
        once: true,
      });
      document.head.append(script);
    });
  }

  async function ensurePlotly() {
    if (window.Plotly) {
      return window.Plotly;
    }
    await loadScript(PLOTLY_URL);
    return window.Plotly;
  }

  function createLabeledControl(labelText, control) {
    const wrapper = document.createElement("div");
    wrapper.className = "institution-docs-plot-control";

    const label = document.createElement("label");
    label.className = "form-label";
    label.textContent = labelText;

    wrapper.append(label, control);
    return wrapper;
  }

  function buildCheckboxList(institutions, state, onChange) {
    const list = document.createElement("div");
    list.className = "institution-docs-checkbox-list";

    institutions.forEach((institution) => {
      const item = document.createElement("label");
      item.className = "institution-docs-checkbox-item";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = institution.label;
      checkbox.checked = state.selectedInstitutions.has(institution.label);
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          state.selectedInstitutions.add(institution.label);
        } else {
          state.selectedInstitutions.delete(institution.label);
        }

        if (!state.selectedInstitutions.size) {
          state.selectedInstitutions.add("KRISS");
        }
        onChange();
      });

      const text = document.createElement("span");
      text.textContent = institution.label;
      item.append(checkbox, text);
      list.append(item);
    });

    return list;
  }

  function buildInstitutionStats(records, payload) {
    const recordsByInstitution = new Map();
    records.forEach((record) => {
      const items = recordsByInstitution.get(record.institution) || [];
      items.push(record);
      recordsByInstitution.set(record.institution, items);
    });

    return payload.institutions.map((institution) => {
      const items = (recordsByInstitution.get(institution.label) || [])
        .slice()
        .sort((left, right) => left.year - right.year);
      const latest = items.length ? items[items.length - 1] : null;
      return {
        ...institution,
        latestYear: latest ? latest.year : null,
        latestDocs: latest ? latest.docs : -Infinity,
      };
    });
  }

  function sortInstitutionStats(stats, sortMode) {
    const items = stats.slice();
    if (sortMode === "recent") {
      items.sort((left, right) => {
        if (right.latestDocs !== left.latestDocs) {
          return right.latestDocs - left.latestDocs;
        }
        return left.order - right.order;
      });
      return items;
    }
    items.sort((left, right) => left.order - right.order);
    return items;
  }

  function getDisplayedInstitutionSet(stats, state) {
    const selectedStats = stats.filter((item) => state.selectedInstitutions.has(item.label));
    if (state.topN === "all") {
      return new Set(selectedStats.map((item) => item.label));
    }

    const limit = Number.parseInt(state.topN, 10);
    const aggregates = selectedStats
      .filter((item) => item.category === "집계")
      .map((item) => item.label);
    const rankedIndividuals = selectedStats
      .filter((item) => item.category !== "집계")
      .slice()
      .sort((left, right) => {
        if (right.latestDocs !== left.latestDocs) {
          return right.latestDocs - left.latestDocs;
        }
        return left.order - right.order;
      })
      .slice(0, Number.isFinite(limit) ? limit : selectedStats.length)
      .map((item) => item.label);

    return new Set([...aggregates, ...rankedIndividuals]);
  }

  function getYearRange(years, windowId) {
    if (!Array.isArray(years) || !years.length || windowId === "all") {
      return null;
    }

    const lastYear = Math.max(...years);
    if (windowId === "last10") {
      return [lastYear - 9, lastYear];
    }
    if (windowId === "last5") {
      return [lastYear - 4, lastYear];
    }
    return null;
  }

  function renderControls(payload, state, controlsEl, render, institutionStats) {
    controlsEl.replaceChildren();

    const areaSelect = document.createElement("select");
    areaSelect.className = "form-select form-select-sm";
    payload.areas.forEach((area) => {
      const option = document.createElement("option");
      option.value = area.id;
      option.textContent = area.label;
      option.selected = area.id === state.areaId;
      areaSelect.append(option);
    });
    areaSelect.addEventListener("change", () => {
      state.areaId = areaSelect.value;
      render();
    });

    const scaleSelect = document.createElement("select");
    scaleSelect.className = "form-select form-select-sm";
    [
      ["linear", "선형"],
      ["log", "로그"],
    ].forEach(([value, label]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      option.selected = value === state.scaleType;
      scaleSelect.append(option);
    });
    scaleSelect.addEventListener("change", () => {
      state.scaleType = scaleSelect.value;
      render();
    });

    const sortSelect = document.createElement("select");
    sortSelect.className = "form-select form-select-sm";
    [
      ["recent", "최근 연도순"],
      ["default", "기본순"],
    ].forEach(([value, label]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      option.selected = value === state.sortMode;
      sortSelect.append(option);
    });
    sortSelect.addEventListener("change", () => {
      state.sortMode = sortSelect.value;
      render();
    });

    const presets = document.createElement("div");
    presets.className = "institution-docs-preset-group";

    const presetConfigs = [
      {
        label: "기본",
        values: DEFAULT_SELECTION,
      },
      {
        label: "전체",
        values: payload.institutions.filter((item) => item.category === "개별기관").map((item) => item.label),
      },
      {
        label: "합계 포함",
        values: payload.institutions.map((item) => item.label),
      },
    ];

    presetConfigs.forEach((preset) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "btn btn-outline-secondary btn-sm";
      button.textContent = preset.label;
      button.addEventListener("click", () => {
        state.selectedInstitutions = new Set(preset.values);
        render();
      });
      presets.append(button);
    });

    const yearPresets = document.createElement("div");
    yearPresets.className = "institution-docs-preset-group";
    YEAR_WINDOW_PRESETS.forEach((preset) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `btn btn-sm ${
        state.yearWindow === preset.id ? "btn-secondary" : "btn-outline-secondary"
      }`;
      button.textContent = preset.label;
      button.addEventListener("click", () => {
        state.yearWindow = preset.id;
        render();
      });
      yearPresets.append(button);
    });

    const topnPresets = document.createElement("div");
    topnPresets.className = "institution-docs-preset-group";
    TOPN_PRESETS.forEach((preset) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `btn btn-sm ${
        state.topN === preset.id ? "btn-secondary" : "btn-outline-secondary"
      }`;
      button.textContent = preset.label;
      button.addEventListener("click", () => {
        state.topN = preset.id;
        render();
      });
      topnPresets.append(button);
    });

    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.className = "btn btn-outline-dark btn-sm";
    resetButton.textContent = "초기화";
    resetButton.addEventListener("click", () => {
      state.areaId = "stdscience";
      state.scaleType = "linear";
      state.sortMode = "recent";
      state.yearWindow = "all";
      state.topN = "all";
      state.selectedInstitutions = new Set(DEFAULT_SELECTION);
      render();
    });

    const checkboxList = buildCheckboxList(sortInstitutionStats(institutionStats, state.sortMode), state, render);

    controlsEl.append(
      createLabeledControl("영역", areaSelect),
      createLabeledControl("Y축", scaleSelect),
      createLabeledControl("정렬", sortSelect),
      createLabeledControl("보기", presets),
      createLabeledControl("기간", yearPresets),
      createLabeledControl("표시", topnPresets),
      createLabeledControl("초기화", resetButton),
      createLabeledControl("기관", checkboxList)
    );
  }

  function groupByInstitution(records, orderedLabels) {
    const orderMap = new Map(orderedLabels.map((label, index) => [label, index]));
    const grouped = new Map();

    records.forEach((record) => {
      const items = grouped.get(record.institution) || [];
      items.push(record);
      grouped.set(record.institution, items);
    });

    return Array.from(grouped.entries()).sort(
      ([left], [right]) => (orderMap.get(left) || 0) - (orderMap.get(right) || 0)
    );
  }

  function buildTraces(records, orderedLabels, state) {
    return groupByInstitution(records, orderedLabels).map(([institution, items]) => {
      const sorted = items.slice().sort((left, right) => left.year - right.year);
      return {
        type: "scatter",
        mode: "lines+markers",
        name: institution,
        x: sorted.map((item) => item.year),
        y: sorted.map((item) => (state.scaleType === "log" && item.docs <= 0 ? null : item.docs)),
        customdata: sorted.map((item) => [item.area_label, item.category, item.docs]),
        line: {
          width: institution === "KRISS" ? 3.5 : 2,
          color: COLOR_MAP[institution] || undefined,
          dash: institution === "BIPM 소속 기관" ? "dash" : "solid",
        },
        marker: {
          size: institution === "KRISS" ? 8 : 7,
          color: COLOR_MAP[institution] || undefined,
          symbol: SYMBOL_MAP[institution] || "circle",
          line: {
            width: institution === "PTB" ? 1.5 : 0.6,
            color: COLOR_MAP[institution] || undefined,
          },
        },
        hovertemplate:
          "<b>%{fullData.name}</b><br>" +
          "연도: %{x}<br>" +
          "문헌 수: %{customdata[2]:,.0f}<extra></extra>",
      };
    });
  }

  function buildEndAnnotations(traces, state) {
    const endpoints = traces
      .map((trace) => {
        for (let index = trace.x.length - 1; index >= 0; index -= 1) {
          const year = trace.x[index];
          const value = trace.y[index];
          if (value === null || value === undefined || Number.isNaN(value)) {
            continue;
          }
          return {
            name: trace.name,
            year,
            value,
            color: trace.line.color,
          };
        }
        return null;
      })
      .filter(Boolean);

    if (!endpoints.length) {
      return [];
    }

    const transformedValues = traces
      .flatMap((trace) => trace.y)
      .filter((value) => value !== null && value !== undefined && !Number.isNaN(value))
      .map((value) => (state.scaleType === "log" ? Math.log10(value) : value));
    let minValue = Math.min(...transformedValues);
    let maxValue = Math.max(...transformedValues);
    if (minValue === maxValue) {
      minValue -= 1;
      maxValue += 1;
    }

    const lower = 0.06;
    const upper = 0.94;
    const minGap = Math.min(0.07, 0.84 / Math.max(endpoints.length, 1));
    const points = endpoints
      .map((point) => {
        const transformed = state.scaleType === "log" ? Math.log10(point.value) : point.value;
        const normalized = lower + ((transformed - minValue) / (maxValue - minValue)) * (upper - lower);
        return {
          ...point,
          normalized,
        };
      })
      .sort((left, right) => right.normalized - left.normalized);

    for (let index = 1; index < points.length; index += 1) {
      if (points[index - 1].normalized - points[index].normalized < minGap) {
        points[index].normalized = points[index - 1].normalized - minGap;
      }
    }

    const lowerOverflow = lower - points[points.length - 1].normalized;
    if (lowerOverflow > 0) {
      points.forEach((point) => {
        point.normalized += lowerOverflow;
      });
    }

    for (let index = points.length - 2; index >= 0; index -= 1) {
      if (points[index].normalized - points[index + 1].normalized < minGap) {
        points[index].normalized = points[index + 1].normalized + minGap;
      }
    }

    const upperOverflow = points[0].normalized - upper;
    if (upperOverflow > 0) {
      points.forEach((point) => {
        point.normalized -= upperOverflow;
      });
    }

    return points.map((point) => ({
      xref: "paper",
      yref: "paper",
      x: 1.01,
      y: point.normalized,
      xanchor: "left",
      yanchor: "middle",
      align: "left",
      showarrow: false,
      text: point.name,
      font: {
        size: 12,
        color: point.color,
      },
      bgcolor: "rgba(255,255,255,0.85)",
      borderpad: 1,
    }));
  }

  function buildLayout(areaLabel, payload, state, traces) {
    const xRange = getYearRange(payload.years, state.yearWindow);
    return {
      title: {
        text: `${areaLabel} · 기관별 문헌 수 시계열`,
        font: { size: 18, color: "#222222" },
      },
      height: 560,
      margin: { t: 64, r: 104, b: 56, l: 64 },
      hovermode: "closest",
      showlegend: false,
      xaxis: {
        title: "연도",
        tickmode: "linear",
        dtick: 2,
        showgrid: true,
        gridcolor: "#c9c9c9",
        gridwidth: 1,
        zeroline: false,
        showline: true,
        linecolor: "#333333",
        mirror: false,
        range: xRange || undefined,
      },
      yaxis: {
        title: state.scaleType === "log" ? "문헌 수 (log)" : "문헌 수",
        type: state.scaleType,
        rangemode: "tozero",
        showgrid: true,
        gridcolor: "#c9c9c9",
        gridwidth: 1,
        zeroline: false,
        showline: true,
        linecolor: "#333333",
        mirror: false,
      },
      paper_bgcolor: "#ffffff",
      plot_bgcolor: "#ffffff",
      annotations: buildEndAnnotations(traces, state),
    };
  }

  function buildConfig() {
    return {
      responsive: true,
      displaylogo: false,
      modeBarButtonsToRemove: ["lasso2d", "select2d"],
    };
  }

  async function init() {
    const root = getRoot();
    if (!root) {
      return;
    }

    const controlsEl = root.querySelector("#institution-docs-plot-controls");
    const chartEl = root.querySelector("#institution-docs-plot");
    const noteEl = root.querySelector("#institution-docs-plot-note");
    if (!controlsEl || !chartEl || !noteEl) {
      return;
    }

    noteEl.textContent = "데이터를 불러오는 중입니다.";

    try {
      const [Plotly, response] = await Promise.all([
        ensurePlotly(),
        fetch(resolveDocsAssetPath(DATA_PATH)),
      ]);

      if (!response.ok) {
        throw new Error(`데이터 파일을 불러오지 못했습니다: ${response.status}`);
      }

      const payload = await response.json();
      const state = {
        areaId: "stdscience",
        scaleType: "linear",
        sortMode: "recent",
        yearWindow: "all",
        topN: "all",
        selectedInstitutions: new Set(DEFAULT_SELECTION),
      };

      const render = () => {
        const area = payload.areas.find((item) => item.id === state.areaId) || payload.areas[0];
        const areaRecords = payload.records.filter((item) => item.area_id === area.id);
        const yearRange = getYearRange(payload.years, state.yearWindow);
        const filteredAreaRecords = yearRange
          ? areaRecords.filter((item) => item.year >= yearRange[0] && item.year <= yearRange[1])
          : areaRecords;
        const institutionStats = buildInstitutionStats(filteredAreaRecords, payload);
        renderControls(payload, state, controlsEl, render, institutionStats);

        const visibleInstitutionSet = getDisplayedInstitutionSet(institutionStats, state);
        const records = filteredAreaRecords.filter((item) => visibleInstitutionSet.has(item.institution));
        const orderedLabels = sortInstitutionStats(institutionStats, state.sortMode)
          .map((item) => item.label)
          .filter((label) => visibleInstitutionSet.has(label));
        const traces = buildTraces(records, orderedLabels, state);

        Plotly.react(chartEl, traces, buildLayout(area.label, payload, state, traces), buildConfig());
        noteEl.textContent = "";
      };

      render();
      window.addEventListener("resize", () => Plotly.Plots.resize(chartEl));
    } catch (error) {
      chartEl.innerHTML =
        '<div class="callout callout-warning"><div class="callout-body-container callout-body"><p>인터랙티브 plot을 불러오지 못했습니다.</p></div></div>';
      noteEl.textContent = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
