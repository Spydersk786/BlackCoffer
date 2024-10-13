import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const YearDistribution = ({ field }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5001/countUnique/${field}`);
        const jsonData = await response.json();
        
        // Sort the data by count in descending order
        const sortedData = jsonData.sort((a, b) => b.count - a.count);
        
        // Take the top 4 and sum the rest
        const top4 = sortedData.slice(0, 4);
        const others = sortedData.slice(4).reduce((acc, curr) => acc + curr.count, 0);
        
        const chartData = [
          ...top4.map(item => ({ name: item.value, count: item.count })),
          { name: 'Others', count: others }
        ];
        
        setData(chartData);
      } catch (error) {
        console.error('Error fetching the data:', error);
      }
    };

    fetchData();
  }, [field]);

  return (
    <div className="w-full h-96 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Distribution of Articles by {field === 'start_year' ? 'Start Year' : 'End Year'}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" name="Number of Articles" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YearDistribution;