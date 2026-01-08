# PDF(인쇄용) 빌드 작업 관리

## 목표

- 데이터북 전체를 **A4 인쇄용 PDF**로 안정적으로 렌더링한다.
- 웹/HTML 출력(website, book)과 **충돌하지 않도록** PDF 전용 설정은 별도로 관리한다.

## 예상 이슈(사전 점검)

- LaTeX(TeX Live/TinyTeX) 미설치 시 PDF 렌더 실패
- 한국어 폰트/엔진 문제(`xelatex`/`lualatex` 권장)
- HTML 전용 요소(캐러셀·라이트박스·DataTables·iframe) → PDF에서 비활성/누락 가능
- 가로로 긴 표/큰 이미지 → 잘림/페이지 넘침(landscape/축소/longtable 등 필요)
- 한글/공백이 포함된 파일 경로 → LaTeX 환경에서 간헐적 문제 가능

## 작업 체크리스트

1. TinyTeX(LaTeX) 설치
2. `Final_Report_MD/report_assets/*.png` 파일명 영문화 + 문서 내 링크 갱신
3. 미사용 이미지 아카이브 폴더로 이동 + `.gitignore` 반영
4. PDF 전용 Quarto 프로필 추가(`--profile book,pdf` 방식 권장)
5. PDF 렌더 테스트 및 깨지는 요소(표/그림/수식) 정리

## 빌드 명령

- PDF 렌더(프로필 병합): `bash print/build_pdf.sh`
- 직접 실행: `quarto render --profile pdf --to pdf`
- 출력물: `_site_pdf/kriss_databook_print.pdf`

## 파일명 리네임 정책(예정)

- 한글 토큰을 영문 토큰으로 치환(예: `표준과학영역` → `stdscience`)
- 공백은 `_`로 치환
- 중복 파일명은 `_1`, `_2` 등 suffix로 처리
- 리네임 매핑은 `print/asset_rename_map.csv`에 기록
