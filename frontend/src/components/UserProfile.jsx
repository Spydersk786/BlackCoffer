import React from 'react';
import { useStateContext } from '../contexts/ContextProvider';

const UserProfile = () => {
  const { setIsClicked, currentColor } = useStateContext();

  const handleLogout = () => {
    // Implement logout logic here, e.g., clearing auth tokens, redirecting to login page, etc.
    console.log('Logged out');
    setIsClicked({ userProfile: false });
  };

  return (
    <div className="absolute right-1 top-16 bg-white p-4 rounded-lg shadow-lg w-60">
      <div className="flex items-center">
        <img
          src="https://via.placeholder.com/150"
          alt="User Profile"
          className="rounded-full w-12 h-12"
        />
        <div className="ml-4">
          <h4 className="font-bold text-lg">John Doe</h4>
          <p className="text-sm text-gray-500">johndoe@example.com</p>
        </div>
      </div>

      <button
        className="w-full bg-red-500 text-white p-2 mt-4 rounded hover:bg-red-700"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
