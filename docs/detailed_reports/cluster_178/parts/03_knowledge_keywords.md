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
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">11-158 - 그래핀 산화물·양자점 소재</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">핵심 역량</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.58</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">reduced graphene oxide, electrode, nanocomposite, nanoparticles, synthesis</td>
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
| sars-cov | 7.11 | 25.43% (1,041) | 0.00% (0) | 23.24% (346) | 32.03% (695) |
| point-of-care | 3.54 | 25.16% (1,030) | 26.44% (115) | 24.11% (359) | 25.62% (556) |
| detection | 0.02 | 37.15% (1,521) | 25.75% (112) | 33.58% (500) | 41.89% (909) |
| microfluidic | 0.01 | 20.86% (854) | 31.03% (135) | 23.10% (344) | 17.28% (375) |
| assay | 0.01 | 18.64% (763) | 19.77% (86) | 19.95% (297) | 17.51% (380) |
| biosensor | 0.01 | 20.35% (833) | 12.18% (53) | 16.12% (240) | 24.88% (540) |
| nanoparticles | 0.01 | 12.63% (517) | 12.18% (53) | 10.54% (157) | 14.15% (307) |
| antibody | 0.01 | 13.41% (549) | 5.29% (23) | 12.22% (182) | 15.85% (344) |
| sensing | 0.01 | 18.71% (766) | 14.48% (63) | 16.45% (245) | 21.11% (458) |
| disease | 0.01 | 15.83% (648) | 6.90% (30) | 16.59% (247) | 17.10% (371) |
| protein | 0.01 | 14.70% (602) | 8.74% (38) | 12.56% (187) | 17.37% (377) |
| flow | 0.01 | 16.66% (682) | 23.22% (101) | 17.86% (266) | 14.52% (315) |
| electrochemical | 0.01 | 17.90% (733) | 12.41% (54) | 14.91% (222) | 21.06% (457) |
| diagnostics | 0.01 | 11.68% (478) | 12.87% (56) | 12.63% (188) | 10.78% (234) |
| colorimetric | 0.01 | 14.07% (576) | 14.71% (64) | 14.17% (211) | 13.87% (301) |
