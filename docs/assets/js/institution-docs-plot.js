(function () {
  if (window.__institutionDocsPlotInitialized) {
    return;
  }
  window.__institutionDocsPlotInitialized = true;

  const ROOT_ID = "institution-docs-plot-tool";
  const DATA_PATH = "docs/assets/institution_docs_timeseries.json";
  const PLOTLY_URL = "https://cdn.plot.ly/plotly-2.27.1.min.js";
  const DEFAULT_SELECTION = ["BIPM 소속 기관", "KRISS", "NIST", "BAM", "PTB"];
  const COLOR_MAP = {
    "BIPM 소속 기관": "#495057",
    KRISS: "#dc3545",
    NIST: "#0d6efd",
    BAM: "#fd7e14",
    PTB: "#6f42c1",
    NPLI: "#20c997",
    NPL: "#198754",
    NRC: "#0dcaf0",
    INRIM: "#6610f2",
    "NMIJ/AIST": "#e83e8c",
    NIM: "#6c757d",
  };

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
      text.textContent = `${institution.label} (${institution.category})`;
      item.append(checkbox, text);
      list.append(item);
    });

    return list;
  }

  function renderControls(payload, state, controlsEl, render) {
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
      ["linear", "선형 축"],
      ["log", "로그 축"],
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

    const presets = document.createElement("div");
    presets.className = "institution-docs-preset-group";

    const presetConfigs = [
      {
        label: "KRISS 비교",
        values: DEFAULT_SELECTION,
      },
      {
        label: "개별기관 전체",
        values: payload.institutions.filter((item) => item.category === "개별기관").map((item) => item.label),
      },
      {
        label: "전체 기관",
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

    const checkboxList = buildCheckboxList(payload.institutions, state, render);

    controlsEl.append(
      createLabeledControl("영역", areaSelect),
      createLabeledControl("Y축", scaleSelect),
      createLabeledControl("선택 프리셋", presets),
      createLabeledControl("기관", checkboxList)
    );
  }

  function groupByInstitution(records, payload) {
    const orderMap = new Map(payload.institutions.map((item) => [item.label, item.order]));
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

  function buildTraces(records, payload, state) {
    return groupByInstitution(records, payload).map(([institution, items]) => {
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
          size: institution === "KRISS" ? 8 : 6,
          color: COLOR_MAP[institution] || undefined,
        },
        hovertemplate:
          "<b>%{fullData.name}</b><br>" +
          "영역: %{customdata[0]}<br>" +
          "구분: %{customdata[1]}<br>" +
          "연도: %{x}<br>" +
          "문헌 수: %{customdata[2]:,.0f}<extra></extra>",
      };
    });
  }

  function buildLayout(areaLabel, state) {
    return {
      title: {
        text: `${areaLabel} · 기관별 문헌 수 시계열`,
        font: { size: 18 },
      },
      height: 560,
      margin: { t: 64, r: 24, b: 56, l: 64 },
      hovermode: "x unified",
      legend: { orientation: "h", y: -0.22 },
      xaxis: {
        title: "연도",
        tickmode: "linear",
        dtick: 2,
      },
      yaxis: {
        title: state.scaleType === "log" ? "문헌 수 (로그 축)" : "문헌 수",
        type: state.scaleType,
        rangemode: "tozero",
      },
      paper_bgcolor: "#ffffff",
      plot_bgcolor: "#ffffff",
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
        selectedInstitutions: new Set(DEFAULT_SELECTION),
      };

      const render = () => {
        renderControls(payload, state, controlsEl, render);

        const area = payload.areas.find((item) => item.id === state.areaId) || payload.areas[0];
        const records = payload.records.filter(
          (item) => item.area_id === area.id && state.selectedInstitutions.has(item.institution)
        );
        const traces = buildTraces(records, payload, state);

        Plotly.react(chartEl, traces, buildLayout(area.label, state), buildConfig());

        const selectedCount = state.selectedInstitutions.size;
        noteEl.textContent = `선택된 기관 ${selectedCount}개 · 범례 클릭으로 개별 곡선을 임시 숨길 수 있습니다.`;
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
