// IntensityAggregation.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Ensure you're importing from the auto build

const IntensityAggregation = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number of Articles',
        data: [],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5001/value-aggregation?column=intensity');
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();

        setData({
          labels: ['0-10', '11-30', '31-50', 'Greater than 50'],
          datasets: [
            {
              label: 'Number of Articles',
              data: [
                result['0_10'] || 0,
                result['11_30'] || 0,
                result['31_50'] || 0,
                result['greater_50'] || 0,
              ],
              backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)',
              ],
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Keep this false
    scales: {
      x: {
        title: {
          display: true,
          text: 'Intensity',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Articles',
        },
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md h-96"> {/* Set a fixed height here */}
      <h2 className="text-xl font-bold mb-4">Intensity Article Count</h2>
      {data.labels.length > 0 ? (
        <Bar data={data} options={options} height={300} /> // Set height here if needed
      ) : (
        <p>Loading...</p> // Optionally show a loading message
      )}
    </div>
  );
};

export default IntensityAggregation;
