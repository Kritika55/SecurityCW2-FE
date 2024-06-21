import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import '../CSS/Register.css';

const Registerpage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false); // New state for checkbox

  const navigate = useNavigate();

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const toggleAgree = () => {
    setAgree(!agree);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!agree) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }

    const data = {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    fetch("http://localhost:5000/api/users/register", { // Updated URL
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success === true) {
          toast.success(responseData.message);
          navigate("/login");
        } else {
          toast.error(responseData.message);
        }
      })
      .catch((error) => {
        toast.error("Error during registration: " + error);
      });
  };

  return (
    <div className="outer-container" style={{ height: "100vh" }}> 
      <div className="register-form-container"> 
        <div className="register-image-container">
          <div className="register-form-content">
            <h1>Create new account!</h1>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                onChange={changeUsername}
                className="form-input"
                type="text"
                placeholder="Enter your Username"
              />
            </div>
            <div className="form-group">
              <label className="form-label">E-mail</label>
              <input
                onChange={changeEmail}
                className="form-input"
                type="email"
                placeholder="Enter your Email"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                onChange={changePassword}
                className="form-input"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                onChange={changeConfirmPassword}
                className="form-input"
                type="password"
                placeholder="Confirm your password"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={toggleAgree}
                />{" "}
                I agree to all terms and conditions
              </label>
            </div>
            <button onClick={handleSubmit} className="form-button">
              Register
            </button>
          </div>
        </div>

        <div className="left-content">
          <div className="text-content">
            <h2>Wheels on Lease</h2>
            <h1>Unlock Your <br/>Journey with Our Wheels.<br/>Away</h1>
            <p>Already have an account?</p>
            <p><a href="/login">Login &rarr;</a></p>
          </div>
          <img src={require('../components/Assets/images/Login.png')} alt="Left Image" className="left-image" />
        </div>
      </div>
    </div>
  );
};

export default Registerpage;
