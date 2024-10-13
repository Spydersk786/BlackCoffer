import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { useStateContext } from './contexts/ContextProvider';
import Navbar from './components/Navbar';
import Pestles from './components/Pestles';
import HeatMap from './components/Charts/HeatMap';
import IntensityPage from './pages/IntensityPage';
import LikelihoodPage from './pages/LikelihoodPage';
import RelevancePage from './pages/RelevancePage';
import YearAnalysisPage from './pages/YearAnalaysisPage';
import CountryAnalaysisPage from './pages/CountryAnalaysisPage';
import YearDistribution from './components/YearDistribution';
import Login from './components/Login';

const App = () => {
  const { activeMenu } = useStateContext();
  const [metrics, setMetrics] = useState({
    totalArticles: 0,
    totalCountries: 0,
    avgIntensity: 0,
    avgRelevance: 0,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const [countriesRes, intensityRes, relevanceRes] = await Promise.all([
          fetch('http://127.0.0.1:5001/countUnique/country'),
          fetch('http://127.0.0.1:5001/countUnique/intensity'),
          fetch('http://127.0.0.1:5001/countUnique/relevance'),
        ]);

        const countriesData = await countriesRes.json();
        const intensityData = await intensityRes.json();
        const relevanceData = await relevanceRes.json();

        const totalArticles = intensityData.reduce((sum, item) => sum + item.count, 0);
        const totalCountries = countriesData.length;
        const avgIntensity = intensityData.reduce((sum, item) => sum + item.value * item.count, 0) / totalArticles;
        const avgRelevance = relevanceData.reduce((sum, item) => sum + item.value * item.count, 0) / totalArticles;

        setMetrics({
          totalArticles,
          totalCountries,
          avgIntensity: avgIntensity.toFixed(2),
          avgRelevance: avgRelevance.toFixed(2),
        });
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    fetchMetrics();
  }, []);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <div className="flex relative dark:bg-gray-900 bg-gray-100">
      {isLoggedIn && activeMenu && (
        <div className="w-72 fixed sidebar dark:bg-gray-800 bg-white shadow-lg">
          <Sidebar />
        </div>
      )}

      <div
        className={`dark:bg-gray-900 bg-gray-100 min-h-screen w-full 
        ${isLoggedIn && activeMenu ? 'md:ml-72' : 'flex-2'}`}
      >
        {isLoggedIn && (
          <div className="fixed md:static bg-white dark:bg-gray-800 navbar w-full shadow-md z-10">
            <Navbar onLogout={handleLogout} />
          </div>
        )}

        <div className={`p-6 ${isLoggedIn ? 'mt-20' : ''}`}>
          <Routes>
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Home metrics={metrics} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/intensity"
              element={
                isLoggedIn ? <IntensityPage /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/likelihood"
              element={
                isLoggedIn ? <LikelihoodPage /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/relevance"
              element={
                isLoggedIn ? <RelevancePage /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/year"
              element={
                isLoggedIn ? <YearAnalysisPage /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/country"
              element={
                isLoggedIn ? <CountryAnalaysisPage /> : <Navigate to="/login" replace />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const Home = ({ metrics }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Articles" value={metrics.totalArticles} />
      <StatCard title="Total Countries" value={metrics.totalCountries} />
      <StatCard title="Avg Intensity" value={metrics.avgIntensity} />
      <StatCard title="Avg Relevance" value={metrics.avgRelevance} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">PESTLE Analysis</h2>
        <Pestles />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Heat Map</h2>
        <HeatMap />
      </div>
    </div>

    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Start Year Distribution</h2>
      <YearDistribution field="start_year" />
    </div>

    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">End Year Distribution</h2>
      <YearDistribution field="end_year" />
    </div>
  </div>
);

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
      <p className="text-2xl font-semibold mt-2">{value}</p>
    </div>
  );
};

export default App;