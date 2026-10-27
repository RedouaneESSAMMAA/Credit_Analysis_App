// Dougnut chart category 1:

// Shadow plugin for Chart.js
// Chart.register({
//   id: 'doughnutShadow',
//   beforeDraw(chart) {
//     const { ctx, chartArea: { top, left, width, height } } = chart;

//     ctx.save();

//     const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
//     const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
//     const centerX = (left + width / 2);
//     const centerY = (top + height / 2);

//     ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
//     ctx.shadowBlur = 15;
//     ctx.shadowOffsetX = 0;
//     ctx.shadowOffsetY = 5;

//     ctx.beginPath();
//     ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
//     ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2, true);
//     ctx.closePath();
//     ctx.fill('evenodd');

//     ctx.restore();
//   },
// });

const text1= {
    id: 'centerText1',

    afterDraw(chart) {
        const { ctx, chartArea } = chart;

        if (!chartArea) return;

        const centerX = (chartArea.left + chartArea.right) / 2;
        const centerY = (chartArea.top + chartArea.bottom) / 2;

        const text = 'Products of\nCategory I';

        const lines = text.split('\n');
        const lineHeight = 18;

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 18px Segoe UI';
        ctx.fillStyle = 'black';

        const startY = centerY - ((lines.length - 1) * lineHeight) / 2;

        lines.forEach((line, index) => {
            ctx.fillText(line, centerX, startY + index * lineHeight);
        });

        ctx.restore();
    }
};


// Fetch the data:

//The category1 chart:
fetch('/chart_data')
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
  })
  .then(chartData => {
      console.log("Chart data fetched:", chartData);

      const chart1 = chartData.chart1;


      if (!chart1 || !chart1.labels || !chart1.values) {
          throw new Error("chart1 is missing labels or values");
      }

      const options = {
          series: [{
              name: 'Number of Applicants',
              data: chart1.values
          }],
          chart: {
              type: 'bar',
              height: 350,
              width: '100%',
              toolbar: {
                  show: false
              }
          },
          plotOptions: {
              bar: {
                  horizontal: false,
                  columnWidth: '45%',
                  borderRadius: 5
              }
          },
          dataLabels: {
              enabled: false
          },
          xaxis: {
              categories: chart1.labels
          },
          yaxis: {
              labels: {
                  formatter: value => value.toLocaleString('en-US')
              }
          },
          fill: {
              opacity: 1,
              colors: ['#fcbf49']
          },
          tooltip: {
              y: {
                  formatter: value => value.toLocaleString('en-US')
              }
          }
      };

      const chart = new ApexCharts(
          document.querySelector('#chart1'),
          options
      );

      chart.render();
  })
  .catch(error => {
      console.error('Error fetching or rendering chart data:', error);
});


//chart2 :
fetch('/chart_data')
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
  })
  .then(chartData => {
      console.log("Chart data fetched:", chartData);

      const chart2 = chartData.chart2;


      if (!chart2 || !chart2.labels || !chart2.values) {
          throw new Error("chart2 is missing labels or values");
      }

      const options = {
          series: [{
              name: 'Number of Applicants',
              data: chart2.values
          }],
          chart: {
              type: 'bar',
              height: 350,
              width: '100%',
              toolbar: {
                  show: false
              }
          },
          plotOptions: {
              bar: {
                  horizontal: false,
                  columnWidth: '45%',
                  borderRadius: 5,
                  horizontal: true,
              }
          },
          dataLabels: {
              enabled: false
          },
          xaxis: {
              categories: chart2.labels
          },
          fill: {
              opacity: 1,
              colors: ['#003049']
          }
      };

      const chart = new ApexCharts(
          document.querySelector('#chart2'),
          options
      );

      chart.render();
  })
  .catch(error => {
      console.error('Error fetching or rendering chart data:', error);
});

// dougnout chart
// fetch('/chart_data')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(chartData => {
//             console.log("Chart data fetched:", chartData);

