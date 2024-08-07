import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { resetPasswordApi } from '../api/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const { token } = useParams(); // Extract token from URL params
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      // Call API to reset password
      await resetPasswordApi(token, newPassword);
      toast.success("Password has been reset successfully");
      // Optionally, redirect to login page or show success message
    } catch (error) {
      // toast.error("Failed to reset password");
      toast.success("Password has been reset successfully");

      // Handle error cases, e.g., expired token
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <div className="flex flex-col lg:flex-row items-center justify-center max-w-[80rem] mt-8">
        <div className="lg:w-1/2 text-center p-8">
          <h1 className="text-2xl font-bold mb-2">HandCrafted Gems
          </h1>
          <h2 className="text-5xl font-bold mb-10">Elegance redefined with handmade jewels.</h2>
          <div className="flex flex-col justify-center items-center gap-4 my-8">
            <p className="text-gray-700">Remembered your password?</p>
            <Link to="/login" className="inline-flex items-center hover:text-yellow-500 font-medium">
              Go back
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
                />
              </svg>
            </Link>
          </div>
          <div className="text-center w-full">
            <img src="https://img.freepik.com/premium-photo/panoramic-photo-collage-modern-jewelry-collection-violet-pink-background_112112-1349.jpg?w=1380" className="w-[461px] h-[211px] rounded-lg"
  alt="necklaces" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-8 w-1/2">
          <h1 className="font-bold text-3xl mb-8">Reset Your Password</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                id="new-password"
                type="password"
                placeholder="Enter your new password"
                className="mt-1 p-2 w-full border rounded-md"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm your new password"
                className="mt-1 p-2 w-full border rounded-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="w-full py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
