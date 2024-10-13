import React from 'react';
import { NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { useStateContext } from '../contexts/ContextProvider';

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = ' flex hidden ';
  const normalLink = 'flex items-center gap-3 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 hover:bg-light-gray m-2 display:none';

  return (
    <div className={`h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 bg-white dark:bg-gray-800 shadow-lg ${activeMenu ? 'w-72' : 'w-0 md:w-20'} transition-all duration-300 ease-in-out`}>
      <div className="flex justify-between items-center p-4">
        <NavLink to="/" className="flex items-center gap-3 ml-3 mt-4">
          <SiShopware className="text-3xl text-blue-600" />
          <span className={`text-xl font-extrabold tracking-tight text-slate-900 ${!activeMenu && 'hidden'}`}>Dash--</span>
        </NavLink>
        <button
          type="button"
          onClick={() => setActiveMenu(!activeMenu)}
          className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
        >
          <MdOutlineCancel />
        </button>
      </div>

      <div className="mt-10">
        {activeMenu && (
          <p className="text-gray-400 m-3 mt-4 uppercase font-semibold">
            Navigation
          </p>
        )}
        {['Intensity', 'Likelihood', 'Relevance', 'Year', 'Country'].map((item) => (
          <NavLink
            key={item}
            to={`/${item.toLowerCase()}`}
            onClick={handleCloseSideBar}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
            style={({ isActive }) => ({
              backgroundColor: isActive ? currentColor : '',
            })}
          >
            <span className="capitalize">{item}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
