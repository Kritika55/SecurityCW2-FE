import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createBookingApi } from "../api/api";
import { UserContext } from "../utils/user-context";

const BookNow = ({ id }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // If the user is not logged in, you can redirect them or show a message
  if (!user) {
    toast.error("You need to be logged in to make a booking.");
    navigate('/login');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const formData = {
      userId: user ? user._id : null,
      productId: id,
    };

    try {
      const response = await createBookingApi(formData);

      if (response.data.success) {
        toast.success('Reservation submitted successfully!');
        navigate("/reservation");
      } else {
        console.error('Error submitting reservation:', response.statusText);
        toast.error('Failed to submit reservation. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting reservation:', error);
      toast.error('Failed to submit reservation. Please try again.');
    }
  };

  return (
    <div>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <button
          type="submit" // Change type to submit
          className="w-full py-2 mt-6 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
        >
          Add to cart
        </button>
      </form>
    </div>
  );
};

export default BookNow;
