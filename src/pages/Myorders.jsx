import React, { useEffect, useState, useContext } from 'react';
import { getUserBookings, deleteBookingApi } from '../api/api';
import { UserContext } from "../utils/user-context";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyBookings = () => {
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const userId = user ? user._id : null;
      if (!userId) {
        console.error('User ID not found in context.');
        setError('User ID not found. Please log in.');
        setLoading(false);
        return;
      }

      const response = await getUserBookings(userId);
      console.log('API response:', response);

      if (response.data.success) {
        setBookings(response.data.bookings);
      } else {
        setError(response.data.message);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Error fetching bookings. Please try again.');
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const confirmCancel = window.confirm('Are you sure you want to cancel this booking?');
      if (!confirmCancel) {
        return;
      }

      const response = await deleteBookingApi(bookingId);
      console.log('Cancellation response:', response);

      if (response.data.success) {
        setBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingId));
        toast.success('Your booking was cancelled successfully!');
      } else {
        setError(response.data.message);
        toast.error('Failed to cancel booking. Please try again.');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      setError('Error cancelling booking. Please try again.');
      toast.error('Failed to cancel booking. Please try again.');
    }
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center p-4">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking._id} className="relative border rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105" style={{ width: '18rem' }}>
            <span className="bg-blue-500 text-white py-1 px-2 rounded-b-md absolute top-0">{booking.productCategory}</span>
            <img
              src={booking.productImage}
              className="w-full h-48 object-cover border-b border-gray-300"
              alt={booking.productName}
            />
            <div className="p-4">
              <h5 className="text-lg font-semibold mb-2 text-gray-700">{booking.productName}</h5>
              <button
                className="btn btn-danger mt-3 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg"
                onClick={() => handleCancelBooking(booking._id)}
              >
                Delete Order
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default MyBookings;
