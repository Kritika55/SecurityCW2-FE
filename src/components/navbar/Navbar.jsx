import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/images/Logo.png";
import { profileApi } from '../../api/Api.jsx';
import '../navbar/Navbar.css'; // Assuming you have a separate CSS file for Navbar styles
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Import icons from react-icons library

const Navbar = () => {
  const [menu, setMenu] = useState("Home");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      profileApi()
      .then(response => {
        if (response.status === 200 && response.data.success) {
          setUserData(response.data.data);
        } else {
          console.error('Failed to fetch user data');
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  }, [token]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.clear();
      window.location.reload();
      navigate("/login");
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const capitalizeUsername = (username) => {
    if (!username) return "";
    return username.charAt(0).toUpperCase() + username.slice(1);
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("Home")}>
          <Link to="/" className={menu === "Home" ? "active" : ""}>Home</Link>
        </li>
        <li onClick={() => setMenu("Vehicles")}>
          <Link to="/vehicles" className={menu === "Vehicles" ? "active" : ""}>Vehicles</Link>
        </li>
        <li onClick={() => setMenu("Contact Us")}>
          <Link to="/contact-us" className={menu === "Contact Us" ? "active" : ""}>Contact Us</Link>
        </li>
        <li>Chat</li>
        {userData ? (
          <li className="nav-login-cart">
            <button className="dropdown-button" onClick={toggleDropdown}>
              {capitalizeUsername(userData.username)}!
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="user-profile">
                  <p><FaUser/> {userData.email}</p>
                </div>
                <ul>
                  <li><Link to="/profile"><FaUser /> Profile</Link></li>
                  <li><Link to="/settings"><FaCog /> Settings</Link></li>
                  <li onClick={handleLogout}><FaSignOutAlt /> Logout</li>
                </ul>
              </div>
            )}
          </li>
        ) : (
          <li className="nav-login-cart">
            <Link to="/login">
              <button className="login-button">Login/Signup</button>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
