import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const PestleChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/countUnique/pestle');
        const data = await response.json();

        if (data && Array.isArray(data)) {
          const labels = data.map(item => item.value || 'Unknown');
          const counts = data.map(item => item.count);

          setChartData({
            labels,
            datasets: [
              {
                label: 'Pestle Count',
                data: counts,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!chartData) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Pestle Count Pie Chart</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default PestleChart;
