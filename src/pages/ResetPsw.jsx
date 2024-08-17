// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { resetPasswordApi } from "../api/api";

// const ResetPassword = () => {
//     const navigate = useNavigate();
//     const email = new URLSearchParams(window.location.search).get('email');

//     const formik = useFormik({
//         initialValues: {
//             newPassword: "",
//             confirmPassword: "",
//         },
//         validationSchema: Yup.object({
//             newPassword: Yup.string()
//                 .min(6, "Password is too short - should be 6 chars minimum.")
//                 .required("New password is required"),
//             confirmPassword: Yup.string()
//                 .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
//                 .required("Please confirm your password"),
//         }),
//         onSubmit: async (values) => {
//             const { newPassword } = values;
//             try {
//                 await resetPasswordApi(email, newPassword);
//                 toast.success("Password reset successfully");
//                 setTimeout(() => {
//                     navigate("/login");
//                 }, 3000);
//             } catch (error) {
//                 toast.error("Failed to reset password. Please try again.");
//             }
//         },
//     });

//     return (
//         <>
//             <ToastContainer />
//             <div className="bg-gray-100 h-screen flex items-center justify-center">
//                 <div className="bg-white p-10 rounded-lg shadow-lg">
//                     <h1 className="text-3xl font-semibold mb-6">Reset Password</h1>
//                     <form onSubmit={formik.handleSubmit} className="space-y-5">
//                         <div>
//                             <label
//                                 htmlFor="newPassword"
//                                 className={`block text-sm font-medium ${
//                                     formik.touched.newPassword && formik.errors.newPassword ? "text-red-500" : "text-gray-700"
//                                 }`}
//                             >
//                                 {formik.touched.newPassword && formik.errors.newPassword ? formik.errors.newPassword : "New Password"}
//                             </label>
//                             <motion.input
//                                 type="password"
//                                 id="newPassword"
//                                 name="newPassword"
//                                 placeholder="Enter your new password"
//                                 className={`mt-1 p-2 w-full border rounded-md focus:outline-none ${
//                                     formik.touched.newPassword && formik.errors.newPassword ? "border-red-500" : "border-gray-300"
//                                 }`}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 value={formik.values.newPassword}
//                             />
//                         </div>

//                         <div>
//                             <label
//                                 htmlFor="confirmPassword"
//                                 className={`block text-sm font-medium ${
//                                     formik.touched.confirmPassword && formik.errors.confirmPassword ? "text-red-500" : "text-gray-700"
//                                 }`}
//                             >
//                                 {formik.touched.confirmPassword && formik.errors.confirmPassword
//                                     ? formik.errors.confirmPassword
//                                     : "Confirm Password"}
//                             </label>
//                             <motion.input
//                                 type="password"
//                                 id="confirmPassword"
//                                 name="confirmPassword"
//                                 placeholder="Confirm your new password"
//                                 className={`mt-1 p-2 w-full border rounded-md focus:outline-none ${
//                                     formik.touched.confirmPassword && formik.errors.confirmPassword ? "border-red-500" : "border-gray-300"
//                                 }`}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 value={formik.values.confirmPassword}
//                             />
//                         </div>

//                         <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             type="submit"
//                             className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
//                         >
//                             Reset Password
//                         </motion.button>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default ResetPassword;


import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPasswordApi } from "../api/api";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    const data = {
      password: newPassword,
    };

    resetPasswordApi(data, token)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Link has been expired");
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="container flex justify-center py-5">
        <div className="w-full max-w-4xl">
          <div className="flex flex-col md:flex-row shadow-lg bg-white rounded-lg overflow-hidden">
            <div className="md:w-1/2 p-6">
              <img
                src="https://i.pinimg.com/564x/76/38/69/763869a33c8ac9e99a59500992c11127.jpg"
                alt="login image"
                className="img-fluid"
                style={{ marginTop: "100px" }}
              />
            </div>
            <div className="md:w-1/2 flex flex-col justify-center p-6">
              <form onSubmit={handleResetPassword}>
                <div className="mb-4 text-center">
                  <h3 className="text-2xl font-semibold mb-3">Reset Your Password</h3>
                  <p className="text-gray-600">
                    Please enter the new password. Remember you cannot enter your old password again.
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">New Password</label>
                  <input
                    onChange={handleNewPassword}
                    value={newPassword}
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    className="btn w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                    type="submit"
                  >
                    Reset
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>





  );
};

export default ResetPassword;