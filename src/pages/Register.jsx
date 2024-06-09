import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Registerpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false); // New state for checkbox

  const navigate = useNavigate();

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
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    fetch("http://localhost:5000/api/register", {
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
    <div className="outer-container" style={{ height: "100vh" }}> {/* Adjusted container height */}
      <div className="form-container">
        <div className="image-container">
          <div className="form-content">
            <h1>Create new account!</h1>
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
            {/* <span className="form-link">
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-none text-red">
                Login here
              </Link>
            </span> */}
          </div>
        </div>

        <div className="left-content">
          <div className="text-content">
            <h2>Wheels on Lease</h2>
            <h1>Your Perfect<br/>Ride,Just a Lease<br/>Away</h1>
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
