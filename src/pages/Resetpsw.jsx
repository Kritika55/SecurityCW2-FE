import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPasswordApi } from '../api/Api';
import '../CSS/Resetpsw.css'; 

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
        <div className="reset-password-outer-container">
            <div className="reset-password-form-container">
                <div className="reset-password-image-container">
                    <div className="reset-password-form-content">
                        <h2>Reset Password</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="reset-password-form-group">
                                <label className="reset-password-form-label">New Password:</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="reset-password-input-field"
                                />
                            </div>
                            <div className="reset-password-form-group">
                                <label className="reset-password-form-label">Confirm New Password:</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="reset-password-input-field"
                                />
                            </div>
                            <button type="submit" className="reset-password-submit-button">Reset Password</button>
                        </form>
                    </div>
                </div>
                <div className="reset-password-left-content">
                    <div className="reset-password-text-content">
                        <h2>Wheels on Lease</h2>
                        <h1>Rent the <br/>Best, Leave the  <br/>Rest</h1>
                        <p>Remembered your password?</p>
                        <p><a href="/login">Go back to login &rarr;</a></p>
                    </div>
                    <img src={require('../components/Assets/images/Login.png')} alt="Left Image" className="reset-password-left-image" />
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
