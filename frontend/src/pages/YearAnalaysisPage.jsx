import React from 'react';
import YearDistribution from '../components/YearDistribution';

const YearAnalysisPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Year Analysis</h1>
      <div className="mb-8">
        <YearDistribution field="start_year" />
      </div>
      <div className="mb-8">
        <YearDistribution field="end_year" />
      </div>
    </div>
  );
};

export default YearAnalysisPage;