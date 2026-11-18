SELECT
    CASE checking_balance
        WHEN '< 0 DM' THEN 'Less then 0$'
        WHEN '1 - 200 DM' THEN 'O to 199$'
        WHEN '> 200 DM' THEN 'More than 200$'
        ELSE 'No running account (or unknown)'
    END AS status,
    months_loan_duration AS duration,
    credit_history,
    purpose,
    amount,
    CASE savings_balance
        WHEN '< 100 DM' THEN 'Less than 100$'
        WHEN '101 - 500 DM' THEN '100 to 500$'
        WHEN '501 - 1000 DM' THEN '501 to 1000$'
        WHEN '> 1000 DM' THEN 'More than 1000$'
        ELSE 'Unknown/No savings account'
    END AS savings,
    CASE employment_length
        WHEN 'unemployed' THEN 'Unemployed'
        WHEN '0 - 1 yrs' THEN 'Less than 1 yr'
        WHEN '1 - 4 yrs' THEN '1 to 3 yrs'
        WHEN '4 - 7 yrs' THEN '4 to 7 yrs'
        ELSE 'More than 7 yrs'
    END AS employment_duration,
    CASE installment_rate
        WHEN 1 THEN 'Greater than 35'
        WHEN 2 THEN '25 to 35'
        WHEN 3 THEN '20 to 25'
        ELSE 'Less than 20'
    END AS installment,
    personal_status AS genre,
    CASE other_debtors
        WHEN 'none' THEN 'None'
        WHEN 'co-applicant' THEN 'co-applicant'
        ELSE 'guarantor'
    END AS other_debtors,
    CASE residence_history
        WHEN 1 THEN 'Less than 1 yr'
        WHEN 2 THEN '1 to 4 yrs'
        WHEN 3 THEN '4 to 7 yrs'
        ELSE 'More than 7 yrs'
    END AS residence_since,
    CASE property
        WHEN 'real estate' THEN 'real estate (ownership of house or land)'
        WHEN 'building society savings' THEN 'savings contract with a building society / life insurance'
        WHEN 'other' THEN 'car or other'
        ELSE 'unknown / no property'
    END AS property,
    age,
    installment_plan,
    housing,
    existing_credits AS number_credits,
    job,
    dependents,
    CASE telephone
        WHEN 'none' THEN 'No'
        ELSE 'Yes'
    END AS telephone,
    CASE foreign_worker
        WHEN 'yes' THEN 'Yes'
        ELSE 'No'
    END AS foreign_worker,
    CASE risk
        WHEN 1 THEN 'low'
        ELSE 'high'
    END AS credit_risk
FROM {{ source('raw', 'raw_data') }}