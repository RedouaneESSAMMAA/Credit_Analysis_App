from data.snowflake_utils import get_session, get_all_tables
import pandas as pd

session = get_session()

try:
    dfs = get_all_tables(session)
finally:
    session.close()


data1 = dfs["ANALYTICS.MART_CREDIT_AMOUNT_DURATION"]
data2 = dfs["ANALYTICS.MART_CREDIT_DETAILS"]
data3 = dfs["ANALYTICS.MART_CREDIT_OVERVIEW"]
data4 = dfs["ANALYTICS.MART_CREDIT_RISK_BY_PROFILE"]

data_radar = pd.read_csv("data/cluster_radar_data.csv")
data_clusters = pd.read_csv("data/cluster_summary.csv")

#Add age categories:
data2["AGE_CATEGORIES"] = pd.cut(
    data2["AGE"],
    bins=[19, 30, 42, 54, 65, float("inf")],
    labels=["19-29", "30-41", "42-53", "54-64", "65+"],
    right=False
)

#Purpose Analysis data:
purpose_analysis = pd.concat(
    [
        data2["PURPOSE"].value_counts().rename("APPLICANT_COUNT"),
        data2[data2["CREDIT_RISK"] == "high"]["PURPOSE"]
            .value_counts()
            .rename("HIGH_RISK_APPLICANTS"),
    ],
    axis=1
).fillna(0)

purpose_analysis["HIGH_RISK_RATE"] = (
    purpose_analysis["HIGH_RISK_APPLICANTS"]
    / purpose_analysis["APPLICANT_COUNT"]
    * 100
).round(1)

purpose_analysis = purpose_analysis.sort_values(
    "HIGH_RISK_RATE", ascending=False
)


global_data = {
    'global_data' : {
        'total_applicants': "{:,d}".format(int(data3["TOTAL_APPLICANTS"][0])),
        'good_applicants': "{:,d}".format(int(data2["CREDIT_RISK"].value_counts().values[0])),
        'good_applicants_pct': "{:,d}%".format(int(data2["CREDIT_RISK"].value_counts().values[0]/data2.shape[0]*100)),
        'bad_applicants': "{:,d}".format(int(data2["CREDIT_RISK"].value_counts().values[1])),
        'bad_applicants_pct': "{:,d}%".format(int(data2["CREDIT_RISK"].value_counts().values[1]/data2.shape[0]*100)),
        'average_credit': "${:,.2f}".format(float(data3["AVG_CREDIT_AMOUNT"][0]))
    },
    'chart_data' : {
        'chart1' : {
            'type': 'bar',
            'label': '',
            'labels': data2[data2["CREDIT_RISK"] == "high"]["AGE_CATEGORIES"].value_counts().index.tolist(),
            'values': data2[data2["CREDIT_RISK"] == "high"]["AGE_CATEGORIES"].value_counts().values.tolist()
        },
        'chart2': {
            'type': 'bar',
            'label': '',
            'labels': data2.JOB.value_counts().index.tolist(),
            'values': data2.JOB.value_counts().values.tolist()
        },
        'chart3': {
            'type': 'doughnut',
            'label': '',
            'labels': data2.PURPOSE.value_counts().index.tolist(),
            'values': data2.PURPOSE.value_counts().values.tolist()
        },
        'chart4': {
            'names': list(dict.fromkeys(data2.groupby("CREDIT_RISK")["PROPERTY"].value_counts().index.get_level_values("CREDIT_RISK").tolist())),
            'labels': list(dict.fromkeys(data2.groupby("CREDIT_RISK")["PROPERTY"].value_counts().index.get_level_values("PROPERTY").tolist())),
            'values': data2.groupby("CREDIT_RISK")["PROPERTY"].value_counts().values.tolist()
        },
        'chart_radar1': {
            'labels': data_radar.columns[1:].tolist(),
            'values': data_radar[data_radar['CLUSTER_ID'] == 1].values[0][1:].tolist()
        },
        'chart_radar2': {
            'labels': data_radar.columns[1:].tolist(),
            'values': data_radar[data_radar['CLUSTER_ID'] == 2].values[0][1:].tolist()
        },
        'chart_radar3': {
            'labels': data_radar.columns[1:].tolist(),
            'values': data_radar[data_radar['CLUSTER_ID'] == 3].values[0][1:].tolist()
        },
        'chart_radar4': {
            'labels': data_radar.columns[1:].tolist(),
            'values': data_radar[data_radar['CLUSTER_ID'] == 4].values[0][1:].tolist()
        },
        'chart_radar5': {
            'labels': data_radar.columns[1:].tolist(),
            'values': data_radar[data_radar['CLUSTER_ID'] == 5].values[0][1:].tolist()
        }
    },
    'table_data':{
        'purpose_table': {
            'purpose': purpose_analysis.index.tolist(),
            'applicants': purpose_analysis["APPLICANT_COUNT"].tolist(),
            'high_risk_applicant': purpose_analysis['HIGH_RISK_APPLICANTS'].tolist(),
            'high_risk_rate': purpose_analysis['HIGH_RISK_RATE'].tolist()
        },
        'clusters_summary': {
            'segments': ['Long-Term, High-Exposure Borrowers', 'Older, Lower-Risk Applicants', 'Established Credit Users', 'Younger, Smaller-Loan Applicants', 'Moderate-Exposure Applicants'],
            'applicants': data_clusters['APPLICANT_COUNT'].tolist(),
            'avg_amount': data_clusters['AVG_AMOUNT'].tolist(),
            'avg_duration': data_clusters['AVG_DURATION'].tolist(),
            'avg_age': data_clusters['AVG_AGE'].tolist(),
            'high_risk_pct': data_clusters['HIGH_RISK_PCT'].tolist(),

        }
    }
}

