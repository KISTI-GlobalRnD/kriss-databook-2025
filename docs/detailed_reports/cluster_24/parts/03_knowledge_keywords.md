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
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">18-28 - 소각산란 구조측정</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">확장 가능</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.78</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">polymer, molecule, nanoparticle, particle, pore</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">AA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">18-44 - 블록공중합체 나노패턴 측정</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">unknown</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.53</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">small-angle scattering, thin film, copolymer, polymer, self assembly</td>
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
| limiting oxygen index | 1.73 | 37.34% (2,708) | 31.51% (426) | 34.35% (902) | 42.14% (1,380) |
| retardancy | 0.97 | 15.57% (1,129) | 17.09% (231) | 15.08% (396) | 15.33% (502) |
| retardant | 0.89 | 17.17% (1,245) | 13.17% (178) | 15.65% (411) | 20.03% (656) |
| flame retardant | 0.07 | 55.45% (4,022) | 49.33% (667) | 52.67% (1,383) | 60.21% (1,972) |
| composites | 0.03 | 35.61% (2,583) | 32.47% (439) | 33.78% (887) | 38.38% (1,257) |
| epoxy | 0.02 | 20.50% (1,487) | 16.94% (229) | 19.15% (503) | 23.05% (755) |
| smoke | 0.01 | 33.53% (2,432) | 22.56% (305) | 31.15% (818) | 39.97% (1,309) |
| intumescent | 0.01 | 12.82% (930) | 15.83% (214) | 14.36% (377) | 10.35% (339) |
| thermal | 0.01 | 46.24% (3,354) | 54.59% (738) | 47.91% (1,258) | 41.47% (1,358) |
| fabric | 0.01 | 10.92% (792) | 7.47% (101) | 9.79% (257) | 13.25% (434) |
| char | 0.01 | 32.14% (2,331) | 34.17% (462) | 32.86% (863) | 30.72% (1,006) |
| ul 94 | 0.01 | 21.85% (1,585) | 19.45% (263) | 20.14% (529) | 24.21% (793) |
| coating | 0.01 | 12.22% (886) | 10.13% (137) | 11.77% (309) | 13.44% (440) |
| cotton | 0.01 | 8.07% (585) | 5.47% (74) | 7.16% (188) | 9.86% (323) |
| montmorillonite | 0.01 | 4.65% (337) | 8.43% (114) | 4.84% (127) | 2.93% (96) |
