SELECT
    status,
    duration,
    credit_history,
    purpose,
    amount,
    savings,
    employment_duration,
    installment,
    genre,
    other_debtors,
    residence_since,
    property,
    age,
    housing,
    number_credits,
    job,
    people_liable,
    telephone,
    foreign_worker,
    credit_risk

FROM {{ ref('stg_credit') }}