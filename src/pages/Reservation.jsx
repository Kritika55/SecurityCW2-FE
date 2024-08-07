import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ReservationSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    pickupLocation,
    dropOffLocation,
    pickupDate,
    dropOffDate,
    vehicle,
  } = location.state || {};

  // Function to calculate the amount based on pickupDate, dropOffDate, and pricePerDay
  const calculateAmount = () => {
    const pricePerDay = vehicle.productPrice; // Ensure vehicle.productPrice is defined correctly
    const pickup = new Date(pickupDate);
    const dropOff = new Date(dropOffDate);
    const diffTime = Math.abs(dropOff - pickup);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays * pricePerDay;
  };

  const amount = vehicle ? calculateAmount() : 0;

  const handleConfirm = () => {
    // Navigate to the Thank You page
    navigate("/confirmed-order");
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Reservation Summary</h2>
      <div className="w-full flex flex-col items-center">
        <div className="mb-4 w-full">
          <p>
            <strong>Pick-up Location:</strong> {pickupLocation}
          </p>
        </div>
        <div className="mb-4 w-full">
          <p>
            <strong>Drop-off Location:</strong> {dropOffLocation}
          </p>
        </div>
        <div className="mb-4 w-full">
          <p>
            <strong>Pick-up Date:</strong> {pickupDate}
          </p>
        </div>
        <div className="mb-4 w-full">
          <p>
            <strong>Drop-off Date:</strong> {dropOffDate}
          </p>
        </div>
        <div className="mb-4 w-full">
          <p>
            <strong>Amount:</strong> Rs. {amount || 7000} /-
          </p>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/qr.jpg`}
          alt="QR Code"
          className="w-32 h-32 mb-4"
        />
        <button
          onClick={handleConfirm}
          className="w-full py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
        >
          Confirm Reservation
        </button>
      </div>
    </div>
  );
};

export default ReservationSummary;
