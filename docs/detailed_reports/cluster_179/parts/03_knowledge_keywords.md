## 3. 지식기반 인접 클러스터·키워드

### 3-1. 지식기반 인접 클러스터(EA/AA)

용어: ego는 현재 클러스터, alter는 유사도 기준으로 연결된 이웃 클러스터를 뜻합니다.
표의 `구분`은 EA(ego–alter) / AA(alter–alter) 로 표기합니다.

역량 공백 유형 클러스터로, RTA ≥ 1 기관은 BAM, NIST, NRC로 제시됩니다. KRISS 최근 5개년 기준에서 핵심 역량 기준 3조건 중 부족한 축은 RTA·N_docs·Excellence10입니다.

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
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">29-89 - 대사체·지질체 측정표준</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">역량 공백</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.85</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">mass spectrometry, ion, molecule, chromatography, metabolite</td>
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
| lc-ms | 1.89 | 15.32% (361) | 17.20% (108) | 13.80% (135) | 15.71% (118) |
| mass spectrometry | 0.04 | 64.36% (1,517) | 63.54% (399) | 64.21% (628) | 65.25% (490) |
| peptide | 0.04 | 36.74% (866) | 39.65% (249) | 38.04% (372) | 32.62% (245) |
| protein | 0.04 | 57.70% (1,360) | 54.94% (345) | 57.36% (561) | 60.45% (454) |
| chromatography | 0.02 | 23.59% (556) | 24.04% (151) | 21.57% (211) | 25.83% (194) |
| ion | 0.02 | 21.43% (505) | 25.96% (163) | 21.47% (210) | 17.58% (132) |
| antibody | 0.01 | 21.68% (511) | 18.63% (117) | 21.17% (207) | 24.90% (187) |
| proteomics | 0.01 | 23.00% (542) | 20.86% (131) | 22.60% (221) | 25.30% (190) |
| assay | 0.01 | 14.64% (345) | 15.76% (99) | 14.42% (141) | 13.98% (105) |
| quantification | 0.01 | 23.00% (542) | 24.52% (154) | 20.25% (198) | 25.30% (190) |
| biomarker | 0.01 | 10.27% (242) | 12.58% (79) | 8.90% (87) | 10.12% (76) |
| sequence | 0.01 | 15.36% (362) | 16.08% (101) | 15.54% (152) | 14.51% (109) |
| glycosylation | 0.01 | 8.70% (205) | 9.87% (62) | 7.98% (78) | 8.66% (65) |
| monoclonal | 0.01 | 14.76% (348) | 14.33% (90) | 13.39% (131) | 16.91% (127) |
| glycan | 0.01 | 6.58% (155) | 7.96% (50) | 6.34% (62) | 5.73% (43) |
