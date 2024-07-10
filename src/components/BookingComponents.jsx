import React, { useState, useEffect } from 'react';
import { getAllBookingsApi } from '../apis/Api';
import { toast } from 'react-toastify';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = () => {
        getAllBookingsApi()
            .then((res) => {
                setBookings(res.data.bookings);
            })
            .catch((error) => {
                console.error('Error fetching bookings:', error);
                toast.error('Failed to fetch bookings');
            });
    };

    return (
        <div className="bookings">
            <h2>Bookings</h2>
            <table className="table mt-4">
                <thead className="table-dark">
                    <tr>
                        <th>User</th>
                        <th>Product</th>
                        <th>Pickup Location</th>
                        <th>Dropoff Location</th>
                        <th>Pickup Date</th>
                        <th>Dropoff Date</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking._id}>
                            <td>{booking.userId.name}</td>
                            <td>{booking.productId.name}</td>
                            <td>{booking.pickupLocation}</td>
                            <td>{booking.dropoffLocation}</td>
                            <td>{new Date(booking.pickupDate).toLocaleString()}</td>
                            <td>{new Date(booking.dropoffDate).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Bookings;
