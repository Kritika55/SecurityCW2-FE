// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { forgotPasswordApi } from '../api/api';

// const ForgetPsw = () => {
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       email: '',
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email('Invalid email address').required('Required'),
//     }),
//     onSubmit: async (values) => {
//       try {
//         await forgotPasswordApi(values);
//         toast.success('OTP sent successfully');
//         // Redirect to OTP verification page
//         navigate(`/verify-otp?email=${values.email}`);
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           toast.error('Email not found');
//         } else {
//           toast.error('Server error');
//         }
//       }
//     },
//   });

//   return (
//     <div className="flex flex-col items-center justify-center my-10">
//       <div className="flex flex-col lg:flex-row items-center justify-center max-w-[80rem] mt-8">
//         <div className="lg:w-1/2 text-center p-8">
//           <h1 className="text-2xl font-bold mb-2">HandCrafted Gems</h1>
//           <h2 className="text-5xl font-bold mb-10">Elegance redefined with handmade jewels.</h2>
//           <div className="flex flex-col justify-center items-center gap-4 my-8">
//             <p className="text-gray-700">Remembered your password?</p>
//             <Link to="/login" className="inline-flex items-center hover:text-yellow-500 font-medium">
//               Go back
//               <svg
//                 className="w-4 h-4 ml-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M17 8l4 4m0 0l-4 4m4-4H3"
//                 />
//               </svg>
//             </Link>
//           </div>
//           <div className="text-center w-full">
//             <img
//               src="https://img.freepik.com/premium-photo/panoramic-photo-collage-modern-jewelry-collection-violet-pink-background_112112-1349.jpg?w=1380"
//               className="object-cover rounded-lg"
//               alt="Jewelry Collection"
//             />
//           </div>
//         </div>
//         <div className="lg:w-1/2 p-8">
//           <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>
//           <form onSubmit={formik.handleSubmit} className="space-y-4">
//             <div>
//               <label
//                 htmlFor="email"
//                 className={`block text-sm font-medium ${
//                   formik.touched.email && formik.errors.email ? 'text-red-500' : 'text-gray-700'
//                 }`}
//               >
//                 {formik.touched.email && formik.errors.email ? formik.errors.email : 'Email Address'}
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="Enter your email address"
//                 className={`mt-1 p-2 w-full border rounded-md focus:outline-none ${
//                   formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.email}
//               />
//             </div>
//             <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
//               Send OTP
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgetPsw;



import React, { useState } from "react";
import { forgotPasswordApi } from "../api/api";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const handleForgotPasswordEmail = (e) => {
    setForgotPasswordEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: forgotPasswordEmail,
    };

    forgotPasswordApi(data)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          // You can redirect the user to another page if needed
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.error("Forgot Password API Error:", error);
        toast.error("An error occurred while trying to reset the password.");
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="container flex justify-center py-5">
        <div className="w-full max-w-4xl">
          <div className="flex flex-col md:flex-row shadow-lg bg-white rounded-lg overflow-hidden">
            <div className="md:w-1/2 p-6">
              <img
                src="https://i.pinimg.com/564x/0e/a5/4e/0ea54e5a470405dfdf3d98bf543460e5.jpg"
                alt="Reset password illustration"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 flex flex-col justify-center p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-4 text-center">
                  <h3 className="text-2xl font-semibold mb-3">Reset Your Password</h3>
                  <p className="text-gray-600">
                    Please enter the email address associated with your account, and we will email you a link to reset your password.
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Email address</label>
                  <input
                    onChange={handleForgotPasswordEmail}
                    value={forgotPasswordEmail}
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    className="btn w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                    type="submit"
                  >
                    Send Request
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-gray-600">
                    Back to{" "}
                    <a
                      href="/login"
                      className="text-blue-500 hover:underline"
                    >
                      Login
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;