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
            if (item.value.trim() === "") return;
            
            if (item.count < 19) {
              othersCount += item.count;
            } else {
              counts[item.value] = item.count;
            }
          });

          const labels = Object.keys(counts);
          const dataCounts = Object.values(counts);

          if (othersCount > 0) {
            labels.push('Others');
            dataCounts.push(othersCount);
          }

          setChartData({
            labels,
            datasets: [
              {
                label: 'Number of Entries',
                data: dataCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Teal color with transparency
                borderColor: 'rgba(75, 192, 192, 1)',
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
    return <div className="flex justify-center items-center h-64">
      <p className="text-xl font-semibold text-gray-600">Loading...</p>
    </div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Distribution of Entries by Country</h2>
      <div className="h-[500px]">
        <Bar 
          data={chartData} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleFont: {
                  size: 16,
                  weight: 'bold',
                },
                bodyFont: {
                  size: 14,
                },
                padding: 12,
                cornerRadius: 4,
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  font: {
                    size: 12,
                  },
                  maxRotation: 45,
                  minRotation: 45,
                },
              },
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)',
                },
                ticks: {
                  font: {
                    size: 12,
                  },
                },
                title: {
                  display: true,
                  text: 'Number of Entries',
                  font: {
                    size: 14,
                    weight: 'bold',
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BarChart;