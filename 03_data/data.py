
def main(session):

    snow_df = (
        session.table("CREDIT_DATA.RAW.raw_data")
    )

    df = snow_df.to_pandas()
    return df