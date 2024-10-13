import React from 'react';
import Top from '../components/Top';
import IntensityAggregation from '../components/IntensityAggregation';

const IntensityPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Intensity Analysis</h1>
      <div className="mb-8">
        <Top field='intensity'/>
      </div>
      <div>
        <IntensityAggregation />
      </div>
    </div>
  );
};

export default IntensityPage;