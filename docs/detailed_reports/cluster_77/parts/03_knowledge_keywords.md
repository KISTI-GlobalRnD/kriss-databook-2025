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
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">22-122 - 탄소나노튜브 계측</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">확장 가능</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.96</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">carbon nanotube, emission, field, exciton, spectroscopy</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">EA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">36-135 - 그래핀 합성·물성 측정</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">확장 가능</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.95</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">graphene, 2d, copper, chemical vapor deposition, substrate</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">EA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">11-80 - 그래핀·CNT 복합재 계면</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">확장 가능</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.88</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">graphene nanoplatelet, nanoplatelet, laminate, nanocomposite, composite</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">EA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">10-173 - 2차원·산화물 가스센서</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">핵심 역량</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.42</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">sensing, gas, zinc oxide, sno2, nanoparticles</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">AA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">10-14 - 산화물 결함 측정·제어</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">핵심 역량</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.91</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">thin films, zinc oxide, doping, nanoparticles, synthesis</td>
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
| self-powered | 2.26 | 11.96% (755) | 4.62% (47) | 8.97% (220) | 17.15% (488) |
| gallium nitride | 0.79 | 6.68% (422) | 5.11% (52) | 5.79% (142) | 8.01% (228) |
| photodetector | 0.03 | 39.56% (2,498) | 27.24% (277) | 34.42% (844) | 48.40% (1,377) |
| ultraviolet | 0.02 | 26.54% (1,676) | 23.01% (234) | 23.21% (569) | 30.69% (873) |
| 2d | 0.02 | 49.07% (3,098) | 45.53% (463) | 51.39% (1,260) | 48.33% (1,375) |
| transition metal dichalcogenides | 0.01 | 22.14% (1,398) | 28.22% (287) | 25.37% (622) | 17.19% (489) |
| nanometer | 0.01 | 31.66% (1,999) | 22.81% (232) | 26.92% (660) | 38.91% (1,107) |
| mos2 | 0.01 | 21.67% (1,368) | 30.38% (309) | 22.80% (559) | 17.57% (500) |
| exciton | 0.01 | 14.00% (884) | 18.49% (188) | 15.17% (372) | 11.39% (324) |
| heterostructure | 0.01 | 20.05% (1,266) | 12.49% (127) | 19.82% (486) | 22.95% (653) |
| zinc oxide | 0.01 | 7.95% (502) | 11.60% (118) | 7.06% (173) | 7.42% (211) |
| photoresponse | 0.01 | 33.45% (2,112) | 26.06% (265) | 29.69% (728) | 39.33% (1,119) |
| van der waals | 0.01 | 15.52% (980) | 7.57% (77) | 15.01% (368) | 18.80% (535) |
| wse2 | 0.01 | 12.58% (794) | 12.29% (125) | 13.62% (334) | 11.78% (335) |
| monolayer | 0.01 | 22.81% (1,440) | 31.96% (325) | 25.61% (628) | 17.12% (487) |
