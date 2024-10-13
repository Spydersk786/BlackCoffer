import React, { createContext, useContext, useState, useEffect } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [isClicked, setIsClicked] = useState({
    notification: false,
    userProfile: false,
  });
  const [currentColor, setCurrentColor] = useState('#03C9D7'); // Default color

  const handleClick = (clickedItem) => {
    setIsClicked({ ...isClicked, [clickedItem]: true });
  };

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        screenSize,
        setScreenSize,
        isClicked,
        setIsClicked,
        handleClick,
        currentColor,
        setCurrentColor,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);