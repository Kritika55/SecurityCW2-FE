import React, { useState } from "react";
import '../navbar/Navbar.css';
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/images/Logo.png";

const Navbar = () => {
  const [menu, setMenu] = useState("Home");
  const user = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.clear();
      window.location.reload();
      navigate("/login");
    }
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("Home")}>
          <Link style={{ textDecoration: "none" }} to="/Home">Home</Link>
          {menu === "Home" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("Vehicles")}>
          <Link style={{ textDecoration: "none" }} to="/Vehicles">Vehicles</Link>
          {menu === "Vehicles" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("Contact Us")}>
          <Link style={{ textDecoration: "none" }} to="/mostliked">Contact Us</Link>
          {menu === "Contact Us" ? <hr /> : null}
        </li>
        <li>
          Chat
        </li>
        {user ? (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <li>
            <Link to="/login">
              <button>Login/Signup</button>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
