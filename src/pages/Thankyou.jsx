import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";

const ThankYou = () => {
  return (
    <div className="flex justify-center items-center bg-gray-100 py-20">
      <div className="max-w-lg w-full mx-4 p-4 bg-white shadow-lg rounded-lg text-center my-4">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-2">Thank You!</h2>
          <AiOutlineCheckCircle className="text-4xl text-green-500 mb-2" />
        </div>
        <p className="text-lg mb-4">Your reservation has been confirmed.</p>
        <p className="text-lg mb-4">We appreciate your business and look forward to serving you again.</p>
        <Link
          to="/"
          className="py-2 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
        >
          Keep Browsing
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
