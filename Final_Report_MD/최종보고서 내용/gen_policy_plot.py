import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path
import os

# -----------------------------
# 폰트 설정 (Windows 기준)
# -----------------------------
plt.rcParams["font.family"] = "Malgun Gothic"
plt.rcParams["axes.unicode_minus"] = False


color_map = {
    "KRISS": "orange",
    "NIST": "#0033A0",
    "NIM": "#DE2910",
    "NMIJ/AIST": "#FF7F7F",
    "NPL": "#00247D",
    "BAM": "#000000",
    "PTB": "#FFCC00",
    "NRC": "#FF0000",
    "INRIM": "#009246",
    "NPLI": "#FF9933",
}
inst_order = list(color_map.keys())

path = r"D:\내 드라이브\Work_at_KISTI\2025 KRISS 수탁사업\2) 주요 국가 및 연구기관의 성과수준 분석\df_exp2.csv"
df = pd.read_csv(path, encoding="utf-8-sig")

# -----------------------------
# (1) inst 추출 & 필터
# -----------------------------
df["inst"] = (
    df["public_name"].astype(str)
    .str.extract(r"\[([^\[\]]+)\]")[0]
    .str.strip()
)
df = df[df["inst"].isin(inst_order)].copy()

# -----------------------------
# (2) 기존 division_v2 제거
# -----------------------------
if "division_v2" in df.columns:
    df = df.drop(columns=["division_v2"])

# -----------------------------
# (3) cluster_micro로 primary_division_v2 붙이기
# -----------------------------
path_cluster_div = Path(
    r"D:\내 드라이브\Work_at_KISTI\2025 KRISS 수탁사업\1) WoS 기반 분석용 데이터셋 구축\클러스터 라벨링\kriss_cluster_division_expanded.csv"
)

cluster_div = pd.read_csv(path_cluster_div, encoding="utf-8-sig")

# 필요한 컬럼만
need_cols = ["cluster_micro", "primary_division_v2"]
miss = [c for c in need_cols if c not in cluster_div.columns]
if miss:
    raise ValueError(f"cluster_div 파일에 컬럼이 없습니다: {miss}")

# cluster_micro가 중복일 수 있으니 (cluster_micro -> primary_division_v2) 1개로 정리
# 기본: 동일 cluster_micro에 라벨이 여러 개면 최빈값(mode) 사용
map_df = (
    cluster_div[need_cols]
    .dropna(subset=["cluster_micro"])
    .assign(primary_division_v2=lambda x: x["primary_division_v2"].astype(str).str.strip())
)

def _mode_or_first(s):
    s = s.dropna()
    if s.empty:
        return np.nan
    m = s.mode()
    return m.iloc[0] if len(m) else s.iloc[0]

cluster_map = (
    map_df.groupby("cluster_micro")["primary_division_v2"]
    .apply(_mode_or_first)
    .reset_index()
)

# df에 merge
if "cluster_micro" not in df.columns:
    raise ValueError("df에 cluster_micro 컬럼이 없습니다. df_exp2.csv에 cluster_micro가 있어야 매칭 가능합니다.")

df = df.merge(cluster_map, on="cluster_micro", how="left")

# 이제 division_v2 대신 primary_division_v2를 사용
df["division_v2"] = df["primary_division_v2"]

# (선택) 매칭 안 된 값 확인
unmatched = df["division_v2"].isna().mean()
print(f"[체크] division_v2(=primary_division_v2) 결측 비율: {unmatched:.2%}")



df["division_v2"] = df["division_v2"].replace({
    "물리측정본부": "물리측정",
    "화학소재측정본부": "화학소재측정",
    "바이오의료측정본부": "바이오의료측정",
    "양자기술연구소": "양자기술",
})

areas = ["전체", "물리측정", "화학소재측정", "바이오의료측정", "양자기술"]

