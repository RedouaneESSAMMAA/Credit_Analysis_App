import os
from pathlib import Path
from dotenv import load_dotenv
from snowflake.snowpark import Session

# Load .env from the same directory as this file
load_dotenv(Path(__file__).with_name(".env"))


def get_session():
    connection_parameters = {
        "account": os.environ["SNOWFLAKE_ACCOUNT"],
        "user": os.environ["SNOWFLAKE_USER"],
        "password": os.environ["SNOWFLAKE_PASSWORD"],
        "warehouse": os.environ["SNOWFLAKE_WAREHOUSE"],
        "database": os.getenv("SNOWFLAKE_DATABASE", "CREDIT_DATA"),
        "schema": os.getenv("SNOWFLAKE_SCHEMA", "ANALYTICS"),
    }

    role = os.getenv("SNOWFLAKE_ROLE")
    if role:
        connection_parameters["role"] = role

    return Session.builder.configs(
        connection_parameters
    ).create()