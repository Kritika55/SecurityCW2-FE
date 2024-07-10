import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../CSS/Register.css";

const Registerpage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

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

    fetch("http://localhost:5000/api/users/register", {
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
    <div className="register-outer-container">
      <div className="register-form-container">
        <div className="register-left-content">
          <div className="register-text-content">
            <h2>Wheels on Lease</h2>
            <h1>
              Unlock Your Journey <br /> with Our Wheels.
            </h1>
            <p>Already have an account?</p>
            <p>
              <a href="/login">Login &rarr;</a>
            </p>
          </div>
          <img
            src={require("../../components/Assets/images/Login.png")}
            alt="Left Image"
            className="register-left-image"
          />
        </div>
        <div className="register-image-container">
          <div className="register-form-content">
            <h1>Create new account!</h1>
            <div className="register-form-group">
              <label className="register-form-label">Username</label>
              <input
                onChange={changeUsername}
                className="register-form-input"
                type="text"
                placeholder="Enter your Username"
              />
            </div>
            <div className="register-form-group">
              <label className="register-form-label">E-mail</label>
              <input
                onChange={changeEmail}
                className="register-form-input"
                type="email"
                placeholder="Enter your Email"
              />
            </div>
            <div className="register-form-group">
              <label className="register-form-label">Password</label>
              <input
                onChange={changePassword}
                className="register-form-input"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="register-form-group">
              <label className="register-form-label">Confirm Password</label>
              <input
                onChange={changeConfirmPassword}
                className="register-form-input"
                type="password"
                placeholder="Confirm your password"
              />
            </div>
            <div className="register-form-group">
              <label className="register-form-label">
                <input type="checkbox" checked={agree} onChange={toggleAgree} />{" "}
                I agree to all terms and conditions
              </label>
            </div>
            <button onClick={handleSubmit} className="register-form-button">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registerpage;
