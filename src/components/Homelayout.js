import React from 'react';
import Navbar from './navbar/Navbar';
const HomeLayout = ({ children }) => {
  return (
    <div>
      <Navbar/>
      <main>{children}</main>
    </div>
  );
};

export default HomeLayout;
