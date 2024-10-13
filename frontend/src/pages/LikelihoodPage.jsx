import React from 'react';
import Top from '../components/Top';
import LikelihoodAggregation from '../components/LikelihoodAggregation';

const LikelihoodPage = () => {
  return (
    <div className="p-4">
    <h1 className="text-2xl font-bold mb-6">Likelihood Analysis</h1>
    <div className="mb-8">
      <Top field='likelihood'/>
    </div>
    <div>
      <LikelihoodAggregation />
    </div>
  </div>
  )
}

export default LikelihoodPage
