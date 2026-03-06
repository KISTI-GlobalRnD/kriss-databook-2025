#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[2]

SHEET_METADATA = [
    ("전체", "stdscience", "표준과학 전 영역"),
    ("물리측정", "physical", "물리측정"),
    ("화학소재측정", "chemical_materials", "화학소재측정"),
    ("바이오의료측정", "biomedical", "바이오의료측정"),
    ("양자기술", "quantum", "양자기술"),
]

INSTITUTION_LABELS = {
    "BIPM 소속 기관": "BIPM 소속 기관",
    "Korea Research Institute of Standards and Science [KRISS]": "KRISS",
    "National Institute of Standards and Technology [NIST]": "NIST",
    "Federal Institute for Materials Research and Testing/Bundesanstalt für Materialforschung und -prüfung [BAM]": "BAM",
    "Bundesanstalt fuer Materialforschung und -pruefung [BAM]": "BAM",
    "Physikalisch-Technische Bundesanstalt [PTB]": "PTB",
    "CSIR National Physical Laboratory of India [NPLI]": "NPLI",
    "National Physical Laboratory, India [NPLI]": "NPLI",
    "National Physical Laboratory [NPL]": "NPL",
    "National Research Council Canada [NRC]": "NRC",
    "Istituto Nazionale di Ricerca Metrologica [INRIM]": "INRIM",
    "National Metrology Institute of Japan, AIST [NMIJ/AIST]": "NMIJ/AIST",
    "National Institute of Metrology [NIM]": "NIM",
}

INSTITUTION_IDS = {
    "BIPM 소속 기관": "bipm_family",
    "KRISS": "kriss",
    "NIST": "nist",
    "BAM": "bam",
    "PTB": "ptb",
    "NPLI": "npli",
    "NPL": "npl",
    "NRC": "nrc",
    "INRIM": "inrim",
    "NMIJ/AIST": "nmij_aist",
    "NIM": "nim",
}
INSTITUTION_ORDER = {label: order for order, label in enumerate(INSTITUTION_IDS)}


def build_records(input_path: Path) -> dict[str, list[dict[str, object]]]:
    xls = pd.ExcelFile(input_path)
    records: list[dict[str, object]] = []
    institutions: list[dict[str, object]] = []
    institution_seen: set[str] = set()
    years_all: set[int] = set()

    for area_order, (sheet_name, area_id, area_label) in enumerate(SHEET_METADATA):
        df = pd.read_excel(xls, sheet_name=sheet_name)
        year_columns = [column for column in df.columns if str(column).isdigit()]
        melted = df.melt(id_vars=["기관명"], value_vars=year_columns, var_name="year", value_name="docs")

        for row in melted.itertuples(index=False):
            source_name = str(row.기관명).strip()
            institution_label = INSTITUTION_LABELS.get(source_name, source_name)
            category = "집계" if institution_label == "BIPM 소속 기관" else "개별기관"
            institution_order = INSTITUTION_ORDER.get(institution_label, len(INSTITUTION_ORDER))
            institution_id = INSTITUTION_IDS.get(
                institution_label,
                institution_label.lower().replace("/", "_").replace(" ", "_"),
            )
            year = int(row.year)
            docs = int(row.docs)

            if institution_label not in institution_seen:
                institutions.append(
                    {
                        "id": institution_id,
                        "label": institution_label,
                        "category": category,
                        "order": institution_order,
                    }
                )
                institution_seen.add(institution_label)

            years_all.add(year)
            records.append(
                {
                    "area_id": area_id,
                    "area_label": area_label,
                    "area_order": area_order,
                    "institution_id": institution_id,
                    "institution": institution_label,
                    "institution_order": institution_order,
                    "category": category,
                    "year": year,
                    "docs": docs,
                }
            )

    records.sort(key=lambda item: (item["area_order"], item["institution_order"], item["year"]))
    institutions.sort(key=lambda item: item["order"])

    areas = [
        {"id": area_id, "label": area_label, "order": area_order}
        for area_order, (_, area_id, area_label) in enumerate(SHEET_METADATA)
    ]

    return {
        "areas": areas,
        "institutions": institutions,
        "years": sorted(years_all),
        "records": records,
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Build institution paper-count JSON asset for interactive report plots.")
    parser.add_argument(
        "--input",
        type=Path,
        default=ROOT / "Data" / "org_yearly_paper_count_stdscience_2000_2024.xlsx",
        help="Path to the institution paper-count workbook.",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=ROOT / "final_report_site" / "docs" / "assets" / "institution_docs_timeseries.json",
        help="Output JSON asset path.",
    )
    args = parser.parse_args()

    payload = build_records(args.input)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("w", encoding="utf-8") as handle:
        json.dump(payload, handle, ensure_ascii=False, separators=(",", ":"))


if __name__ == "__main__":
    main()
