import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Pestles from './components/Pestles';

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="app-content">
        <Sidebar />
        <main>
          <h1>Pestle Distribution</h1>
          <Pestles />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;