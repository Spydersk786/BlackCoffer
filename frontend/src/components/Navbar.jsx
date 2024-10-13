import React, { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useStateContext } from '../contexts/ContextProvider';
import avatar2 from '../data/avatar2.jpg';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <button
    type="button"
    onClick={customFunc}
    className="relative text-xl p-3 hover:bg-gray-100 rounded-full"
    style={{ color }}
    aria-label={title}
  >
    <span
      style={{ backgroundColor: dotColor }}
      className="absolute right-2 top-2 rounded-full h-2 w-2"
    />
    {icon}
  </button>
);

const Navbar = ({ onLogout }) => {
  const { 
    currentColor, 
    activeMenu, 
    setActiveMenu, 
    handleClick, 
    isClicked, 
    setIsClicked, 
    setScreenSize, 
    screenSize 
  } = useStateContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [filterOptions, setFilterOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);

  useEffect(() => {
    if (selectedFilter) {
      fetchFilterOptions(selectedFilter);
    }
  }, [selectedFilter]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  const fetchFilterOptions = async (filter) => {
    try {
      const response = await fetch(`http://127.0.0.1:5001/countUnique/${filter.toLowerCase()}`);
      const data = await response.json();
      setFilterOptions(data.map(item => item.value));
    } catch (error) {
      console.error('Error fetching filter options:', error);
      setFilterOptions([]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!selectedFilter || !selectedOption) {
      alert('Please select a filter and an option');
      return;
    }
    
    const url = `http://127.0.0.1:5001/filter?${selectedFilter.toLowerCase()}=${encodeURIComponent(selectedOption)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSearchResults([]);
    }
  };

  const handleCloseSearch = () => {
    setSearchResults([]);
    setSelectedFilter('');
    setSelectedOption('');
    setSearchTerm('');
  };

  const filters = ['End_Year', 'Topic', 'Sector', 'Region', 'Pestle', 'Country'];

  const handleLogout = () => {
    onLogout();
    setIsClicked(prevState => ({
      ...prevState,
      userProfile: false
    }));
  };

  const handleProfileClick = () => {
    setIsClicked(prevState => ({
      ...prevState,
      userProfile: !prevState.userProfile
    }));
  };

  return (
    <div className="flex flex-col p-4 md:ml-6 md:mr-6 bg-white shadow-md dark:bg-gray-800">
      <div className="flex justify-between items-center">
        <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />

        <form onSubmit={handleSearch} className="flex-grow max-w-2xl mx-4">
          <div className="flex items-center space-x-2">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Filter</option>
              {filters.map(filter => (
                <option key={filter} value={filter}>{filter}</option>
              ))}
            </select>
            {selectedFilter && (
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Option</option>
                {filterOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            )}
            <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
              Search
            </button>
          </div>
        </form>

        <div className="flex items-center space-x-4">
          <NavButton 
            title="Notifications" 
            customFunc={() => handleClick('notification')} 
            color={currentColor} 
            icon={<RiNotification3Line />} 
            dotColor="rgb(254, 201, 15)" 
          />

          <div className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 rounded-lg"
              onClick={handleProfileClick}
            >
              <img className="w-8 h-8 rounded-full" src={avatar2} alt="user-profile" />
              <p>
                <span className="text-gray-400 text-sm">Hi,</span>{' '}
                <span className="text-gray-600 font-bold text-sm">Nisha</span>
              </p>
              <MdKeyboardArrowDown className="text-gray-400 text-lg" />
            </div>
            {isClicked.userProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {searchResults.length > 0 && (
        <div className="mt-4 bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">Search Results</h2>
            <button
              onClick={handleCloseSearch}
              className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index} className="mb-2">
                <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {result.title}
                </a>
                <p className="text-sm text-gray-600">Filter: {selectedFilter}, Option: {selectedOption}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;