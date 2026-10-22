from snowflake_utils import get_session

session = get_session()

try:
    print("Database:", session.get_current_database())
    print("Schema:", session.get_current_schema())

    session.sql("SELECT CURRENT_USER(), CURRENT_ROLE()").show()

finally:
    session.close()