# 집계(기관×영역, unique uid 기준)
records = []
for inst in inst_order:
    dfi = df[df["inst"] == inst]

    # 전체
    total_uids = pd.Index(dfi["uid"]).dropna().unique()
    policy_uids = pd.Index(dfi.loc[dfi["is_metrol_policy"] == 1, "uid"]).dropna().unique()
    total_n = len(total_uids)
    policy_n = len(policy_uids)
    ratio = (policy_n / total_n) if total_n > 0 else np.nan
    records.append({"inst": inst, "area": "전체", "total_n": total_n, "policy_n": policy_n, "ratio": ratio})

    # 4개 영역
    for a in areas[1:]:
        dfa = dfi[dfi["division_v2"] == a]
        total_uids = pd.Index(dfa["uid"]).dropna().unique()
        policy_uids = pd.Index(dfa.loc[dfa["is_metrol_policy"] == 1, "uid"]).dropna().unique()
        total_n = len(total_uids)
        policy_n = len(policy_uids)
        ratio = (policy_n / total_n) if total_n > 0 else np.nan
        records.append({"inst": inst, "area": a, "total_n": total_n, "policy_n": policy_n, "ratio": ratio})

res = pd.DataFrame(records)

plot_areas = ["전체", "물리측정", "화학소재측정", "바이오의료측정", "양자기술"]

top_insts = inst_order[:5]
bot_insts = inst_order[5:]

def plot_panel(ax, insts, panel_title):
    gap = 1.2
    pos = 0.0

    xs, ys, cs, tick_pos, tick_lab, labels, area_for_bar = [], [], [], [], [], [], []

    group_centers = []
    for inst in insts:
        start = pos
        for a in plot_areas:
            row = res[(res["inst"] == inst) & (res["area"] == a)].iloc[0]
            policy_n = int(row["policy_n"])
            total_n = int(row["total_n"])
            ratio = row["ratio"]

            xs.append(pos)
            ys.append(ratio)
            cs.append(color_map[inst])
            area_for_bar.append(a)  # alpha 결정용

            tick_pos.append(pos)
            tick_lab.append(a)

            if total_n > 0 and pd.notna(ratio):
                labels.append(f"{policy_n}/{total_n}\n({ratio*100:.1f}%)")
            else:
                labels.append("0/0\n(NA)")

            pos += 1.0

        end = pos - 1.0
        group_centers.append(((start + end) / 2.0, inst))
        pos += gap

    bars = ax.bar(xs, ys, color=cs, edgecolor="none")

    # (추가) 전체 bar 제외 투명도 20% (= alpha 0.8)
    for b, a in zip(bars, area_for_bar):
        b.set_alpha(1.0 if a == "전체" else 0.8)

    # bar 위 라벨
    for b, txt in zip(bars, labels):
        h = b.get_height()
        if np.isnan(h):
            continue
        ax.text(
            b.get_x() + b.get_width() / 2,
            h + 0.015,
            txt,
            ha="center",
            va="bottom",
            fontsize=8,
            linespacing=0.9
        )

    ax.set_ylim(0, 1)
    ax.set_ylabel("정책부합 논문비율")
    ax.set_title(panel_title)

    ax.set_xticks(tick_pos)
    ax.set_xticklabels(tick_lab, rotation=30, ha="right")
    ax.grid(axis="y", alpha=0.25)

    # (수정) 기관명은 그래프 위쪽(축 상단 바깥)에, 폰트 +2, bold
    # x는 데이터 좌표, y는 축 비율(1.02 = 상단 바깥)
    for center_x, inst in group_centers:
        ax.text(
            center_x, 1.03, inst,
            transform=ax.get_xaxis_transform(),
            ha="center", va="bottom",
            fontsize=12, fontweight="bold"
        )

fig, axes = plt.subplots(2, 1, figsize=(20, 10), sharey=True)
plot_panel(axes[0], top_insts, "")
plot_panel(axes[1], bot_insts, "")

