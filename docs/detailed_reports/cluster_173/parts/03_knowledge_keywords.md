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
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">10-14 - 산화물 결함 측정·제어</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">핵심 역량</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.91</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">thin films, zinc oxide, doping, nanoparticles, synthesis</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">EA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">36-77 - 2차원 광전소자 측정</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">핵심 역량</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.42</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">self-powered, gallium nitride, photodetector, ultraviolet, 2d</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">AA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">22-122 - 탄소나노튜브 계측</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">확장 가능</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.96</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">carbon nanotube, emission, field, exciton, spectroscopy</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">AA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">36-135 - 그래핀 합성·물성 측정</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">확장 가능</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.95</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">graphene, 2d, copper, chemical vapor deposition, substrate</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">AA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">11-80 - 그래핀·CNT 복합재 계면</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">확장 가능</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.88</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">graphene nanoplatelet, nanoplatelet, laminate, nanocomposite, composite</td>
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
| sensing | 0.03 | 63.05% (3,283) | 62.25% (597) | 63.67% (1,213) | 62.87% (1,473) |
| gas | 0.02 | 76.24% (3,970) | 72.68% (697) | 74.91% (1,427) | 78.79% (1,846) |
| zinc oxide | 0.01 | 13.41% (698) | 12.10% (116) | 14.23% (271) | 13.27% (311) |
| sno2 | 0.01 | 16.07% (837) | 20.65% (198) | 16.17% (308) | 14.13% (331) |
| nanoparticles | 0.01 | 18.44% (960) | 20.54% (197) | 19.32% (368) | 16.86% (395) |
| no2 | 0.01 | 26.73% (1,392) | 23.04% (221) | 28.35% (540) | 26.93% (631) |
| sensors | 0.01 | 56.52% (2,943) | 48.80% (468) | 56.17% (1,070) | 59.97% (1,405) |
| electronic nose | 0.01 | 15.71% (818) | 14.91% (143) | 16.17% (308) | 15.66% (367) |
| response | 0.01 | 58.02% (3,021) | 55.06% (528) | 56.85% (1,083) | 60.18% (1,410) |
| selectivity | 0.01 | 30.42% (1,584) | 20.02% (192) | 29.97% (571) | 35.04% (821) |
| concentration | 0.01 | 25.47% (1,326) | 25.76% (247) | 24.83% (473) | 25.86% (606) |
| wo3 | 0.01 | 8.68% (452) | 10.53% (101) | 9.29% (177) | 7.43% (174) |
| ammonia | 0.00 | 12.81% (667) | 11.26% (108) | 12.13% (231) | 14.00% (328) |
| hydrogen | 0.00 | 12.89% (671) | 16.27% (156) | 12.18% (232) | 12.08% (283) |
| sno | 0.00 | 13.19% (687) | 18.25% (175) | 14.33% (273) | 10.20% (239) |
