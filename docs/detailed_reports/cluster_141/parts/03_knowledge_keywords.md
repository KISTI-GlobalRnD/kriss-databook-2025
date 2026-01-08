## 3. 지식기반 인접 클러스터·키워드

### 3-1. 지식기반 인접 클러스터(EA/AA)

용어: ego는 현재 클러스터, alter는 유사도 기준으로 연결된 이웃 클러스터를 뜻합니다.
표의 `구분`은 EA(ego–alter) / AA(alter–alter) 로 표기합니다.

확장 가능 유형 클러스터로, 핵심 역량 앵커는 8-11 - 비풀러렌 유기태양전지(0.81) 로 확인됩니다. KRISS 최근 5개년 기준에서 핵심 역량 기준 3조건 중 부족한 축은 RTA·N_docs·Excellence10입니다.

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
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">8-11 - 비풀러렌 유기태양전지</td>
<td style="text-align: left; vertical-align: top; white-space: nowrap;">핵심 역량</td>
<td style="text-align: right; vertical-align: top; white-space: nowrap;">0.81</td>
<td style="text-align: left; vertical-align: top; word-break: break-word; hyphens: auto;">non-fullerene, polymer, power conversion efficiency, acceptor, donor</td>
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
| self-powered | 0.19 | 6.87% (1,017) | 3.79% (76) | 6.68% (366) | 7.85% (575) |
| sensing | 0.03 | 37.13% (5,500) | 25.57% (513) | 35.21% (1,929) | 41.72% (3,058) |
| pressure | 0.01 | 25.03% (3,708) | 18.59% (373) | 24.28% (1,330) | 27.36% (2,005) |
| sensors | 0.01 | 47.26% (7,001) | 34.50% (692) | 45.91% (2,515) | 51.77% (3,794) |
| electrode | 0.01 | 19.75% (2,925) | 16.00% (321) | 20.52% (1,124) | 20.19% (1,480) |
| wearable | 0.01 | 31.67% (4,692) | 17.15% (344) | 31.71% (1,737) | 35.63% (2,611) |
| flexible | 0.01 | 32.04% (4,746) | 19.94% (400) | 30.34% (1,662) | 36.62% (2,684) |
| nanogenerator | 0.01 | 6.15% (911) | 3.34% (67) | 5.70% (312) | 7.26% (532) |
| tactile | 0.01 | 8.99% (1,332) | 7.03% (141) | 8.69% (476) | 9.76% (715) |
| strain | 0.01 | 17.69% (2,621) | 12.91% (259) | 17.93% (982) | 18.83% (1,380) |
| skin | 0.00 | 20.10% (2,977) | 14.01% (281) | 21.05% (1,153) | 21.05% (1,543) |
| semg | 0.00 | 4.83% (716) | 2.69% (54) | 4.53% (248) | 5.65% (414) |
| triboelectric | 0.00 | 7.49% (1,110) | 3.84% (77) | 6.72% (368) | 9.07% (665) |
| force | 0.00 | 13.76% (2,038) | 15.70% (315) | 13.58% (744) | 13.36% (979) |
| electromyography | 0.00 | 7.49% (1,110) | 4.59% (92) | 6.94% (380) | 8.71% (638) |
