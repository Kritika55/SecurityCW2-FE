import React, { useContext, useState, useEffect } from "react";
import { FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import logo from "../Assets/images/Logo.png";
import "./Navbar.css";

const Navbar = () => {
  const [menu, setMenu] = useState("Home");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navbarBg, setNavbarBg] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarBg(true);
      } else {
        setNavbarBg(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.clear();
      setUser(null);
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
    <div className={`navbar ${navbarBg ? "navbar-bg" : ""}`}>
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("Home")}>
          <Link to="/" className={menu === "Home" ? "active" : ""}>
            Home
          </Link>
        </li>
        <li onClick={() => setMenu("Vehicles")}>
          <Link to="/vehicles" className={menu === "Vehicles" ? "active" : ""}>
            Vehicles
          </Link>
        </li>
        <li onClick={() => setMenu("Contact Us")}>
          <Link
            to="/contact-us"
            className={menu === "Contact Us" ? "active" : ""}
          >
            Contact Us
          </Link>
        </li>
        <li>
          <Link to="/chat">Chat</Link>
        </li>
        {user ? (
          <li className="nav-login-cart">
            <button className="dropdown-button" onClick={toggleDropdown}>
              {capitalizeUsername(user.username)}!
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="user-profile">
                  <p>
                    <FaUser /> {user.email}
                  </p>
                </div>
                <ul>
                  <li>
                    <Link to="/profile">
                      <FaUser /> Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings">
                      <FaCog /> Settings
                    </Link>
                  </li>
                  <li onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </li>
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
