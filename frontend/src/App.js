import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { useStateContext } from './contexts/ContextProvider';
import Navbar from './components/Navbar';
import Pestles from './components/Pestles';
import HeatMap from './components/Charts/HeatMap';
import Top from './components/Top';
import IntensityPage from '../src/pages/IntensityPage';
import LikelihoodPage from './pages/LikelihoodPage';
import RelevancePage from './pages/RelevancePage';

const App = () => {
  const { activeMenu } = useStateContext();

  return (
    <div className="flex relative dark:bg-main-dark-bg">
      {activeMenu ? (
        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
          <Sidebar />
        </div>
      ) : (
        <div className="hidden">
          <Sidebar />
        </div>
      )}

      <div
        className={`dark:bg-main-bg bg-main-bg min-h-screen w-full 
        ${activeMenu ? 'md:ml-72' : 'flex-2'}`}
      >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
          <Navbar />
        </div>

        <div className="p-4 mt-16">
          <Routes>
            <Route path="/" element={
              <div>
                <h1 className="text-2xl font-bold mb-6">Home Page</h1>
                <div className="flex items-center justify-center gap-8 mt-8"> 
                  <div className="w-1/2 flex justify-center border-2 border-gray-300 p-4">
                    <Pestles />
                  </div>
                  <div className="w-1/2 flex justify-center border-2 border-gray-300 p-4">
                    <HeatMap />
                  </div>
                </div>
              </div>
            } />
            <Route path="/intensity" element={<IntensityPage />} />
            <Route path="/likelihood" element={<LikelihoodPage/>} />
            <Route path="/relevance" element={<RelevancePage/>} />
            <Route path="/year" element={<div>Year Page</div>} />
            <Route path="/country" element={<div>Country Page</div>} />
          </Routes>


        </div>
      </div>
    </div>
  );
};

export default App;