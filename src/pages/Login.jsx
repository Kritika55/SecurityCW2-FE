import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import { isUserLoggedIn, saveUserData } from "../utils/localStorage";

// Handle Email and Password Changes
const useInputHandler = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => setValue(e.target.value);
  return [value, onChange];
};

// Handle Password Visibility Toggle
const usePasswordToggle = () => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible(!visible);
  return [visible, toggleVisibility];
};

// Calculate the time difference between the lockout end time and the current time
const calculateTimeRemaining = (lockoutEnd) => {
  const now = new Date().getTime();
  const timeLeft = lockoutEnd - now;
  return timeLeft > 0 ? timeLeft : 0;
};

// Format time from milliseconds to minutes and seconds
const formatTime = (milliseconds) => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// Login Component
const Login = () => {
  const [email, setEmail] = useInputHandler("");
  const [password, setPassword] = useInputHandler("");
  const [showPassword, togglePasswordVisibility] = usePasswordToggle();
  const [showLockoutPopup, setShowLockoutPopup] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(null); // Track lockout end time
  const [timeRemaining, setTimeRemaining] = useState(0); // Track remaining time
  const navigate = useNavigate();

  useEffect(() => {
    if (lockoutTime) {
      const interval = setInterval(() => {
        const timeLeft = calculateTimeRemaining(lockoutTime);
        setTimeRemaining(timeLeft);

        if (timeLeft <= 0) {
          clearInterval(interval);
          setShowLockoutPopup(false);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [lockoutTime]);

  // Handle Login Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (timeRemaining > 0) {
      toast.error("Account is locked. Please wait until the lockout period ends.");
      return;
    }

    const data = { email, password };

    fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(handleLoginResponse)
      .catch(handleError);
  };

  // Handle Login Response
  const handleLoginResponse = (responseData) => {
    if (responseData.success) {
      saveUserData(responseData.user, responseData.token);
      toast.success("Login successful!");
      navigate("/");
      window.location.reload();
    } else if (responseData.locked) {
      setShowLockoutPopup(true);
      const lockoutEnd = new Date().getTime() + responseData.lockoutDuration * 1000;
      setLockoutTime(lockoutEnd);
      setTimeRemaining(responseData.lockoutDuration * 1000);
      toast.error("Account locked due to multiple failed login attempts.");
    } else {
      toast.error(responseData.message || "Login failed.");
    }
  };

  // Handle Error
  const handleError = (error) => {
    toast.error("An error occurred during login. Please try again.");
    console.error("Error during login:", error);
  };

  // Handle Password Reset Request
  const handlePasswordResetRequest = () => {
    const data = { email };

    fetch("http://localhost:5000/api/users/request-password-reset", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(handlePasswordResetResponse)
      .catch(handleError);
  };

  // Handle Password Reset Response
  const handlePasswordResetResponse = (responseData) => {
    if (responseData.success) {
      toast.success("Password reset email sent successfully!");
    } else {
      toast.error(responseData.message || "Failed to send password reset email.");
    }
  };

  // Render Lockout Popup
  const renderLockoutPopup = () => {
    if (!showLockoutPopup) return null;

    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        style={{ zIndex: 9999 }}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg z-60">
          <h2 className="text-xl font-bold mb-4">Account Locked</h2>
          <p className="mb-4">
            Your account is locked due to multiple failed login attempts.
            {timeRemaining > 0
              ? ` You can try again in ${formatTime(timeRemaining)} minutes.`
              : " Please wait..."}
          </p>
          <p className="mb-4">
            Do you want to receive an email to recover your account?
          </p>
          <div className="flex justify-end">
            <button
              onClick={handlePasswordResetRequest}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Yes, Send Email
            </button>
            <button
              onClick={() => setShowLockoutPopup(false)}
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              No, Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Main Component Render
  return (
    <div className="flex flex-col items-center justify-center my-10 relative">
      <div className="flex flex-col lg:flex-row items-center justify-center max-w-[80rem] mt-8">
        <div className="lg:w-1/2 text-center p-8">
          <h1 className="text-2xl font-bold mb-2">HandCrafted Gems</h1>
          <h2 className="text-5xl font-bold mb-10">
            Elegance redefined with handmade jewels.
          </h2>
          <div className="flex flex-col justify-center items-center gap-4 my-8">
            <p className="text-gray-700">Don't have an account?</p>
            <Link
              to="/register"
              className="inline-flex items-center hover:text-yellow-500 font-medium"
            >
              Signup
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </Link>
          </div>
          <div className="text-center w-full">
            <img
              src="https://img.freepik.com/premium-photo/panoramic-photo-collage-modern-jewelry-collection-violet-pink-background_112112-1349.jpg?w=1380"
              className="w-[461px] h-[211px] rounded-lg"
              alt="necklaces"
            />
          </div>
        </div>
        <div className="bg-white rounded-lg p-8 w-1/2">
          <h1 className="font-bold text-3xl mb-8">Login to your account</h1>
          <form action="#" method="POST" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                onChange={setEmail}
                type="email"
                placeholder="Enter your Email"
                value={email}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  onChange={setPassword}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-400" />
                  ) : (
                    <FaEye className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full flex justify-center bg-yellow-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      {renderLockoutPopup()}
    </div>
  );
};

export default Login;
