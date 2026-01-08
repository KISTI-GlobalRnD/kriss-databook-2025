## 3. 지식기반 인접 클러스터·키워드

### 3-1. 지식기반 인접 클러스터(EA/AA)

용어: ego는 현재 클러스터, alter는 유사도 기준으로 연결된 이웃 클러스터를 뜻합니다.
표의 `구분`은 EA(ego–alter) / AA(alter–alter) 로 표기합니다.

역량 공백 유형 클러스터로, RTA ≥ 1 기관은 BAM, INRIM, NPL로 제시됩니다. KRISS 최근 5개년 기준에서 핵심 역량 기준 3조건 중 부족한 축은 RTA·N_docs·Excellence10입니다.

![](figures/01_ego_network.png)

<table class="table table-sm" style="table-layout: fixed; width: 100%;">
<colgroup>
<col style="width: 8%;">
<col style="width: 34%;">
<col style="width: 10%;">
<col style="width: 8%;">
<col style="width: 40%;">
</colgroup>
<thead>
<tr>
<th style="text-align: left; vertical-align: top; white-space: nowrap;">구분</th>
<th style="text-align: left; vertical-align: top;">클러스터</th>
<th style="text-align: left; vertical-align: top; white-space: nowrap;">유형</th>
<th style="text-align: right; vertical-align: top; white-space: nowrap;">유사도</th>
<th style="text-align: left; vertical-align: top;">대표 키워드</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">EA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">15-19 - 형광체 변환 조명</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">unknown</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.94</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">white light, emission, phosphor, doping, luminescence</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">EA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">15-20 - 발광선량계 측정표준</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">unknown</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.94</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">thermoluminescence, optically stimulated luminescence, dosimetry, glow curve, doping</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">EA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">15-93 - 방사선 섬광체·검출기</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">unknown</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.86</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">scintillator, scintillation, gamma, neutron, crystal</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">EA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">15-59 - 방사선 차폐 유리</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">unknown</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.84</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">borate glass, judd-ofelt, half-value layer, glass, doping</td>
</tr>
</tbody></table>

### 3-2. 워드클라우드

![](figures/03_wordcloud.png)

생성 방식: 클러스터 전체 초록에서 stopword를 제거하고, 단어·bi-gram 빈도를 계산했습니다(상위 3200개). 여기에 입력 키워드 빈도 정보를 `alpha=0.5`로 가중 결합해(스케일 정규화 후) 표현했습니다.

### 3-3. 키워드 시계열(비율, 2015–2024)

![](figures/03_keywords_trend.svg)

`비율(%) = (해당 연도·클러스터에서 키워드가 포함된 문서 수 / 같은 연도·클러스터 전체 문서 수) × 100`
위 heatmap은 상위 키워드의 비율(%) 을 **키워드별 0~1 정규화(최대값=1)**해 상대 변화를 보여줍니다.

### 3-4. 주요 키워드(기간별 비율·문서수)

기간은 2015–2024를 기준으로 하며, 초기(2015–2017), 중기(2018–2021), 후기(2022–2024) 로 3구간 요약합니다.

표의 각 셀은 `비율% (문서수)` 형식이며, 괄호 안 숫자는 해당 기간에 키워드가 포함된 문서 수(중복 제거) 입니다(동일 문서 내 다중 등장은 1회로 계산).

score는 클러스터 내 용어의 대표성을 나타내는 점수로, c‑TF‑IDF와 LLR을 z‑score 후 가중합해 계산합니다. 자세한 산출 방식은 분야별 상세 리포팅(본 보고서) 을 참고해 주십시오.

| term | score | 10년 합계(2015–2024) | 초기(2015–2017) | 중기(2018–2021) | 후기(2022–2024) |
|---|---:|---:|---:|---:|---:|
| near-infrared | 0.10 | 21.23% (969) | 22.12% (227) | 23.76% (432) | 18.01% (310) |
| emission | 0.04 | 56.91% (2,598) | 58.09% (596) | 58.47% (1,063) | 54.56% (939) |
| luminescence | 0.02 | 56.14% (2,563) | 56.34% (578) | 56.27% (1,023) | 55.90% (962) |
| yb3 | 0.02 | 41.66% (1,902) | 48.44% (497) | 43.12% (784) | 36.08% (621) |
| upconversion | 0.02 | 51.04% (2,330) | 57.21% (587) | 52.97% (963) | 45.32% (780) |
| doping | 0.02 | 45.48% (2,076) | 44.05% (452) | 45.54% (828) | 46.25% (796) |
| nanoparticles | 0.02 | 33.67% (1,537) | 39.28% (403) | 34.76% (632) | 29.17% (502) |
| nayf4 | 0.02 | 21.36% (975) | 27.68% (284) | 22.11% (402) | 16.79% (289) |
| phosphor | 0.01 | 22.23% (1,015) | 16.37% (168) | 21.29% (387) | 26.73% (460) |
| er3 | 0.01 | 28.50% (1,301) | 31.68% (325) | 29.70% (540) | 25.33% (436) |
| synthesis | 0.01 | 33.32% (1,521) | 37.72% (387) | 32.67% (594) | 31.38% (540) |
| fluorescence | 0.01 | 37.35% (1,705) | 31.68% (325) | 37.24% (677) | 40.85% (703) |
| nm | 0.01 | 49.20% (2,246) | 50.10% (514) | 49.06% (892) | 48.81% (840) |
| excitation | 0.01 | 40.11% (1,831) | 40.84% (419) | 40.10% (729) | 39.69% (683) |
| nanocrystals | 0.00 | 11.35% (518) | 16.08% (165) | 11.66% (212) | 8.19% (141) |
