WITH segmented AS (
SELECT
    CASE amount
        WHEN < 1000 THEN 'Under 1,000'
        WHEN < 3000 THEN '1,000-2,999'
        WHEN < 5000 THEN '3000-4,999'
        ELSE '5,000+'
    END AS amount_band,
    CASE duration
        WHEN <= 12 THEN '0-12 months'
        WHEN <= 24 THEN '13-24 months'
        WHEN <= 36 THEN '25-36 months'
        ELSE '37+ months'
    END AS duration_band,
    amount,
    credit_risk
FROM {{ ref('stg_credit') }}
)
SELECT
    amount_band,
    duration_band,
    COUNT(*) AS applicant_count,
    SUM(
        CASE credit_risk WHEN 'high' THEN 1 ELSE 0 END
    ) AS high_risk_count,
    ROUND(
        100 * AVG(
            CASE credit_risk WHEN 'high' THEN 1 ELSE 0 END
        ), 2
    ) AS high_risk_pct,
    ROUND(AVG(amount), 2) AS avg_credit_amount
FROM segmented 
GROUP BY amount_band, duration_band