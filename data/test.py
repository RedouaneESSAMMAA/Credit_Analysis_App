
from snowflake_utils import get_session, get_all_tables

session = get_session()

try:
    print("Database:", session.get_current_database())
    print("Schema:", session.get_current_schema())

    dfs = get_all_tables(session)

    print("Tables found:", len(dfs))
    print(list(dfs.keys()))

    if dfs:
        first_table = next(iter(dfs))
        print(f"\nTesting table: {first_table}")
        dfs[first_table].show(5)

finally:
    session.close()