fig.suptitle(
    "기관별 정책부합 논문비율: 전체 및 4개 영역 (기관-영역별 정책부합 논문수 / 기관-영역별 논문수, 2020~2024 5개년)",
    y=0.995,
    fontsize=16,          # 필요하면 더 키우세요
    fontweight="bold"
)


# 상단 기관명이 잘리지 않도록 위쪽 여백 확보
plt.tight_layout(rect=[0, 0, 1, 0.97])
plt.show()

import os

save_dir = r"D:\내 드라이브\Work_at_KISTI\2025 KRISS 수탁사업\2) 주요 국가 및 연구기관의 성과수준 분석\기관 성과 수준 분석\정책부합"
os.makedirs(save_dir, exist_ok=True)

# 상단 기관명이 잘리지 않도록 위쪽 여백 확보
plt.tight_layout(rect=[0, 0, 1, 0.97])

fig.savefig(os.path.join(save_dir, "01_기관별_정책부합비율_전체+4개영역.png"), dpi=300, bbox_inches="tight")
plt.show()

#%%
# ============================================================
# [추가] policy_classes(5개 카테고리) 기준: 영역별(전체+4) 그림 5개 저장
# - 분모: 기관-영역별 전체 논문수 (unique uid)
# - 분자: 기관-영역별 "카테고리 x" 정책부합 논문수 (unique uid)
#         = (is_metrol_policy==1) & (policy_class_plot==카테고리) 의 unique uid
# - 표시 카테고리: 기후·환경 / 보건·보건안보 / 산업혁신 / 식품·물·안전 / 에너지
# ============================================================

import os

# 0) 저장 폴더 (이미 위에서 만들었다면 중복 실행돼도 문제 없음)
save_dir = r"D:\내 드라이브\Work_at_KISTI\2025 KRISS 수탁사업\2) 주요 국가 및 연구기관의 성과수준 분석\기관 성과 수준 분석\정책부합"
os.makedirs(save_dir, exist_ok=True)

# 1) policy_classes -> 그림 표시용 라벨 파생변수 만들기
df["policy_class_plot"] = (
    df["policy_classes"]
    .astype("string")
    .str.replace(r"\s*Metrology\s*$", "", regex=True)  # 끝의 'Metrology' 제거(있으면)
    .str.strip()
)

policy_label_map = {
    "기후·환경 정책 지원": "기후·환경",
    "보건·보건안보 정책 지원": "건강",
    "산업혁신·첨단제조 정책 지원": "첨단제조",
    "식품·물·소비자 안전 정책 지원": "식품",
    "에너지 전환·에너지안보 정책 지원": "(재생)에너지",
}
df["policy_class_plot"] = df["policy_class_plot"].replace(policy_label_map)

# 2) 그림에서 사용할 카테고리 순서(고정)
cat_order = ["기후·환경", "건강", "첨단제조", "식품", "(재생)에너지"]

# 3) 영역별 집계 테이블 만들기 (기관×카테고리)
def build_cat_table_for_area(area_name: str) -> pd.DataFrame:
    rows = []
    for inst in inst_order:
        dfi = df[df["inst"] == inst]
        if area_name != "전체":
            dfi = dfi[dfi["division_v2"] == area_name]

        # 분모: 기관-영역 전체 논문수(unique uid)
        denom_uids = pd.Index(dfi["uid"]).dropna().unique()
        denom_n = len(denom_uids)

        for cat in cat_order:
            dcat = dfi[
                (dfi["is_metrol_policy"] == 1) &
                (dfi["policy_class_plot"].notna()) &
                (dfi["policy_class_plot"] == cat)
            ]
            numer_uids = pd.Index(dcat["uid"]).dropna().unique()
            numer_n = len(numer_uids)

            ratio = (numer_n / denom_n) if denom_n > 0 else np.nan

            rows.append({
                "inst": inst,
                "area": area_name,
                "cat": cat,
                "denom_n": denom_n,
                "numer_n": numer_n,
                "ratio": ratio
            })

    out = pd.DataFrame(rows)

    # (안전장치) 혹시 데이터에 없는 카테고리가 있어도 0으로 표시되게 보정
    # - denom_n은 기관-영역 기준이라 그대로 두고, numer_n=0, ratio=0 처리
    #   (denom_n==0이면 ratio는 NaN 유지)
    if not out.empty:
        mask_missing = out["numer_n"].isna()
        out.loc[mask_missing, "numer_n"] = 0
        out.loc[(out["denom_n"] > 0) & mask_missing, "ratio"] = 0.0

    return out

