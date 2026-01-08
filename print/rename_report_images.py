#!/usr/bin/env python3
from __future__ import annotations

import csv
import os
import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import quote


ASSET_DIR = Path("Final_Report_MD/report_assets")
MAP_CSV = Path("print/asset_rename_map.csv")

HANGUL_TOKEN_MAP = {
    "표준과학영역": "stdscience",
    "물리측정영역": "physical",
    "화학소재측정영역": "chemical_materials",
    "바이오의료측정영역": "biomedical",
    "양자기술영역": "quantum",
    "협력네트워크": "collaboration_network",
    "기관별": "by_institution",
    "카테고리정책부합비율": "policy_alignment_ratio_by_category",
    "정책부합비율": "policy_alignment_ratio",
    "전체": "overall",
    "물리측정": "physical",
    "화학소재측정": "chemical_materials",
    "바이오의료측정": "biomedical",
    "양자기술": "quantum",
    "물리영역": "physical",
    "화학소재영역": "chemical_materials",
    "바이오의료영역": "biomedical",
    "개영역": "domains",
}


def is_git_repo() -> bool:
    try:
        subprocess.run(
            ["git", "rev-parse", "--is-inside-work-tree"],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        return True
    except Exception:
        return False


def git_mv(src: Path, dst: Path) -> None:
    subprocess.run(["git", "mv", str(src), str(dst)], check=True)


def normalise_basename(name: str) -> str:
    stem, ext = os.path.splitext(name)
    ext = ext.lower()

    for ko, en in HANGUL_TOKEN_MAP.items():
        stem = stem.replace(ko, en)

    stem = stem.replace(" ", "_")
    stem = re.sub(r"__+", "_", stem)
    stem = re.sub(r"_+$", "", stem)

    # Convert patterns like overall4domains -> overall_4_domains
    stem = re.sub(r"(overall)(\d+)(domains)", r"\1_\2_\3", stem)

    return f"{stem}{ext}"


def iter_source_files(root: Path) -> list[Path]:
    excluded_dirs = {
        ".git",
        "_site",
        "_site_website",
        "_site_book",
        "_site_pdf",
        "book",
        "website",
    }

    files: list[Path] = []
    for path in root.rglob("*"):
        if not path.is_file():
            continue
        if any(part in excluded_dirs for part in path.parts):
            continue
        if path.suffix.lower() in {".md", ".qmd", ".yml", ".yaml", ".scss"}:
            files.append(path)
    return files


def replace_in_files(replacements: dict[str, str]) -> None:
    root = Path(".")
    files = iter_source_files(root)
    for path in files:
        try:
            data = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue

        updated = data
        for old, new in replacements.items():
            if old in updated:
                updated = updated.replace(old, new)

        if updated != data:
            path.write_text(updated, encoding="utf-8")


def main() -> int:
    if not ASSET_DIR.exists():
        print(f"ERROR: asset dir not found: {ASSET_DIR}", file=sys.stderr)
        return 2

    png_files = sorted(p for p in ASSET_DIR.iterdir() if p.is_file() and p.suffix.lower() == ".png")
    if not png_files:
        print("No PNG files found; nothing to do.")
        return 0

    use_git = is_git_repo()

    # Compute target names and de-duplicate.
    planned: list[tuple[Path, Path]] = []
    used_names: dict[str, int] = {}
    for src in png_files:
        dst_name = normalise_basename(src.name)
        if dst_name == src.name:
            continue

        count = used_names.get(dst_name, 0)
        if count:
            stem, ext = os.path.splitext(dst_name)
            dst_name = f"{stem}_{count+1}{ext}"
        used_names[dst_name] = used_names.get(dst_name, 0) + 1

        dst = src.with_name(dst_name)
        planned.append((src, dst))

    if not planned:
        print("All PNG filenames already normalised; nothing to do.")
        return 0

    # Build string replacements for references (raw + URL-encoded basenames).
    replacements: dict[str, str] = {}
    for src, dst in planned:
        replacements[src.name] = dst.name
        replacements[quote(src.name)] = dst.name

    # Write mapping (append).
    MAP_CSV.parent.mkdir(parents=True, exist_ok=True)
    map_exists = MAP_CSV.exists()
    with MAP_CSV.open("a", newline="", encoding="utf-8") as fp:
        writer = csv.DictWriter(fp, fieldnames=["old_relpath", "new_relpath", "reason"])
        if not map_exists:
            writer.writeheader()
        for src, dst in planned:
            writer.writerow(
                {
                    "old_relpath": str(src.as_posix()),
                    "new_relpath": str(dst.as_posix()),
                    "reason": "ascii_filename_for_pdf",
                }
            )

    print(f"Renaming {len(planned)} PNG files under {ASSET_DIR}...")
    for src, dst in planned:
        if dst.exists():
            print(f"ERROR: destination already exists: {dst}", file=sys.stderr)
            return 3
        if use_git:
            git_mv(src, dst)
        else:
            src.rename(dst)

    print("Updating references in source files...")
    replace_in_files(replacements)

    print("Done.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
