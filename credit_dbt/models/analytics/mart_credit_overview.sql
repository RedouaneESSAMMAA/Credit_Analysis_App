SELECT
    COUNT(*) AS total_applicants,
    SUM(
        CASE credit_risk
            WHEN 'high' THEN 1
            ELSE 0
        END
    ) AS high_risk_applicants,
    ROUND(
        100 * AVG(
            CASE credit_risk
                WHEN 'high' THEN 1
                ELSE 0
            END
        ), 2
    ) AS high_risk_pct,
    ROUND(AVG(amount), 2) AS avg_credit_amount,
    ROUND(AVG(duration), 2) AS avg_duration_months,
    ROUND(AVG(age), 2) AS avg_age
FROM {{ ref('stg_credit') }}