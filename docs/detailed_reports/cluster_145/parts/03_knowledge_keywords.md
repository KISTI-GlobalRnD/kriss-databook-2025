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
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">37-174 - 자기나노입자 측정·표준</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">확장 가능</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.65</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">nanoparticles, particle, superparamagnetic iron oxide, hyperthermia, magnetite</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">EA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">8-144 - 콜로이드 양자점 광전소자</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">확장 가능</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.63</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">quantum dots, emission, zns, photoluminescence, nanocrystals</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">EA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">37-79 - 미세·나노입자 계측표준</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">확장 가능</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.61</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">nanoparticles, particle, silver, fabric, nanometer</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">EA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">28-55 - 플라즈몬 라만증강 분광</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">확장 가능</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.57</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">plasmon, molecule, nanoparticles, sers, gold</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">AA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">44-175 - 광섬유 플라즈몬 센서</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">unknown</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.45</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">surface plasmon resonance sensor, nanometer refractive index unit, photonic crystal fiber, surface plasmon resonance, refractive index</td>
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
| nanoparticle | 0.03 | 14.60% (539) | 17.69% (118) | 16.30% (228) | 11.87% (193) |
| nanoparticles | 0.03 | 36.73% (1,356) | 40.48% (270) | 38.74% (542) | 33.46% (544) |
| cancer | 0.02 | 45.26% (1,671) | 35.98% (240) | 43.75% (612) | 50.37% (819) |
| ultrasound | 0.02 | 35.29% (1,303) | 32.98% (220) | 34.02% (476) | 37.33% (607) |
| therapy | 0.01 | 49.32% (1,821) | 39.13% (261) | 44.89% (628) | 57.32% (932) |
| in vivo | 0.01 | 25.95% (958) | 19.94% (133) | 24.87% (348) | 29.34% (477) |
| tumor | 0.01 | 40.33% (1,489) | 24.44% (163) | 37.03% (518) | 49.69% (808) |
| imaging | 0.01 | 40.76% (1,505) | 37.93% (253) | 43.10% (603) | 39.91% (649) |
| gold | 0.01 | 20.83% (769) | 29.99% (200) | 22.44% (314) | 15.68% (255) |
| sonodynamic | 0.01 | 12.05% (445) | 4.35% (29) | 8.93% (125) | 17.90% (291) |
| cells | 0.01 | 34.70% (1,281) | 28.04% (187) | 32.02% (448) | 39.73% (646) |
| sdt | 0.01 | 9.34% (345) | 3.45% (23) | 6.93% (97) | 13.84% (225) |
| cavitation | 0.01 | 5.50% (203) | 7.65% (51) | 5.22% (73) | 4.86% (79) |
| dose enhancement | 0.00 | 4.90% (181) | 7.05% (47) | 5.93% (83) | 3.14% (51) |
| treatment | 0.00 | 37.00% (1,366) | 28.79% (192) | 32.67% (457) | 44.10% (717) |
