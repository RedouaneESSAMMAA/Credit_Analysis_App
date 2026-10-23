from data.snowflake_utils import get_session, get_all_tables

session = get_session()

try:
    dfs = get_all_tables(session)
finally:
    session.close()


data1 = dfs["ANALYTICS.MART_CREDIT_AMOUNT_DURATION"]
data2 = dfs["ANALYTICS.MART_CREDIT_DETAILS"]
data3 = dfs["ANALYTICS.MART_CREDIT_OVERVIEW"]
data4 = dfs["ANALYTICS.MART_CREDIT_RISK_BY_PROFILE"]


global_data = {
    'global_data' : {
        'total_applicants': "{:,d}".format(int(data3["TOTAL_APPLICANTS"][0])),
        'high_risk_pct': "{:,d}".format(int(data3["HIGH_RISK_PCT"][0])),
        'average_credit_amount': "{:,d}".format(int(data3["AVG_CREDIT_AMOUNT"][0])),
        'average_duration': "{:,d}".format(int(data3["AVG_DURATION_MONTHS"][0])),
        'total_credit': "{:,d}".format(int(data2["AMOUNT"].sum()))
    }
}

