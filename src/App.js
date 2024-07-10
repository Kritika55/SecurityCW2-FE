import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Navbar from './components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookNow from './pages/bookNow/Reservation';
import Payment from './pages/bookNow/Payment';
import Confirmation from './pages/bookNow/Confirmation';
import { UserProvider } from './UserContext';
import AdminDashboard from './pages/admin/AdminDashboard'; // Import the AdminDashboard component
import AdminUpdate from './pages/admin/AdminUpdate'; // Import the AdminUpdate component
import AdminRoutes from './pages/admin/AdminDashboard'; // Import the AdminRoutes component

function App() {
  const location = useLocation();
  const shouldDisplayNavbar = location.pathname === '/' || location.pathname === '/booknow';

  return (
    <>
      <ToastContainer />
      {shouldDisplayNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/booknow" element={<BookNow />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

         {/* BookNow page */}
         <Route path="/booknow/:productId" element={<BookNow />} />
         <Route path="/booknow/payment" element={<Payment />} />
         <Route path="/booknow/confirmation" element={<Confirmation />} />
        {/* Admin Dashboard and related routes */}
        <Route element={<AdminRoutes />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/update/:id" element={<AdminUpdate />} />
        </Route>
      </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <UserProvider>
        <Router>
          <App />
        </Router>
    </UserProvider>
  );
}