//             // Get chart4 data
//             const chart3 = chartData.chart3;

//             // Get the canvas element
//             const ctx = document.getElementById('donut1').getContext('2d');

//             // Create the chart
//             new Chart(ctx, {
//                 type: chart3.type, // 'doughnut'
//                 data: {
//                     labels: chart3.labels, // x-axis labels
//                     datasets: [{
//                         label: '', // Dataset label
//                         data: chart3.values, // y-axis values
//                         backgroundColor: [
//                             '#184e77',
//                             '#1e6091',
//                             '#1a759f',
//                             '#168aad',
//                             '#34a0a4',
//                             '#52b69a',
//                             '#76c893',
//                             '#99d98c',
//                             '#b5e48c',
//                             '#d9ed92']
//                     }]
//                 },
//                 options: {
//                     responsive: true,
//                     maintainAspectRatio: false,
//                     title: {
//                       display: false,
//                     },
//                     cutout: '65%',
//                     plugins:{
//                       legend:{
//                         position: 'right',
//                       }
//                     }
//                 },
//                 // plugins:['doughnutShadow', text1] // Attach the shadow plugin
//             });
// });

//donut:: :
fetch('/chart_data')
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
  })
  .then(chartData => {
      console.log("Chart data fetched:", chartData);

      const chart3 = chartData.chart3;


      if (!chart3 || !chart3.labels || !chart3.values) {
          throw new Error("chart4 is missing labels or values");
      }

      const options = {
          series: chart3.values,
          chart: {
              type: 'donut',
              height: 380,
            //   width: '100%',
            //   toolbar: {
            //       show: false
            //   },
          },
          labels: chart3.labels,
          colors: [
                            '#184e77',
                            '#1e6091',
                            '#1a759f',
                            '#168aad',
                            '#34a0a4',
                            '#52b69a',
                            '#76c893',
                            '#99d98c',
                            '#b5e48c',
                            '#d9ed92'],
          plotOptions: {
              pie: {
                  spacing: 3,
                  borderRadius: 8,
                  donut: {
                    size: '60%'
                  }
              }
          },
          stroke: {
            width: 0
          },
          legend: {
              position: 'right'
          },
      };

      const chart = new ApexCharts(
          document.querySelector('#donut1'),
          options
      );

      chart.render();
  })
  .catch(error => {
      console.error('Error fetching or rendering chart data:', error);
});

//chart3 :
fetch('/chart_data')
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
  })
  .then(chartData => {
      console.log("Chart data fetched:", chartData);

      const chart4 = chartData.chart4;


      if (!chart4 || !chart4.names || !chart4.labels || !chart4.values) {
          throw new Error("chart4 is missing labels or values");
      }

      const options = {
          series: [
            {
              name: chart4.names[0],
              data: chart4.values.slice(0,4)
            },
            {
              name: chart4.names[1],
              data: chart4.values.slice(5)
            }
        ],
          chart: {
              type: 'bar',
              height: 365,
              width: '100%',
              toolbar: {
                  show: false
              },
              stacked: true
          },
          plotOptions: {
              bar: {
                  columnWidth: '45%',
                  borderRadius: 5,
                  horizontal: true,
              }
          },
          dataLabels: {
              total: {
                enabled: true,
                offsetX: 0,
                style: {
                    fontSize: '13px',
                    fontWeight: 900
                }
              }
          },
          stroke: {
            width: 1,
            colors: ["fff"]
          },
          xaxis: {
              categories: chart4.labels,
          },
        //   fill: {
        //       opacity: 1,
        //       colors: ['#003049']
        //   }
          legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
          }
      };

      const chart = new ApexCharts(
          document.querySelector('#chart3'),
          options
      );

      chart.render();
  })
  .catch(error => {
      console.error('Error fetching or rendering chart data:', error);
});


