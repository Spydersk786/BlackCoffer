import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const LikelihoodAggregation = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number of Articles',
        data: [],
        backgroundColor: [
          '#4CAF50',
          '#2196F3',
          '#FF9800',
          '#FF5722',
        ],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5001/value-aggregation/likelihood');
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();

        setData({
          labels: ['1', '2', '3', '4'],
          datasets: [
            {
              label: 'Number of Articles',
              data: [
                result['1'] || 0,
                result['2'] || 0,
                result['3'] || 0,
                result['4'] || 0,
              ],
              backgroundColor: [
                '#4CAF50',
                '#2196F3',
                '#FF9800',
                '#FF5722',
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
    maintainAspectRatio: false,
    indexAxis: 'y', // This makes the chart horizontal
    scales: {
      x: {
        title: {
          display: true,
          text: 'Number of Articles',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
        grid: {
          display: true,
          color: '#e0e0e0',
        },
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: 'Likelihood Score',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hiding legend since it's a simple bar chart
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
      customValueLabels: {
        afterDraw(chart) {
          const ctx = chart.ctx;
          chart.data.datasets.forEach(function (dataset, i) {
            const meta = chart.getDatasetMeta(i);
            meta.data.forEach(function (bar, index) {
              const value = dataset.data[index];
              ctx.font = 'bold 12px Arial';
              ctx.fillStyle = '#333';
              ctx.fillText(value, bar.x + 10, bar.y + bar.height / 2 + 5);
            });
          });
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md h-96">
      <h2 className="text-xl font-bold mb-4">Likelihood Article Count</h2>
      {data.labels.length > 0 ? (
        <Bar data={data} options={options} height={300} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LikelihoodAggregation;
