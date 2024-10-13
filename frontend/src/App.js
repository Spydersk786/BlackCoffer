import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { useStateContext } from './contexts/ContextProvider';
import Navbar from './components/Navbar';
import Pestles from './components/Pestles'; 
import HeatMap from '/Users/chetandongare/Desktop/BlackCoffer/frontend/src/components/Charts/HeatMap.jsx';
import IntensityTop from './components/IntensityTop';

const App = () => {
  const { activeMenu } = useStateContext();

  return (
    <div className="flex relative dark:bg-main-dark-bg">
      {/* Sidebar */}
      {activeMenu ? (
        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
          <Sidebar />
        </div>
      ) : (
        <div className="hidden">
          <Sidebar />
        </div>
      )}

      {/* Main content area */}
      <div
        className={`dark:bg-main-bg bg-main-bg min-h-screen w-full 
        ${activeMenu ? 'md:ml-72' : 'flex-2'}`}
      >
        {/* Navbar */}
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
          <Navbar />
        </div>

        {/* Main Content */}
        <div className="p-4 mt-16">
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="/intensity" element={<div>Intensity Page</div>} />
            <Route path="/likelihood" element={<div>Likelihood Page</div>} />
            <Route path="/relevance" element={<div>Relevance Page</div>} />
            <Route path="/year" element={<div>Year Page</div>} />
            <Route path="/country" element={<div>Country Page</div>} />
            <Route path="/topics" element={<div>Topics Page</div>} />
            <Route path="/region" element={<div>Region Page</div>} />
            <Route path="/city" element={<div>City Page</div>} />
          </Routes>

         <div className="flex items-center justify-center gap-8 mt-40"> 
  {/* Pestles Component */}
  <div className="w-1/2 flex justify-center border-2 border-gray-300 p-4">
    <Pestles /> {/* This is your Pie Chart */}
  </div>

  {/* HeatMap Component */}
  <div className="w-1/2 flex justify-center border-2 border-gray-300 p-4">
    <HeatMap /> {/* This is your HeatMap */}
  </div>
</div>

       <div>
        <IntensityTop />
       </div>

        </div>
      </div>
    </div>
  );
};

export default App;
