## 5. 정책부합성(분포)

정책부합성은 문헌(제목+초록) 기반 분류 결과의 **분포**를 요약한 것으로, 본 간이 리포트에서는 ‘비율/건수’만을 제시합니다(인과·정당화 단정 금지).

### 5-1. 분포(비율%/건수)

| 정책 카테고리 | 비율(%) | 건수(편) |
|---|---:|---:|
| 기후·환경 정책 지원 측정 과학 | 0.00 | 0 |
| 보건·보건안보 정책 지원 측정 과학 | 84.52 | 35 |
| 식품·물·소비자 안전 정책 지원 측정 과학 | 0.00 | 0 |
| 에너지 전환·에너지안보 정책 지원 측정 과학 | 0.00 | 0 |
| 산업혁신·첨단제조 정책 지원 측정 과학 | 15.48 | 6 |
| 미분류 |  | 7 |
| 합계 |  | 42 |
| 기준 문헌 수 |  | 49 |

### 5-2. 정책부합성 해석
이 클러스터는 뇌파(EEG; electroencephalography) 등 생체신호로 감정 상태를 정량 인식하는 측정을 다루며, 문헌 분류 결과 `보건·보건안보 정책 지원 측정 과학` 영역이 84.52%(35편) 로 가장 높은 비중을 차지합니다. 두피 전극 기반 신호의 잡음·유artifact를 줄이고, 사람·세션 간 변동을 견디는 분류·회귀 모델로 감정 레이블을 산출하는 흐름이 사람의 상태 측정과 직접 연결되기 때문입니다. 다음으로 `산업혁신·첨단제조 정책 지원 측정 과학`이 15.48%(6편) 인데, 웨어러블 저채널 장치와 실시간 처리 같은 시스템 구현 요소가 포함되어 장치·플랫폼 관점의 연구와 맞닿습니다.

구체적으로 분류 근거 문헌에는 `a wearable ECG sensor, data storage and data analysis in a big data platform, and health advisory services`처럼 웨어러블 센서 신호를 저장·분석해 건강관리 서비스로 이어지는 구성이 포함되어, 생체신호 기반 상태판독을 보건 영역의 측정 문제로 연결합니다.

다만 이 결과는 문헌(제목+초록) 기반 단일 분류와 49편 중 42편의 분류 범위에 따라 달라질 수 있으므로, 복수 라벨 적용 여부와 전문 분류 기준을 함께 검토할 필요가 있습니다.

### 5-3. 분류 근거 예시
형식: `연도 · 정책 분야 · 측정 축 · 제목` — 초록 발췌 (제목은 굵게, 발췌문은 이탤릭).- 2021 · 보건·보건안보 정책 지원 측정 과학 · Electricity and Magnetism(EM) · <strong>Big-ECG: Cardiographic Predictive Cyber-Physical System for Stroke Management</strong> — <em>…age 75.4 years old, 38% men). We recorded ECG(electrocardiogram) at resting state using a single-channel ECG patch within three months of diagnosis of ischemic stroke (clinically confirmed). In statistical results, ECG fiducial features, RR-I, QRS, QT, ST, and heart rate variability(HRV; heart rate variability) features, SDSD, LF/HF, LF/(LF + HF), and HF/(LF + HF) are observed as significantly…</em>- 2024 · 보건·보건안보 정책 지원 측정 과학 · Photometry and Radiometry(PR) · <strong>AAPM Task Group Report 311: Guidance for performance evaluation of fluorescence-guided surgery systems</strong> — <em>The last decade has seen a large growth in fluorescence-guided surgery(FGS; fluorescence-guided surgery) imaging and interventions. With the increasing number of clinical specialties implementing FGS, the range of systems with radically different physical designs, image processing approaches, and performance requirements is expanding. This variety of systems makes it nearly…</em>

관련도 해석 메모: 특정 카테고리의 비율/건수가 높다는 것은 해당 축으로 분류된 문헌이 상대적으로 많음을 의미합니다. 다만 분류 기준·모호성·복수 라벨 여부에 따라 분포가 달라질 수 있어, 상세 리포팅에서는 클러스터 스코프(기술/응용) 와 함께 교차 검토하는 것이 안전합니다.
