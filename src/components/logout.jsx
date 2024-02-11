import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem('username');
    window.location.reload();
  };

  return (
    <div>
      {/* Use FaSignOutAlt from react-icons */}
      <FaSignOutAlt
        style={{ cursor: 'pointer' }}
        onClick={handleLogout}
        size={25} // Set the size of the icon
        color='#00ab41'
      />
    </div>
  );
};

export default LogoutButton;
