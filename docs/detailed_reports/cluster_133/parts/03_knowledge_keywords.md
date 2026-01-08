## 3. 지식기반 인접 클러스터·키워드

### 3-1. 지식기반 인접 클러스터(EA/AA)

용어: ego는 현재 클러스터, alter는 유사도 기준으로 연결된 이웃 클러스터를 뜻합니다.
표의 `구분`은 EA(ego–alter) / AA(alter–alter) 로 표기합니다.

역량 공백 유형 클러스터로, RTA ≥ 1 기관은 BAM, INRIM, NRC, PTB로 제시됩니다. KRISS 최근 5개년 기준에서 핵심 역량 기준 3조건 중 부족한 축은 RTA·N_docs·Excellence10입니다.

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
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">17-47 - 금속 적층제조 계측</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">확장 가능</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.49</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">laser powder bed fusion, powder bed fusion, mechanical properties, welding, microstructure</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">AA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">17-143 - 초합금 상평형·확산 설계</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">확장 가능</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.77</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">superalloys, nickel, aluminum, single crystal superalloy, titanium</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">AA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">17-27 - 수소취성 파괴 측정</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">핵심 역량</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.75</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">hydrogen, steel, cracking, welding, corrosion</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">AA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">3-4 - 나노압입 역학 측정</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">확장 가능</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.72</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">mechanical properties, indentation, copper, ceramic, hardness</td>
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
| 3d printing | 0.03 | 26.84% (1,255) | 12.97% (117) | 24.87% (445) | 34.93% (693) |
| composite | 0.02 | 18.03% (843) | 16.85% (152) | 18.50% (331) | 18.15% (360) |
| hydroxyapatite | 0.01 | 13.03% (609) | 16.41% (148) | 12.69% (227) | 11.79% (234) |
| polymer | 0.01 | 14.95% (699) | 11.75% (106) | 15.26% (273) | 16.13% (320) |
| dental | 0.01 | 15.94% (745) | 21.84% (197) | 16.83% (301) | 12.45% (247) |
| bone | 0.01 | 16.11% (753) | 18.85% (170) | 15.76% (282) | 15.17% (301) |
| titanium | 0.01 | 8.43% (394) | 12.31% (111) | 9.28% (166) | 5.90% (117) |
| nanoparticles | 0.01 | 11.94% (558) | 11.86% (107) | 12.86% (230) | 11.14% (221) |
| calcium phosphate | 0.01 | 8.17% (382) | 13.41% (121) | 7.77% (139) | 6.15% (122) |
| scaffolds | 0.01 | 8.83% (413) | 6.87% (62) | 8.94% (160) | 9.63% (191) |
| robot | 0.01 | 7.94% (371) | 3.66% (33) | 7.66% (137) | 10.13% (201) |
| coating | 0.01 | 6.72% (314) | 8.20% (74) | 6.82% (122) | 5.95% (118) |
| antibacterial | 0.00 | 9.37% (438) | 8.54% (77) | 10.45% (187) | 8.77% (174) |
| remineralization | 0.00 | 3.72% (174) | 4.32% (39) | 4.19% (75) | 3.02% (60) |
| resin | 0.00 | 11.53% (539) | 13.53% (122) | 11.29% (202) | 10.84% (215) |
