## 3. 지식기반 인접 클러스터·키워드

### 3-1. 지식기반 인접 클러스터(EA/AA)

용어: ego는 현재 클러스터, alter는 유사도 기준으로 연결된 이웃 클러스터를 뜻합니다.
표의 `구분`은 EA(ego–alter) / AA(alter–alter) 로 표기합니다.

확장 가능 유형 클러스터로, 핵심 역량 앵커는 34-69 - 메타표면 광학소자(0.85) 로 확인됩니다. KRISS 최근 5개년 기준에서 핵심 역량 기준 3조건 중 부족한 축은 RTA·N_docs·Excellence10입니다.

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
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.95</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">terahertz, metamaterial, graphene, absorber, plasmon</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">EA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">19-118 - 테라헤르츠 계측</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">확장 가능</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.91</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">terahertz time domain, terahertz, time domain spectroscopy, imaging, detector</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">EA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">19-29 - 밀리·테라파 채널측정</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">확장 가능</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.89</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">antenna, frequency, transmission, band‑pass filter, ghz</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">EA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">34-69 - 메타표면 광학소자</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">핵심 역량</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.85</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">metasurface, polarization, wave, beam, terahertz</td>
</tr>
<tr>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">EA</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">19-129 - 마이크로파 유전특성 측정</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">확장 가능</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.78</td>
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
| nanocomposite | 0.05 | 25.75% (1,305) | 30.73% (271) | 30.69% (562) | 20.05% (472) |
| composite | 0.05 | 64.67% (3,277) | 61.90% (546) | 64.50% (1,181) | 65.85% (1,550) |
| carbon nanotube | 0.03 | 21.20% (1,074) | 21.43% (189) | 21.41% (392) | 20.94% (493) |
| electromagnetic interference shielding | 0.02 | 47.09% (2,386) | 35.60% (314) | 46.31% (848) | 52.00% (1,224) |
| polyaniline | 0.02 | 18.02% (913) | 32.65% (288) | 21.03% (385) | 10.20% (240) |
| reduced graphene oxide | 0.02 | 12.39% (628) | 11.22% (99) | 14.47% (265) | 11.21% (264) |
| conductivity | 0.01 | 41.50% (2,103) | 40.48% (357) | 42.44% (777) | 41.16% (969) |
| synthesis | 0.01 | 13.72% (695) | 21.09% (186) | 14.91% (273) | 10.03% (236) |
| absorption | 0.01 | 51.98% (2,634) | 47.62% (420) | 50.25% (920) | 54.97% (1,294) |
| nanoparticles | 0.01 | 20.43% (1,035) | 24.04% (212) | 21.30% (390) | 18.39% (433) |
| polypyrrole | 0.01 | 4.60% (233) | 5.33% (47) | 4.86% (89) | 4.12% (97) |
| polymer | 0.01 | 24.75% (1,254) | 28.57% (252) | 26.82% (491) | 21.71% (511) |
| mwcnt | 0.01 | 10.05% (509) | 11.45% (101) | 11.80% (216) | 8.16% (192) |
| decibel | 0.01 | 67.79% (3,435) | 54.20% (478) | 65.16% (1,193) | 74.94% (1,764) |
| mxene | 0.00 | 8.60% (436) | 0.11% (1) | 5.79% (106) | 13.98% (329) |
