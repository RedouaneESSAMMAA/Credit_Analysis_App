SELECT
    status,
    duration,
    credit_history,
    purpose,
    amount,
    savings,
    employment_duration,
    installment_rate,
    personal_status_sex,
    other_debtors,
    present_residence,
    property,
    age,
    housing,
    number_credits,
    job,
    number_liable,
    telephone,
    foreign_worker,
    credit_risk

FROM {{ ref('stg_credit') }}