import React from 'react';
import Top from '../components/Top';

const RelevancePage = () => {
  return (
    <div className="p-4">
    <h1 className="text-2xl font-bold mb-6">Relevance Analysis</h1>
    <div className="mb-8">
      <Top field='relevance'/>
    </div>
  </div>
  )
}

export default RelevancePage
