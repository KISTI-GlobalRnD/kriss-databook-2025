## 표준연구 분야의 주요 국가 및 기관명 표준화 및 문헌 연계

여기서는 앞 단계에서 최종 구축한 ‘표준과학연구 문헌 집합’을 기관 단위로 해석·분석할 수 있도록, Web of Science(WoS) 데이터의 정규화된 기관명(pref_name)과 기관국가명(org_country) 정보를 문헌 단위로 결합하고, 표준과학 영역의 주요 국가 및 기관을 중심으로 기관명 표준화 및 문헌 연계를 수행하고자 한다. 

주요 기관 후보를 추리기 위해 WoS/Incites 기관 데이터의 기관 유형(Organization Type) 정보를 사용했고, 기관 유형이 ‘Academic System’ 또는 ‘Healthcare System’인 행을 제거했다. 이후 잔여 기관을 대상으로 논문 수 기준 상위 500개 기관을 우선 추출했다. 이때 정규화된 기관명(pref_name)이 부여되지 못한 기관은 WoS/Incites 상에서 기관 식별이 충분히 이루어지지 않았거나 성과가 제한적이라고 간주하여 주요 기관 후보에서 제외했다. 기관별 논문 수는 full count 방식으로 산정했다. 즉, 1편의 논문에 복수 저자와 복수 기관이 존재하더라도, 해당 논문에 등장하는 각 기관의 기여를 저자 수와 무관하게 1로 계산했다. 예를 들어 논문 A의 저자가 KRISS 소속 2명, NIST 소속 1명으로 구성되어도 KRISS 1편, NIST 1편으로 집계했다.

기관 유형이 ‘government’로 분류된 기관 가운데에서도 실제로는 연구를 직접 수행하기보다는 연구 지원·관리·조정 또는 정책·재정 기능을 수행하는 기관이 포함될 수 있다. 따라서 UK Research & Innovation(UKRI), Department of Science & Technology(India), Japan Science & Technology Agency(JST), United States Navy, United States Department of Defense(DoD), Department of Space(DoS) Government of India, National Aeronautics & Space Administration(NASA), Ministry of Education & Science of Ukraine, United States Department of Energy(DOE), Egyptian Knowledge Bank(EKB), Academy of Scientific & Innovative Research(AcSIR)은 ‘직접 연구를 수행하지 않는 기관’으로 간주하고 표준과학 영역 연구기관 목록에서 제외했다. 또한 기관 유형이 ‘Nonprofit’ 또는 ‘Partnership’인 기관 중 Helmholtz Association은 다수 Helmholtz 센터(DESY, HZB, GSI 등)를 포괄하는 연합체(umbrella) 성격이 강하므로 단일 연구 수행기관으로 보기 어렵다고 판단해 제외했다. 추가로 University of Chinese Academy of Sciences와 University of Science & Technology of China는 Chinese Academy of Sciences(CAS)의 하위 기관으로 간주하여 주요 연구기관 목록에서 제외했다.

한편 앞 단계에서 수행한 ‘① BIPM 정회원국의 표준과학연구 전문 연구기관 목록을 활용하여 해당 기관들이 발간한 산출 문헌을 추출’ 과정에서 얻은 BIPM 정회원국 대표 연구기관 60개의 기관-논문 매칭 정보는 그대로 활용하였다. 

이상의 절차를 종합한 결과, 표준과학 연구 영역 문헌 집합의 1,099,738개 문헌 중 표준과학 영역의 주요 연구기관 533개가 생산한 문헌 790,227개를 식별했고, 정규화된 기관명(pref_name) 기준의 기관명 표준화와 문헌 연계를 구축했다. 이는 기관별 연구성과 비교와 기관 단위 연구 프로파일 분석을 수행하기 위한 기초 데이터셋으로 활용된다.
