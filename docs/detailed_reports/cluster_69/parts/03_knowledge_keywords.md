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
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">34-185 - 테라헤르츠 메타물질 측정</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">확장 가능</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.91</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">terahertz, metamaterial, graphene, absorber, plasmon</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">EA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">19-118 - 테라헤르츠 계측</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">확장 가능</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.89</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">terahertz time domain, terahertz, time domain spectroscopy, imaging, detector</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">EA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">19-29 - 밀리·테라파 채널측정</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">확장 가능</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.87</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">antenna, frequency, transmission, band‑pass filter, ghz</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">EA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">11-15 - 전자파 차폐·흡수 복합재</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">확장 가능</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.85</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">nanocomposite, composite, carbon nanotube, electromagnetic interference shielding, polyaniline</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">EA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">19-129 - 마이크로파 유전특성 측정</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">확장 가능</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.76</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">microwave, rfid, sensing, resonator, permittivity</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">AA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">16-41 - 전기임피던스 단층영상</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">unknown</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.48</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">electrical impedance tomography, conductivity, image reconstruction, flow, particle</td>
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
| metasurface | 0.04 | 55.80% (3,791) | 37.07% (347) | 56.82% (1,429) | 60.28% (2,015) |
| polarization | 0.02 | 38.67% (2,627) | 37.82% (354) | 37.50% (943) | 39.78% (1,330) |
| wave | 0.01 | 37.87% (2,573) | 33.76% (316) | 38.05% (957) | 38.89% (1,300) |
| beam | 0.01 | 26.60% (1,807) | 22.97% (215) | 27.83% (700) | 26.68% (892) |
| terahertz | 0.01 | 11.41% (775) | 5.34% (50) | 9.82% (247) | 14.30% (478) |
| orbital angular momentum | 0.01 | 3.87% (263) | 1.82% (17) | 4.06% (102) | 4.31% (144) |
| angle | 0.01 | 15.26% (1,037) | 16.45% (154) | 14.55% (366) | 15.47% (517) |
| mode | 0.01 | 13.01% (884) | 8.01% (75) | 12.52% (315) | 14.78% (494) |
| acoustic | 0.01 | 10.97% (745) | 10.58% (99) | 10.62% (267) | 11.34% (379) |
| imaging | 0.01 | 22.34% (1,518) | 19.66% (184) | 20.60% (518) | 24.41% (816) |
| resonance | 0.01 | 12.58% (855) | 8.33% (78) | 12.25% (308) | 14.03% (469) |
| light | 0.01 | 32.62% (2,216) | 35.90% (336) | 33.80% (850) | 30.81% (1,030) |
| metamaterial | 0.01 | 12.83% (872) | 13.68% (128) | 13.68% (344) | 11.97% (400) |
| transmission | 0.00 | 18.34% (1,246) | 15.60% (146) | 19.01% (478) | 18.61% (622) |
| sound absorption | 0.00 | 3.77% (256) | 2.56% (24) | 2.82% (71) | 4.82% (161) |
