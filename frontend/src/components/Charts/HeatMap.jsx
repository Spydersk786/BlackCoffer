import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/countUnique/country');
        const data = await response.json();

        if (data && Array.isArray(data)) {
          const counts = {};
          let othersCount = 0;

          data.forEach(item => {
            // Exclude entries with blank country names
            if (item.value.trim() === "") {
              return; // Skip blank country names
            }

            if (item.count < 19) {
              othersCount += item.count; // Sum counts for countries with count < 19
            } else {
              counts[item.value] = item.count; // Add countries with count >= 19
            }
          });

          const labels = Object.keys(counts);
          const dataCounts = Object.values(counts);

          // Add the "Others" category to the data
          if (othersCount > 0) {
            labels.push('Others');
            dataCounts.push(othersCount);
          }

          setChartData({
            labels,
            datasets: [
              {
                label: 'Country Count',
                data: dataCounts,
                backgroundColor: dataCounts.map(count => {
                  if (count > 20) return '#FF6384'; // Red for high counts
                  if (count > 10) return '#36A2EB'; // Blue for medium counts
                  return '#FFCE56'; // Yellow for low counts
                }),
                borderColor: '#000',
                borderWidth: 1,
              },
            ],
          });
        } else {
          console.error("Invalid data received from API.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!chartData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Country Count Bar Chart</h2>
      <Bar data={chartData} options={{
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Count of Entries by Country',
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Countries',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Count',
            },
            beginAtZero: true,
          },
        },
      }} />
    </div>
  );
};

export default BarChart;
