import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { forgotPasswordApi } from '../api/api'; // Ensure correct path to your API file

const Forgetpsw = () => {
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
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your Email"
                className="mt-1 p-2 w-full border rounded-md"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="forgot-password-error-message">{formik.errors.email}</div>
              ) : null}
            </div>
            <button type="submit" className="w-full py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgetpsw;
