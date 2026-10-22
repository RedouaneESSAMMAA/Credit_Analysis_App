SELECT
    CASE status
        WHEN 'A11' THEN 'Less then 0$'
        WHEN 'A12' THEN 'O to 199$'
        WHEN 'A13' THEN 'More than 200$'
        ELSE 'No running account (or unknown)'
    END AS status,
    duration,
    CASE credit_history
        WHEN 'A30' THEN 'Deplay in paying off in the past'
        WHEN 'A31' THEN 'Critical Account'
        WHEN 'A32' THEN 'No credits taken / All credits pais back duly'
        WHEN 'A33' THEN 'Existing credits paid back duly till now'
        ELSE 'All credits at this bank paid back duly'
    END AS credit_history,
    CASE purpose
        WHEN 'A40' THEN 'new car'
        WHEN 'A41' THEN 'used car'
        WHEN 'A42' THEN 'furniture/equipment'
        WHEN 'A43' THEN 'radio/television'
        WHEN 'A44' THEN 'domestic appliances'
        WHEN 'A45' THEN 'repairs'
        WHEN 'A46' THEN 'education'
        WHEN 'A47' THEN 'vacation'
        WHEN 'A48' THEN 'retraining'
        WHEN 'A49' THEN 'business'
        ELSE 'others'
    END AS purpose,
    amount,
    CASE savings
        WHEN 'A61' THEN 'Less than 100$'
        WHEN 'A62' THEN '100 to 499$'
        WHEN 'A63' THEN '500 to 999$'
        WHEN 'A64' THEN 'More than 1000$'
        ELSE 'Unknown/No savings account'
    END AS savings,
    CASE employment_duration
        WHEN 'A71' THEN 'Unemployed'
        WHEN 'A72' THEN 'Less than 1 yr'
        WHEN 'A73' THEN '1 to 3 yrs'
        WHEN 'A74' THEN '4 to 7 yrs'
        ELSE 'More than 7 yrs'
    END AS employment_duration,
    CASE installment_rate
        WHEN 1 THEN 'Greater than 35'
        WHEN 2 THEN '25 to 35'
        WHEN 3 THEN '20 to 25'
        ELSE 'Less than 20'
    END AS installment,
    CASE personal_status_sex
        WHEN 'A91' THEN 'Male: divorced/separated'
        WHEN 'A92' THEN 'Female: divorced/separated/married'
        WHEN 'A93' THEN 'Male: single'
        WHEN 'A94' THEN 'Male: married/widowed'
        ELSE 'Female: single'
    END AS genre,
    CASE other_debtors
        WHEN 'A101' THEN 'None'
        WHEN 'A102' THEN 'co-applicant'
        ELSE 'guarantor'
    END AS other_debtors,
    CASE present_residence
        WHEN 1 THEN 'Less than 1 yr'
        WHEN 2 THEN '1 to 4 yrs'
        WHEN 3 THEN '4 to 7 yrs'
        ELSE 'More than 7 yrs'
    END AS residence_since,
    CASE property
        WHEN 'A121' THEN 'real estate (ownership of house or land)'
        WHEN 'A122' THEN 'savings contract with a building society / life insurance'
        WHEN 'A123' THEN 'car or other'
        ELSE 'unknown / no property'
    END AS property,
    age,
    CASE other_installment_plans
        WHEN 'A141' THEN 'At other bank'
        WHEN 'A142' THEN 'At department store or mail order house'
        ELSE 'No further running credits'
    END AS other_installment_plans,
    CASE housing
        WHEN 'A151' THEN 'rented flat'
        WHEN 'A152' THEN 'owner-occupied flat'
        ELSE 'Free apartment'
    END AS housing,
    number_credits,
    CASE job
        WHEN 'A171' THEN 'unemployed / unskilled with no permanent residence'
        WHEN 'A172' THEN 'unskilled with permanent residence'
        WHEN 'A173' THEN 'skilled worker / skilled employee / minor civil servant'
        ELSE 'executive / self-employed / higher civil servant'
    END AS job,
    people_liable,
    CASE telephone
        WHEN 'A191' THEN 'No'
        ELSE 'Yes'
    END AS telephone,
    CASE foreign_worker
        WHEN 'A201' THEN 'Yes'
        ELSE 'No'
    END AS foreign_worker,
    CASE credit_risk
        WHEN 1 THEN 'low'
        ELSE 'high'
    END AS credit_risk
FROM {{ source('raw', 'raw_data') }}