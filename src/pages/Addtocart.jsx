import React, { useEffect, useState, useContext } from 'react';
import { getUserBookings, deleteBookingApi } from '../api/api';
import { UserContext } from "../utils/user-context";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import KhaltiCheckout from 'khalti-checkout-web';
import config from '../components/Khalti/khaltiConfig';

const AddToCartPage = () => {
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [checkoutItems, setCheckoutItems] = useState([]);
  const navigate = useNavigate();
  const khaltiCheckout = new KhaltiCheckout(config);

  useEffect(() => {
    fetchBookings();
    const storedCheckoutItems = JSON.parse(localStorage.getItem('checkoutItems')) || [];
    setCheckoutItems(storedCheckoutItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('checkoutItems', JSON.stringify(checkoutItems));
  }, [checkoutItems]);

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
        setCheckoutItems(prevItems => prevItems.filter(item => item._id !== bookingId));
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

  const handleProceedToCheckout = () => {
    khaltiCheckout.show({
      amount: Math.ceil(calculateTotal() * 100),
    });
  };

  const handleAddToCheckout = (booking) => {
    setCheckoutItems(prevItems => [...prevItems, booking]);
  };

  const handleRemoveFromCheckout = (bookingId) => {
    setCheckoutItems(prevItems => prevItems.filter(item => item._id !== bookingId));
  };

  const handleQuantityChange = (bookingId, delta) => {
    setCheckoutItems(prevItems =>
      prevItems.map(item => 
        item._id === bookingId
          ? { ...item, productQuantity: Math.max(1, item.productQuantity + delta) }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return checkoutItems.reduce((total, item) => total + (item.productPrice * item.productQuantity), 0);
  };

  return (
    <div className="p-4">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : bookings.length > 0 ? (
        <>
                  <div className="border-t border-black mb-4"></div>

                      <h2 className="text-xl font-bold mb-4">Cart Items</h2>
          <table className="min-w-full bg-white border border-gray-300 mb-6">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left text-gray-600">Product Image</th>
                <th className="py-2 px-4 text-left text-gray-600">Product Name</th>
                <th className="py-2 px-4 text-left text-gray-600">Price per 1</th>
                <th className="py-2 px-4 text-left text-gray-600">Quantity</th>
                <th className="py-2 px-4 text-left text-gray-600">Total Price</th>
                <th className="py-2 px-4 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4">
                    <img
                      src={booking.productImage}
                      className="w-16 h-16 object-cover"
                      alt={booking.productName}
                    />
                  </td>
                  <td className="py-2 px-4 text-gray-700">{booking.productName}</td>
                  <td className="py-2 px-4 text-gray-600">Rs. {booking.productPrice}/-</td>
                  <td className="py-2 px-4 text-gray-600">{booking.productQuantity}</td>
                  <td className="py-2 px-4 text-gray-600">Rs. {booking.productPrice * booking.productQuantity}/-</td>
                  <td className="py-2 px-4 flex space-x-2">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg"
                      onClick={() => handleCancelBooking(booking._id)}
                    >
                      Delete Order
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                      onClick={() => handleAddToCheckout(booking)}
                    >
                      Add to Checkout
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {checkoutItems.length > 0 && (
            <div className="checkout-summary max-w-full mx-auto bg-gray-100 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Checkout Summary</h2>
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left text-gray-600">Product Image</th>
                    <th className="py-2 px-4 text-left text-gray-600">Product Name</th>
                    <th className="py-2 px-4 text-left text-gray-600">Price per 1</th>
                    <th className="py-2 px-4 text-left text-gray-600">Quantity</th>
                    <th className="py-2 px-4 text-left text-gray-600">Total Price</th>
                    <th className="py-2 px-4 text-left text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {checkoutItems.map((item) => (
                    <tr key={item._id} className="border-b hover:bg-gray-100">
                      <td className="py-2 px-4">
                        <img
                          src={item.productImage}
                          className="w-16 h-16 object-cover"
                          alt={item.productName}
                        />
                      </td>
                      <td className="py-2 px-4 text-gray-700">{item.productName}</td>
                      <td className="py-2 px-4 text-gray-600">Rs. {item.productPrice}/-</td>
                      <td className="py-2 px-4 text-gray-600 flex items-center space-x-2">
                        <button
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 rounded"
                          onClick={() => handleQuantityChange(item._id, -1)}
                        >
                          -
                        </button>
                        <span>{item.productQuantity}</span>
                        <button
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 rounded"
                          onClick={() => handleQuantityChange(item._id, 1)}
                        >
                          +
                        </button>
                      </td>
                      <td className="py-2 px-4 text-gray-600">Rs. {item.productPrice * item.productQuantity}/-</td>
                      <td className="py-2 px-4 flex space-x-2">
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                          onClick={() => handleRemoveFromCheckout(item._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 flex items-center space-x-4">
  <h3 className="text-xl font-bold">Total: Rs. {calculateTotal()}/-</h3>
  <button
    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
    style={{ marginLeft: '1350px' }} // Inline style for more precise control
    onClick={handleProceedToCheckout}
  >
    Proceed to Payment
  </button>
</div>

            </div>
          )}
        </>
      ) : (
        <p>No bookings found.</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default AddToCartPage;
