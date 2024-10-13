import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useStateContext } from '../contexts/ContextProvider';
import avatar2 from '../data/avatar2.jpg'

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

const Navbar = () => {
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();

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

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between items-center p-4 md:ml-6 md:mr-6 bg-white shadow-md dark:bg-gray-800">
      {/* Left - Menu Button */}
      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />

      {/* Right - Action Icons */}
      <div className="flex items-center space-x-4">
        <NavButton title="Cart" customFunc={() => handleClick('cart')} color={currentColor} icon={<FiShoppingCart />} />
        <NavButton title="Chat" customFunc={() => handleClick('chat')} color={currentColor} icon={<BsChatLeft />} dotColor="#03C9D7" />
        <NavButton title="Notifications" customFunc={() => handleClick('notification')} color={currentColor} icon={<RiNotification3Line />} dotColor="rgb(254, 201, 15)" />

        {/* User Profile */}
        <div
          className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 rounded-lg"
          onClick={() => handleClick('userProfile')}
        >
          <img className="w-8 h-8 rounded-full" src={avatar2} alt="user-profile" />
          <p>
            <span className="text-gray-400 text-sm">Hi,</span>{' '}
            <span className="text-gray-600 font-bold text-sm">Nisha</span>
          </p>
          <MdKeyboardArrowDown className="text-gray-400 text-lg" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
