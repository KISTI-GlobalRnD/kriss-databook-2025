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
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">9-191 - 물분해 전기촉매 측정</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">확장 가능</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">1.00</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">layered double hydroxide, hydrogen evolution reaction, electrocatalyst, nickel, catalyst</td>
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
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.72</td>
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
| lithium ion battery | 0.07 | 74.92% (2,193) | 66.99% (280) | 72.74% (763) | 78.77% (1,150) |
| cathode | 0.03 | 75.33% (2,205) | 64.59% (270) | 73.78% (774) | 79.52% (1,161) |
| li rich | 0.02 | 29.86% (874) | 15.55% (65) | 30.98% (325) | 33.15% (484) |
| lini0 | 0.02 | 29.21% (855) | 17.94% (75) | 31.74% (333) | 30.62% (447) |
| capacity | 0.01 | 69.12% (2,023) | 61.00% (255) | 66.25% (695) | 73.49% (1,073) |
| layered oxides | 0.01 | 26.99% (790) | 12.44% (52) | 26.98% (283) | 31.16% (455) |
| doping | 0.01 | 19.58% (573) | 7.89% (33) | 16.97% (178) | 24.79% (362) |
| electrochemical | 0.01 | 52.44% (1,535) | 53.59% (224) | 52.72% (553) | 51.92% (758) |
| electrolyte | 0.01 | 27.30% (799) | 22.97% (96) | 24.88% (261) | 30.27% (442) |
| lnmo | 0.01 | 4.85% (142) | 5.98% (25) | 4.48% (47) | 4.79% (70) |
| manganese | 0.01 | 37.79% (1,106) | 33.01% (138) | 40.42% (424) | 37.26% (544) |
| electrode | 0.01 | 23.71% (694) | 30.62% (128) | 25.17% (264) | 20.68% (302) |
| redox | 0.01 | 21.08% (617) | 11.96% (50) | 21.54% (226) | 23.36% (341) |
| cycling | 0.01 | 47.22% (1,382) | 35.41% (148) | 49.09% (515) | 49.25% (719) |
| stability | 0.01 | 50.39% (1,475) | 36.12% (151) | 46.04% (483) | 57.60% (841) |
