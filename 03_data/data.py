
from snowflake.snowpark.context import get_active_session

session = get_active_session()

data = session.table("CREDIT_DATA.STAGING.STG_CREDIT")

