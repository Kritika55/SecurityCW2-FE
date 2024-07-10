import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Store/ReduxStore';
import App from './App';
import Navbar from './components/Navbar/Navbar';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppWithNavbar />
      </Router>
    </Provider>
  );
};

const AppWithNavbar = () => {
  const location = useLocation();
  const shouldDisplayNavbar = location.pathname === '/' || location.pathname === '/booknow';

  return (
    <>
      {shouldDisplayNavbar && <Navbar />}
      <App />
    </>
  );
};

export default AppWrapper;
