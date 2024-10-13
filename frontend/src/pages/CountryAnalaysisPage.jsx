import React from 'react';
import HeatMap from '../components/Charts/HeatMap';

const CountryAnalaysisPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Country Analysis</h1>
      <div className="mb-8">
        <HeatMap />
      </div>
    
    </div>
  )
}

export default CountryAnalaysisPage
