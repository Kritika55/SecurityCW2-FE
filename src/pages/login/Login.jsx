import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../CSS/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    fetch("http://localhost:5000/api/users/login", { // Ensure this matches your backend route
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Response Data:", responseData); // Debugging log
        if (responseData.success) {
          // Save user data to local storage
          localStorage.setItem("userData", JSON.stringify(responseData.user));
          localStorage.setItem("token", responseData.token);

          // Display success message
          toast.success("Logged in successfully!");

          navigate("/");
        } else {
          toast.error(responseData.message);
        }
      })
      .catch((error) => {
        // Handle network errors or other issues
        console.error("Error during login:", error);
        toast.error("An error occurred during login.");
      });
  };

  return (
    <div className="login-outer-container">
      <div className="login-form-container">
        <div className="login-image-container">
          <div className="login-form-logincontent">
            <h1>Login to your account!</h1>
            <div className="login-form-group">
              <label className="login-form-label">E-mail</label>
              <input
                onChange={changeEmail}
                className="login-form-input"
                type="email"
                placeholder="Enter your Email"
                value={email}
              />
            </div>
          
            <div className="login-form-group">
              <label className="login-form-label">Password</label>
              <input
                onChange={changePassword}
                className="login-form-input"
                type="password"
                placeholder="Enter your password"
                value={password}
              />
            </div>

            <div className="login-checkbox-container">
              <label className="login-checkbox-label">
                <input
                  type="checkbox"
                  className="login-checkbox-input"
                />
                Remember me
              </label>
              <Link to="/forget-password" className="login-forgot-password">Forgot password?</Link>
            </div>

            <button onClick={handleSubmit} className="login-form-loginbutton">
              Login
            </button>
          </div>
        </div>

        <div className="login-left-content">
          <div className="login-text-content">
            <h2>Wheels on Lease</h2>
            <h1>Your Perfect Ride,<br/> Just a Lease Away</h1>
            <p>Don't have an account?</p>
            <p><Link to="/register">Create account &rarr;</Link></p>
          </div>
          <img src={require('../../components/Assets/images/Login.png')} alt="Left Image" className="login-left-image" />
        </div>
      </div>
    </div>
  );
};

export default Login;
