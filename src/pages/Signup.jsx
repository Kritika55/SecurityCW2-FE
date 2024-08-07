import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
    <div className="flex flex-col items-center justify-center my-10">
      <div className="flex flex-col lg:flex-row items-center justify-center max-w-[80rem] mt-8">
        <div className="lg:w-1/2 text-center p-8">
          <h1 className="text-2xl font-bold mb-2">HandCrafted Gems</h1>
          <h2 className="text-5xl font-bold mb-10">
          Elegance redefined with handmade jewels.
          </h2>
          <div className="flex flex-col justify-center items-center gap-4 my-8">
            <p className="text-gray-700">Already have an account?</p>
            <Link
              to="/login"
              className="inline-flex items-center hover:text-yellow-500 font-medium"
            >
              Login
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
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
        <div className="bg-white mt-[-170px] rounded-lg p-8 w-1/2 h-[350px]">
          <h1 className="font-bold text-3xl mb-8">Create your account</h1>
          <form action="#" method="POST" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                onChange={changeUsername}
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={username}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                onChange={changeEmail}
                type="email"
                id="email"
                name="email"
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
                  onChange={changePassword}
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
                  className="absolute inset-y-0 right-0 px-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEye className="h-6 w-6 text-gray-700" />
                  ) : (
                    <FaEyeSlash className="h-6 w-6 text-gray-700" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  onChange={changeConfirmPassword}
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  name="confirm-password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <FaEye className="h-6 w-6 text-gray-700" />
                  ) : (
                    <FaEyeSlash className="h-6 w-6 text-gray-700" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={agree}
                onChange={toggleAgree}
                id="terms"
                name="terms"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                required
              />
              <label className="ml-2 block text-sm text-gray-900">
                I agree to all terms and conditions
              </label>
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
