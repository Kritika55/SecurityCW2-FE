import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../CSS/Login.css";

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

    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success) {
          console.log(responseData);
          // Save user data to local storage
          localStorage.setItem("userData", JSON.stringify(responseData.user));
          localStorage.setItem("token", responseData.token);

          // Display success message
          toast.success("Logged in successfully!");

          navigate("/home"); 
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
    <div className="outer-container">
      <div className="form-container">
        <div className="image-container">
          <div className="form-content">
            <h1>Login to your account!</h1>
            <div className="form-group">
              <label className="form-label">E-mail</label>
              <input
                onChange={changeEmail}
                className="form-input"
                type="email"
                placeholder="Enter your Email"
                value={email}
              />
            </div>
          
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                onChange={changePassword}
                className="form-input"
                type="password"
                placeholder="Enter your password"
                value={password}
              />
            </div>

            <div className="checkbox-container">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  className="checkbox-input"
                />
                Remember me
              </label>
              <span className="forgot-password">Forgot password?</span>
            </div>

            <button onClick={handleSubmit} className="form-button">
              Login
            </button>
          </div>
        </div>

        <div className="left-content">
          <div className="text-content">
            <h2>Wheels on Lease</h2>
            <h1>Your Perfect<br/>Ride,Just a Lease<br/>Away</h1>
            <p>Don't have an account?</p>
            <p><a href="/register">Create account &rarr;</a></p>
          </div>
          <img src={require('../components/Assets/images/Login.png')} alt="Left Image" className="left-image" />
        </div>
      </div>
    </div>
  );
};

export default Login;
