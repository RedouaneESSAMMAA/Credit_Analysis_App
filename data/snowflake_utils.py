import os
from pathlib import Path
from dotenv import load_dotenv
from snowflake.snowpark import Session

# Load .env from the same directory as this file
load_dotenv()


def get_session():
    connection_parameters = {
        "account": os.getenv("SNOWFLAKE_ACCOUNT"),
        "user": os.getenv("SNOWFLAKE_USER"),
        "password": os.getenv("SNOWFLAKE_PASSWORD"),
        "warehouse": os.getenv("SNOWFLAKE_WAREHOUSE"),
        "database": "CREDIT_DATA",
        "schema": "ANALYTICS"
    }

    role = os.getenv("SNOWFLAKE_ROLE")
    if role:
        connection_parameters["role"] = role

    return Session.builder.configs(
        connection_parameters
    ).create()

def get_all_tables(session):
    tables = {
        "ANALYTICS.MART_CREDIT_AMOUNT_DURATION":
            session.table("ANALYTICS.MART_CREDIT_AMOUNT_DURATION"),
        "ANALYTICS.MART_CREDIT_DETAILS":
            session.table("ANALYTICS.MART_CREDIT_DETAILS"),
        "ANALYTICS.MART_CREDIT_OVERVIEW":
            session.table("ANALYTICS.MART_CREDIT_OVERVIEW"),
        "ANALYTICS.MART_CREDIT_RISK_BY_PROFILE":
            session.table("ANALYTICS.MART_CREDIT_RISK_BY_PROFILE"),
        "RAW.RAW_DATA": session.table("RAW.RAW_DATA"),
        "STAGING.STG_CREDIT": session.table("STAGING.STG_CREDIT"),
    }

    return {
        nom: table.to_pandas()
        for nom, table in tables.items()
    }