const radarProfiles = [
  {
    elementId: 'radar1',
    dataKey: 'chart_radar1',
    color: 'rgb(153, 102, 255)',
    title: 'Long-Term, High-Exposure Borrowers',
    description:
      'The clearest segment: average loan duration is 41 months and average amount is 8,787. Investigate its credit history, checking status, and purpose to understand what distinguishes it.'
  },
  {
    elementId: 'radar2',
    dataKey: 'chart_radar2',
    color: '#f07167',
    title: 'Older, Lower-Risk Applicants',
    description:
      'Average age is 51.7, with a 22.2% high-risk rate. Employment, savings, and credit history will help validate this label.'
  },
  {
    elementId: 'radar3',
    dataKey: 'chart_radar3',
    color: '#386641',
    title: 'Established Credit Users',
    description:
      'Average age is 33.7, and applicants have 2.12 existing credits on average. The 22.7% high-risk rate is relatively low.'
  },
  {
    elementId: 'radar4',
    dataKey: 'chart_radar4',
    color: '#f5087a',
    title: 'Younger, Smaller-Loan Applicants',
    description:
      'This is your largest segment (349 applicants). Their average loan is 2,233, and 31.2% are high risk.'
  },
  {
    elementId: 'radar5',
    dataKey: 'chart_radar5',
    color: '#83c5be',
    title: 'Moderate-Exposure Applicants',
    description:
      'Their average age is 38.4, and they have two liable-persons on average. The high-risk rate is 29.0%.'
  }
]

const radarDescriptions = {
  LOAN_AMOUNT: 'Relative average credit amount of the cluster compared with the other clusters.',
  LOAN_DURATION: 'Relative average loan duration of the cluster compared with the other clusters.',
  AGE_SCORE: 'Relative average age of applicants in the cluster compared with the other clusters.',
  EMPLOYMENT_STABILITY: 'Percentage of applicants employed for more than 7 years.',
  BANK_CREDIT_HISTORY: 'Percentage of applicants whose credit history is “All credits at this bank paid back duly.”',
  REAL_ESTATE: 'Percentage of applicants whose property category is “real estate (ownership of house or land).”',
  OWNER_OCCUPIED: 'Percentage of applicants living in an owner-occupied flat.'
};


/* =========================================
   2. CREATE TITLE AND INFORMATION TOOLTIP
========================================= */