# 4) 영역 1개당 figure 1개 (2패널: 위 5기관 / 아래 5기관)
def plot_cat_panel(ax, data_area: pd.DataFrame, insts, panel_title: str):
    gap = 1.2
    pos = 0.0

    xs, ys, cs, tick_pos, tick_lab, labels = [], [], [], [], [], []
    group_centers = []

    for inst in insts:
        start = pos
        di = data_area[data_area["inst"] == inst].set_index("cat")

        for cat in cat_order:
            row = di.loc[cat]
            numer_n = int(row["numer_n"])
            denom_n = int(row["denom_n"])
            ratio = row["ratio"]

            xs.append(pos)
            ys.append(ratio)
            cs.append(color_map[inst])

            tick_pos.append(pos)
            tick_lab.append(cat)

            if denom_n > 0 and pd.notna(ratio):
                labels.append(f"{numer_n}/{denom_n}\n({ratio*100:.1f}%)")
            else:
                labels.append("0/0\n(NA)")

            pos += 1.0

        end = pos - 1.0
        group_centers.append(((start + end) / 2.0, inst))
        pos += gap

    bars = ax.bar(xs, ys, color=cs, edgecolor="none")

    # bar 위 라벨
    for b, txt in zip(bars, labels):
        h = b.get_height()
        if np.isnan(h):
            continue
        ax.text(
            b.get_x() + b.get_width() / 2,
            h + 0.015,
            txt,
            ha="center",
            va="bottom",
            fontsize=8,
            linespacing=0.9
        )

    ax.set_ylim(0, 1)
    ax.set_ylabel("카테고리별 정책부합 논문비율")
    ax.set_title(panel_title)

    ax.set_xticks(tick_pos)
    ax.set_xticklabels(tick_lab, rotation=30, ha="right")
    ax.grid(axis="y", alpha=0.25)

    # 기관명: 그래프 위쪽(축 상단 바깥), +2, bold
    for center_x, inst in group_centers:
        ax.text(
            center_x, 1.03, inst,
            transform=ax.get_xaxis_transform(),
            ha="center", va="bottom",
            fontsize=12, fontweight="bold"
        )

def make_and_save_cat_figure(area_name: str):
    data_area = build_cat_table_for_area(area_name)

    fig2, axes2 = plt.subplots(2, 1, figsize=(20, 10), sharey=True)

    plot_cat_panel(axes2[0], data_area, top_insts, "")
    plot_cat_panel(axes2[1], data_area, bot_insts, "")

    fig2.suptitle(
        f"{area_name} 영역: 기관별 카테고리 정책부합 논문비율 (기관-영역-카테고리별 정책부합 논문수 / 기관-영역별 전체 논문수, 2020~2024 5개년)",
        y=0.995,
        fontsize=16,
        fontweight="bold"
    )

    plt.tight_layout(rect=[0, 0, 1, 0.97])

    fname = f"02_{area_name}_기관별_카테고리정책부합비율.png"
    fig2.savefig(os.path.join(save_dir, fname), dpi=300, bbox_inches="tight")
    plt.show()

# 5) 전체+4개영역 = 총 5개 figure 저장
for area_name in ["전체", "물리측정", "화학소재측정", "바이오의료측정", "양자기술"]:
    make_and_save_cat_figure(area_name)

