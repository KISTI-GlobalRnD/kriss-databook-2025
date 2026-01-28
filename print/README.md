# Print/Conversion Workflow (DOCX/HWPX/PDF)

> 실행 기준: repo root(예: `.../1.4.2.KRISS`)에서 커맨드 실행.

## 단일 원본(편집) 원칙

- 최종 편집/머지의 단일 원본은 **DOCX**로 둔다: `final_report_site/print/kriss_master_merged.docx`
- 검토용 인쇄 PDF는 위 DOCX에서 뽑는다: `final_report_site/print/kriss_master_merged.pdf`

## 빠른 워크플로(추천)

1. (필요 시) HWPX → DOCX: `final_report_site/print/convert_hwpx_to_docx.py`
2. 데이터북 DOCX 생성(Quarto): `final_report_site/_site_pdf/kriss_databook_print.pdf.docx`
3. 최종보고서 DOCX + 데이터북 DOCX 머지: `final_report_site/print/merge_docx_master.py`
4. 머지된 DOCX → 검토용 PDF: `final_report_site/print/docx_to_review_pdf.sh`
5. (옵션) DOCX → HWPX(한글 편집용): `final_report_site/print/convert_docx_to_hwpx.py`

## 의존성(필수)

- `pandoc` (HWPX/DOCX 변환 및 머지에 사용)
- `.venv` (python 패키지: `lxml`, `Pillow`)
- `google-chrome` 또는 `chromium` (DOCX → PDF 검토용 출력)
- `quarto` (데이터북 PDF/DOCX 빌드)

## 데이터북 PDF/DOCX 빌드(Quarto)

- PDF 빌드(권장): `bash final_report_site/print/build_pdf.sh`
  - 출력: `final_report_site/_site_pdf/kriss_databook_print.pdf`
- 편집용 DOCX(동일 프로필): `cd final_report_site && quarto render --profile pdf --to docx`
  - 출력(예): `final_report_site/_site_pdf/kriss_databook_print.pdf.docx`

## HWPX → DOCX 변환(로컬 작성 보고서)

`.hwpx` 보고서를 편집자 전달용 `.docx`로 “최소한의 문서 구조(제목/본문/표/그림)” 형태로 변환한다.

```bash
.venv/bin/python final_report_site/print/convert_hwpx_to_docx.py \\
  "final_report_site/빅데이터_기반_표준연구_기관_성과분석_및_유망연구영역_도출_최종보고서.hwpx" \\
  --output "final_report_site/print/final_report_from_hwpx.docx"
```

## DOCX → HWPX 변환(한글 편집용, best-effort)

Hancom Office 없이도 열리는 형태를 목표로, **제목(개요/Outline) + 텍스트 중심**으로 DOCX를 HWPX로 변환한다.

- 지원(우선순위): `Heading 1~3` 기반 개요(Outline), 본문 텍스트, 리스트, 표(텍스트로 풀기), 그림(placeholder)
- 제한: 표/그림/수식의 “완전한 레이아웃” 보존은 Hancom Office/전용 변환기가 필요하다.

```bash
.venv/bin/python final_report_site/print/convert_docx_to_hwpx.py \\
  "final_report_site/print/kriss_master_merged.docx" \\
  --output "final_report_site/print/kriss_master_merged.hwpx"
```

옵션:

- 개요(Outline) 우선(기본): `--mode outline`
- “제 장/제 절 …” 스타일 매핑: `--mode report` (기본으로 제목 선행 번호는 제거해서 중복을 피함)
  - 번호를 제거하지 않으려면: `--no-strip-heading-prefix`
- 중간 산출물 보관: `--keep-intermediate` (suffix: `.docx2hwpx`)

## 파일명 리네임 정책(예정)

- 한글 토큰을 영문 토큰으로 치환(예: `표준과학영역` → `stdscience`)
- 공백은 `_`로 치환
- 중복 파일명은 `_1`, `_2` 등 suffix로 처리
- 리네임 매핑은 `final_report_site/print/asset_rename_map.csv`에 기록

### Quarto 이미지(asset) 리네임 스크립트

LaTeX/PDF 빌드에서 경로/폰트 이슈를 줄이기 위해, `final_report_site/Final_Report_MD/report_assets/*.png` 파일명을 ASCII로 정리하고 문서 내 참조를 자동 갱신한다.

```bash
.venv/bin/python final_report_site/print/rename_report_images.py --dry-run
```

- 실제 적용: `--dry-run` 제거
- 숫자 정렬(선택): `--pad-suffix-numbers 2` (예: `image_6.png` → `image_06.png`)

## 최종보고서(DOCX) + 데이터북(DOCX) 머지(편집용 단일 원본)

최종 편집/인쇄를 위해 단일 원본은 **DOCX**로 두되, 최종보고서의 “3장(분석 본문)” 구간은 최신성 있는 **데이터북 DOCX**로 덮어쓴다.

- 머지 스크립트: `final_report_site/print/merge_docx_master.py`
- 산출물(예시): `final_report_site/print/kriss_master_merged.docx`

```bash
.venv/bin/python final_report_site/print/merge_docx_master.py \\
  --master-docx "final_report_site/print/final_report_from_hwpx.docx" \\
  --databook-docx "final_report_site/_site_pdf/kriss_databook_print.pdf.docx" \\
  --output "final_report_site/print/kriss_master_merged.docx"
```

머지 시 적용되는 기본 처리:

- 3장 내부 3개 절을 데이터북 내용으로 덮어쓰기
- 캐러셀로 묶였던 반복 그림은 대표 1개만 본문에 남기고 `부록 > 추가 그림(캐러셀 해제본)`으로 이동
- 본문 URL은 `(데이터북 참조)`로 통일(최종 참고문헌 구간은 유지)
- 본문 그림 캡션은 `그림 3-1, 3-2, ...` 형태로 재번호(편집자가 InDesign에서 자유롭게 재조정 가능)

## DOCX → PDF(검토용)

머지된 DOCX를 빠르게 확인하기 위한 검토용 PDF를 생성한다.

```bash
bash final_report_site/print/docx_to_review_pdf.sh \\
  "final_report_site/print/kriss_master_merged.docx" \\
  "final_report_site/print/kriss_master_merged.pdf"
```

## 주의사항(요약)

- Quarto → PDF는 환경에 따라 LaTeX(TeX Live/TinyTeX) 설치가 필요할 수 있다.
- `docx_to_review_pdf.sh`는 MathJax CDN을 사용하므로 기본적으로 네트워크가 필요하다(오프라인이면 `--mathjax` 제거 후 재시도).
- DOCX ↔ HWPX 변환은 best-effort이며, 표/그림/수식은 “열리는 수준”을 목표로 한다(최종 제본용 레이아웃은 편집툴에서 조정 필요).
