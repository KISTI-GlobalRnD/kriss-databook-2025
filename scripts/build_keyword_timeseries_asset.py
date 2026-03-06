#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import gzip
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from scripts.process_cluster import build_record, parse_rows  # type: ignore


def load_final_labels(path: Path) -> dict[str, dict[str, str]]:
    headers, rows = parse_rows(path)
    labels: dict[str, dict[str, str]] = {}

    for row in rows:
        record = build_record(headers, row)
        cluster_id = str(record.get("cluster_micro") or "").strip()
        if not cluster_id:
            continue
        labels[cluster_id] = {
            "label_ko_short_final": str(record.get("label_ko_short_final") or "").strip(),
            "label_ko_long_final": str(record.get("label_ko_long_final") or "").strip(),
        }

    return labels


def build_fieldnames(fieldnames: list[str]) -> list[str]:
    output = list(fieldnames)
    for column in ("label_ko_short_final", "label_ko_long_final"):
        if column not in output:
            output.append(column)
    return output


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Build the keyword-timeseries site asset with refined_v2 final labels."
    )
    parser.add_argument(
        "--timeseries",
        type=Path,
        default=ROOT / "Output" / "keyword_all_timeseries.csv",
        help="Source keyword timeseries CSV.",
    )
    parser.add_argument(
        "--labels-xlsx",
        type=Path,
        default=ROOT / "Output" / "kriss_cluster_refined_v2.xlsx",
        help="Workbook containing final cluster labels.",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=ROOT / "final_report_site" / "docs" / "assets" / "keyword_all_timeseries.csv.gz",
        help="Destination gzip CSV asset path.",
    )
    args = parser.parse_args()

    label_map = load_final_labels(args.labels_xlsx)
    args.output.parent.mkdir(parents=True, exist_ok=True)

    changed_clusters: set[str] = set()
    row_count = 0

    with args.timeseries.open("r", encoding="utf-8", newline="") as source, gzip.open(
        args.output, "wt", encoding="utf-8", newline=""
    ) as target:
        reader = csv.DictReader(source)
        if reader.fieldnames is None:
            raise ValueError(f"No header found in {args.timeseries}")

        writer = csv.DictWriter(target, fieldnames=build_fieldnames(reader.fieldnames))
        writer.writeheader()

        for raw_row in reader:
            row = dict(raw_row)
            cluster_id = str(row.get("cluster_micro") or row.get("cluster_id") or "").strip()
            final_labels = label_map.get(cluster_id, {})

            final_short = final_labels.get("label_ko_short_final", "").strip()
            final_long = final_labels.get("label_ko_long_final", "").strip()

            if final_short:
                if final_short != str(row.get("short_label_kr") or "").strip():
                    changed_clusters.add(cluster_id)
                row["short_label_kr"] = final_short
                row["label_ko_short_final"] = final_short
            else:
                row["label_ko_short_final"] = str(row.get("short_label_kr") or "").strip()

            if final_long:
                if final_long != str(row.get("long_label_kr") or "").strip():
                    changed_clusters.add(cluster_id)
                row["long_label_kr"] = final_long
                row["label_ko_long_final"] = final_long
            else:
                row["label_ko_long_final"] = str(row.get("long_label_kr") or "").strip()

            writer.writerow(row)
            row_count += 1

    changed_clusters_list = sorted(changed_clusters, key=int)
    print(f"Wrote {row_count} rows to {args.output}")
    print(f"Loaded final labels for {len(label_map)} clusters from {args.labels_xlsx}")
    print(f"Updated labels for {len(changed_clusters_list)} clusters: {changed_clusters_list}")


if __name__ == "__main__":
    main()
