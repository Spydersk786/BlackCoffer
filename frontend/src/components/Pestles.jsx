import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

const Pestles = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5001/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();

        // Ensure jsonData is not empty
        if (Object.keys(jsonData).length === 0) {
          throw new Error('No data available');
        }

        // Calculate pestle counts
        const pestleCounts = Object.values(jsonData).reduce((acc, item) => {
          if (item.pestle) {
            acc[item.pestle] = (acc[item.pestle] || 0) + 1;
          }
          return acc;
        }, {});

        const labels = Object.keys(pestleCounts);
        const data = Object.values(pestleCounts);

        setChartData({
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: [
              '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
              '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'
            ],
          }]
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // Clean up the chart instance if it exists
      const chart = Chart.getChart('pestles-chart');
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!chartData) return <div>No data available</div>;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      },
      datalabels: {
        color: '#fff',
        font: {
          weight: 'bold'
        },
        formatter: (value, ctx) => {
          const total = ctx.dataset.data.reduce((acc, curr) => acc + curr, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return percentage + '%';
        }
      }
    }
  };

  return (
    <div style={{ width: '600px', height: '400px' }}>
      <h2>Pestle Distribution</h2>
      <Pie data={chartData} options={options} id="pestles-chart" /> {/* Add an id for cleanup */}
      <div>
        <h3>Debug Info:</h3>
        <pre>{JSON.stringify(chartData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Pestles;
