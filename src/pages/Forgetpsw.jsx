import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { forgotPasswordApi } from '../api/Api';
import '../CSS/Forgetpsw.css'; // Adjust the path as per your project structure

const ForgetPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await forgotPasswordApi(values);
        toast.success('Email sent successfully');
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error('Email not found');
        } else {
          toast.error('Server error');
        }
      }
    },
  });

  return (
    <div className="forgot-password-outer-container">
      <div className="forgot-password-form-container">
        <div className="forgot-password-image-container">
          <div className="forgot-password-form-content">
            <h1>Reset Your Password</h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="forgot-password-form-group">
                <label htmlFor="email" className="forgot-password-form-label">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="forgot-password-input-field"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="forgot-password-error-message">{formik.errors.email}</div>
                ) : null}
              </div>
              <button type="submit" className="forgot-password-submit-button">Submit</button>
            </form>
          </div>
        </div>
        <div className="forgot-password-left-content">
          <div className="forgot-password-text-content">
            <h2>Wheels on Lease</h2>
            <h1>Where Every <br/>Mile Tells a <br/>Story</h1>
            <p>Remembered your password?</p>
            <p><a href="/login">Go back to login &rarr;</a></p>
          </div>
          <img src={require('../components/Assets/images/Login.png')} alt="Left Image" className="forgot-password-left-image" />
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
