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
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">9-191 - 물분해 전기촉매 측정</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">확장 가능</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">1.00</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">layered double hydroxide, hydrogen evolution reaction, electrocatalyst, nickel, catalyst</td>
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
| soh | 0.93 | 23.40% (892) | 11.73% (36) | 18.59% (201) | 27.02% (655) |
| lithium ion battery | 0.15 | 89.17% (3,399) | 82.74% (254) | 88.62% (958) | 90.22% (2,187) |
| state of charge | 0.04 | 39.35% (1,500) | 44.95% (138) | 45.33% (490) | 35.97% (872) |
| network | 0.02 | 28.10% (1,071) | 4.56% (14) | 18.50% (200) | 35.35% (857) |
| remaining useful life | 0.02 | 15.95% (608) | 12.38% (38) | 17.02% (184) | 15.92% (386) |
| estimation | 0.02 | 60.31% (2,299) | 57.65% (177) | 63.09% (682) | 59.41% (1,440) |
| prediction | 0.01 | 32.74% (1,248) | 17.59% (54) | 30.06% (325) | 35.85% (869) |
| capacity | 0.01 | 33.47% (1,276) | 25.41% (78) | 34.41% (372) | 34.08% (826) |
| electric vehicles | 0.00 | 23.87% (910) | 25.08% (77) | 26.46% (286) | 22.57% (547) |
| voltage | 0.00 | 32.74% (1,248) | 34.20% (105) | 33.95% (367) | 32.01% (776) |
| degradation | 0.00 | 24.16% (921) | 20.52% (63) | 23.22% (251) | 25.04% (607) |
