## 3. 지식기반 인접 클러스터·키워드

### 3-1. 지식기반 인접 클러스터(EA/AA)

용어: ego는 현재 클러스터, alter는 유사도 기준으로 연결된 이웃 클러스터를 뜻합니다.
표의 `구분`은 EA(ego–alter) / AA(alter–alter) 로 표기합니다.

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
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">3-65 - DLC·질화물 경질코팅</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">확장 가능</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.98</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">diamond-like carbon, diamond-like carbon films, carbon films, thin film, deposition</td>
</tr>
</tbody></table>

### 3-2. 워드클라우드

![](figures/03_wordcloud.png)

생성 방식: 클러스터 전체 초록에서 stopword를 제거하고, 단어·bi-gram 빈도를 계산했습니다(상위 3200개). 여기에 입력 키워드 빈도 정보를 `alpha=0.5`로 가중 결합해(스케일 정규화 후) 표현했습니다.

### 3-3. 키워드 시계열(비율, 2015–2024)

![](figures/03_keywords_trend.png)

`비율(%) = (해당 연도·클러스터에서 키워드가 포함된 문서 수 / 같은 연도·클러스터 전체 문서 수) × 100`
위 heatmap은 상위 키워드의 비율(%) 을 **키워드별 0~1 정규화(최대값=1)**해 상대 변화를 보여줍니다.

### 3-4. 주요 키워드(기간별 비율·문서수)

기간은 2015–2024를 기준으로 하며, 초기(2015–2017), 중기(2018–2021), 후기(2022–2024) 로 3구간 요약합니다.

표의 각 셀은 `비율% (문서수)` 형식이며, 괄호 안 숫자는 해당 기간에 키워드가 포함된 문서 수(중복 제거) 입니다(동일 문서 내 다중 등장은 1회로 계산).

score는 클러스터 내 용어의 대표성을 나타내는 점수로, c‑TF‑IDF와 LLR을 z‑score 후 가중합해 계산합니다. 자세한 산출 방식은 분야별 상세 리포팅(본 보고서) 을 참고해 주십시오.

| term | score | 10년 합계(2015–2024) | 초기(2015–2017) | 중기(2018–2021) | 후기(2022–2024) |
|---|---:|---:|---:|---:|---:|
| nitrogen vacancy | 0.08 | 72.81% (1,283) | 70.62% (238) | 74.93% (520) | 71.82% (525) |
| diamond | 0.04 | 76.62% (1,350) | 82.49% (278) | 74.21% (515) | 76.20% (557) |
| field | 0.01 | 39.56% (697) | 34.12% (115) | 37.75% (262) | 43.78% (320) |
| color centers | 0.01 | 36.89% (650) | 33.23% (112) | 37.90% (263) | 37.62% (275) |
| defect | 0.01 | 27.07% (477) | 26.41% (89) | 28.24% (196) | 26.27% (192) |
| nanodiamond | 0.01 | 14.13% (249) | 15.43% (52) | 16.57% (115) | 11.22% (82) |
| qubit | 0.01 | 14.47% (255) | 12.76% (43) | 14.84% (103) | 14.91% (109) |
| photon | 0.01 | 23.16% (408) | 24.63% (83) | 23.05% (160) | 22.57% (165) |
| microwave | 0.00 | 16.80% (296) | 13.65% (46) | 16.14% (112) | 18.88% (138) |
| odmr | 0.00 | 6.47% (114) | 2.97% (10) | 6.05% (42) | 8.48% (62) |
| magnetometry | 0.00 | 11.52% (203) | 7.72% (26) | 11.96% (83) | 12.86% (94) |
| ensemble | 0.00 | 18.62% (328) | 14.84% (50) | 20.89% (145) | 18.19% (133) |
| entanglement | 0.00 | 5.39% (95) | 5.93% (20) | 5.62% (39) | 4.92% (36) |
| zero phonon | 0.00 | 7.43% (131) | 6.53% (22) | 8.50% (59) | 6.84% (50) |
| noise | 0.00 | 14.02% (247) | 11.28% (38) | 13.40% (93) | 15.87% (116) |
