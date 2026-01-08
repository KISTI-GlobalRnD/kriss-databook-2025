## 3. 지식기반 인접 클러스터·키워드

### 3-1. 지식기반 인접 클러스터(EA/AA)

용어: ego는 현재 클러스터, alter는 유사도 기준으로 연결된 이웃 클러스터를 뜻합니다.
표의 `구분`은 EA(ego–alter) / AA(alter–alter) 로 표기합니다.

확장 가능 유형 클러스터로, 핵심 역량 앵커는 9-12 - 배터리 양극·계면 측정(1.00) 로 확인됩니다. KRISS 최근 5개년 기준에서 핵심 역량 기준 3조건 중 부족한 축은 RTA·N_docs·Excellence10입니다.

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
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">9-12 - 배터리 양극·계면 측정</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">핵심 역량</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">1.00</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">lithium ion battery, cathode, li rich, lini0, capacity</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">EA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">7-154 - 리튬이온전지 예지진단</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">확장 가능</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">1.00</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">soh, lithium ion battery, state of charge, network, remaining useful life</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">EA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">35-94 - 연료전지 수분 계측</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">확장 가능</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.71</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">water, imaging, proton exchange membrane, pemfc, neutron</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">AA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">23-37 - 계산 위상 이미징</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">unknown</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.67</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">imaging, digital holography, hologram, ptychography, object</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">AA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">23-56 - 광학 3차원 형상계측</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">unknown</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.67</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">fringe, interferometry, interferometer, profilometry, wavefront</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">AA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">34-162 - 궤도각운동량 광계측</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">역량 공백</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.66</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">orbital angular momentum, optical vortex, beam, polarization, mode</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">AA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">4-86 - 광학 전장 변형계측</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">unknown</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.55</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">digital image correlation, displacement, strain, deformation, camera</td>
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
| layered double hydroxide | 0.96 | 17.93% (382) | 10.61% (21) | 15.48% (120) | 20.83% (241) |
| hydrogen evolution reaction | 0.04 | 59.44% (1,266) | 53.54% (106) | 61.55% (477) | 59.03% (683) |
| electrocatalyst | 0.04 | 72.86% (1,552) | 62.63% (124) | 71.10% (551) | 75.80% (877) |
| nickel | 0.04 | 60.42% (1,287) | 46.46% (92) | 58.97% (457) | 63.79% (738) |
| catalyst | 0.02 | 63.57% (1,354) | 66.16% (131) | 63.23% (490) | 63.35% (733) |
| electrocatalysis | 0.02 | 46.76% (996) | 45.96% (91) | 49.03% (380) | 45.38% (525) |
| current density | 0.02 | 73.10% (1,557) | 53.03% (105) | 71.61% (555) | 77.53% (897) |
| overpotential | 0.02 | 73.47% (1,565) | 54.55% (108) | 70.32% (545) | 78.82% (912) |
| nife | 0.01 | 17.61% (375) | 11.11% (22) | 14.19% (110) | 21.00% (243) |
| doping | 0.01 | 13.85% (295) | 6.57% (13) | 11.74% (91) | 16.51% (191) |
| alkaline | 0.01 | 54.08% (1,152) | 40.40% (80) | 52.26% (405) | 57.65% (667) |
| activity | 0.01 | 65.02% (1,385) | 65.66% (130) | 68.00% (527) | 62.92% (728) |
| bifunctional | 0.01 | 23.57% (502) | 16.67% (33) | 24.77% (192) | 23.94% (277) |
| pt | 0.01 | 25.31% (539) | 32.32% (64) | 26.97% (209) | 22.99% (266) |
| electrolysis | 0.01 | 26.67% (568) | 12.63% (25) | 23.48% (182) | 31.20% (361) |
