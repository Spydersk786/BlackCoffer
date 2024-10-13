import React from 'react';
import IntensityTop from '../components/IntensityTop';
import IntensityAggregation from '../components/IntensityAggregation';

const IntensityPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Intensity Analysis</h1>
      <div className="mb-8">
        <IntensityTop />
      </div>
      <div>
        <IntensityAggregation />
      </div>
    </div>
  );
};

export default IntensityPage;