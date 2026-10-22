SELECT
    purpose,
    COUNT(*) AS applicant_count,
    SUM(
        CASE credit_risk
            WHEN 'high' THEN 1
            ELSE 0
        END
    ) AS high_risk_count,
    ROUND(
        100 * AVG(
            CASE credit_risk
                WHEN 'high' THEN 1
                ELSE 0
            END
        ), 2 
    ) AS high_risk_pct,
    ROUND(AVG(amount), 2) AS avg_credit_amount,
    ROUND(AVG(duration), 2) AS avg_duration_months
FROM {{ ref('stg_credit') }}
GROUP BY purpose