import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UnlockAccount = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/users/forgot-password', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success) {
          toast.success('Password reset email sent!');
          navigate('/'); // Redirect to home or login page
        } else {
          toast.error(responseData.message);
        }
      })
      .catch((error) => {
        console.error('Error during password reset request:', error);
        toast.error('An error occurred during the request.');
      });
  };

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <div className="bg-white rounded-lg p-8 w-1/2">
        <h1 className="font-bold text-3xl mb-8">Unlock Your Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
          >
            Send Unlock Instructions
          </button>
        </form>
      </div>
    </div>
  );
};

export default UnlockAccount;
