// HomeLayout.js
import React from 'react';
import Navbar from '../components/navbar/Navbar.jsx';

const HomeLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default HomeLayout;
