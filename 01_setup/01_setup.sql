USE ROLE ACCOUNTADMIN;

USE warehouse COMPUTE_WH;

GRANT CREATE DATABASE ON ACCOUNT TO ROLE USERADMIN;

USE ROLE USERADMIN;

CREATE DATABASE IF NOT EXISTS CREDIT_DATA;

CREATE SCHEMA IF NOT EXISTS CREDIT_DATA.RAW;
CREATE SCHEMA IF NOT EXISTS CREDIT_DATA.STAGING;
CREATE SCHEMA IF NOT EXISTS CREDIT_DATA.ANALYTICS;

---------------------------------------------------------

USE DATABASE CREDIT_DATA;

USE SCHEMA RAW;

CREATE FILE FORMAT IF NOT EXISTS CREDIT_DATA_FORMAT
    TYPE = CSV
    SKIP_HEADER = 1
    FIELD_OPTIONALLY_ENCLOSED_BY = '"'
    NULL_IF = ('', 'NULL', 'null')
    EMPTY_FIELD_AS_NULL = TRUE;

CREATE STAGE IF NOT EXISTS CREDIT_STAGE
    FILE_FORMAT = CREDIT_DATA_FORMAT;

------------------------------------------------------

CREATE TABLE IF NOT EXISTS raw_data (
    status      VARCHAR,
    duration    INTEGER,
    credit_history  VARCHAR,
    purpose     VARCHAR,
    amount      NUMERIC,
    savings     VARCHAR,
    employment_duration     VARCHAR,
    installment_rate        INTEGER,
    personal_status_sex     VARCHAR,
    other_debtors       VARCHAR,
    present_residence   INTEGER,
    property        VARCHAR,
    age             INTEGER,
    other_installment_plans     VARCHAR,
    housing     VARCHAR,
    number_credits      INTEGER,
    job         VARCHAR,
    people_liable       INTEGER,
    telephone       VARCHAR,
    foreign_worker      VARCHAR,
    credit_risk     INTEGER
);


COPY INTO RAW.raw_data
FROM @CREDIT_STAGE;

LIST @CREDIT_STAGE;

DROP SCHEMA RAW_STAGING;