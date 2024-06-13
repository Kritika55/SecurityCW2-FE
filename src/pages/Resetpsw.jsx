// ResetPassword.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { resetPasswordApi } from '../api/Api';
import { toast } from 'react-toastify';

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
            const response = await resetPasswordApi(token, newPassword);
            toast.success("Password has been reset successfully");
            // Optionally, redirect to login page or show success message
        } catch (error) {
            toast.error("Failed to reset password");
            // Handle error cases, e.g., expired token
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>Confirm New Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