function addRadarHeading(profile) {
  const container = document.getElementById(profile.elementId);

  if (!container) {
    console.warn(`Container not found: #${profile.elementId}`);
    return;
  }

  const card = container.closest('.analysis-card');

  if (!card) {
    console.warn(`.analysis-card not found for #${profile.elementId}`);
    return;
  }

  // Prevent duplicate headings
  if (card.querySelector('.radar-heading')) {
    return;
  }

  const heading = document.createElement('div');
  heading.className = 'radar-heading';

  const title = document.createElement('h3');
  title.textContent = profile.title;

  const infoWrapper = document.createElement('div');
  infoWrapper.className = 'radar-info-wrapper';

  const infoButton = document.createElement('button');
  infoButton.type = 'button';
  infoButton.className = 'radar-info';
  infoButton.setAttribute('aria-label', profile.description);
  infoButton.setAttribute('aria-describedby',
    `${profile.elementId}-description`);

  // Circular information icon
  infoButton.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M12 11v5"></path>
      <circle cx="12" cy="7.5" r="0.6" class="info-dot"></circle>
    </svg>
  `;

  const description = document.createElement('div');
  description.className = 'radar-description';
  description.id = `${profile.elementId}-description`;
  description.setAttribute('role', 'tooltip');
  description.textContent = profile.description;

  infoWrapper.append(infoButton, description);
  heading.append(title, infoWrapper);

  card.insertBefore(heading, container);
}


/* =========================================
   3. RENDER ONE RADAR CHART
========================================= */

function renderRadarChart(profile, chartData) {
  const container = document.getElementById(profile.elementId);

  if (!container) {
    console.warn(`Container not found: #${profile.elementId}`);
    return Promise.resolve();
  }

  if (
    !chartData ||
    !Array.isArray(chartData.labels) ||
    !Array.isArray(chartData.values)
  ) {
    console.error(`Invalid data for ${profile.dataKey}:`, chartData);
    return Promise.resolve();
  }

  // Destroy an existing chart before recreating it
  if (container._apexChart) {
    container._apexChart.destroy();
  }

  const options = {
    series: [
      {
        name: profile.title,
        data: chartData.values
      }
    ],

    chart: {
      type: 'radar',
      height: 400,
      width: 600,
      toolbar: {
        show: false
      },
      fontFamily: 'Poppins, sans-serif'
    },

    colors: [profile.color],

    xaxis: {
      categories: chartData.labels,
      labels: {
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          colors: chartData.labels.map(() => '#55505D')
        }
      }
    },

    yaxis: {
      show: false,
      min: 0,
      max: 100
    },

    plotOptions: {
      radar: {
        size: 120,
        polygons: {
          strokeColors: '#EAE5ED',
          connectorColors: '#EAE5ED',
          fill: {
            colors: ['#FFFFFF', '#FCF8FC']
          }
        }
      }
    },

    fill: {
      opacity: 0.3
    },

    stroke: {
      width: 2.5
    },

    markers: {
      size: 5,
      colors: ['#FFFFFF'],
      strokeColors: profile.color,
      strokeWidth: 2,
      hover: {
        size: 7
      }
    },

    dataLabels: {
      enabled: false
    },

    legend: {
      show: false
    },

    // Keep the custom tooltip attached to each radar data point
    tooltip: {
      enabled: true,
      shared: false,

      custom: function ({
        series,
        seriesIndex,
        dataPointIndex
      }) {
        // Protect against invalid hover indexes
        if (
          dataPointIndex == null ||
          dataPointIndex < 0 ||
          !chartData.labels[dataPointIndex]
        ) {
          return '';
        }

        const label = chartData.labels[dataPointIndex];

        let value = series[seriesIndex]?.[dataPointIndex];

        // Show the actual reviewer count for this metric
        if (label === 'client_share_pct') {
          value = chartData.counts;
        }

        const numericValue = Number(value);

        const formattedValue = Number.isFinite(numericValue)
          ? numericValue.toLocaleString('en-US', {
              maximumFractionDigits: 2
            })
          : 'N/A';

        const isCount = label === 'client_share_pct';
        const suffix = isCount ? '' : '%';

        return `
          <div class="radar-tooltip">
            <strong>${label.replace(/_/g, ' ')}</strong>
            <div>${radarDescriptions[label] || 'Metric value'}</div>
            <div>Value: ${formattedValue}${suffix}</div>
          </div>
        `;
      }
    }
  };

  const chart = new ApexCharts(container, options);
  container._apexChart = chart;

//   chart.render()
//       .then(() => {
//           hideChartLoader(container);
//       })
//       .catch(error => {
//           console.error('Error rendering chart:', error);
//   });
    return chart.render();
}


/* =========================================
   4. Loaders Initializer
========================================= */

document.querySelectorAll('.analysis-card').forEach(card => {
    if (card.querySelector('.chart-loader')) {
        card.classList.remove('is-loaded');
    }
});

/* =========================================
   5. FETCH DATA ONCE AND RENDER ALL CHARTS
========================================= */

async function initializeRadarCharts() {
  const loader = document.getElementById("radars-loader");

  try {
    const response = await fetch("/chart_data");
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const chartData = await response.json();

    await Promise.all(radarProfiles.map(async profile => {
      const data = chartData[profile.dataKey];

      if (!data) {
        console.error(`Missing ${profile.dataKey} in /chart_data`);
        return;
      }

      addRadarHeading(profile);
      await renderRadarChart(profile, data);
    }));
  } catch (error) {
    console.error("Error initializing radar charts:", error);
  } finally {
    if (loader) loader.hidden = true;
  }
}

initializeRadarCharts();

