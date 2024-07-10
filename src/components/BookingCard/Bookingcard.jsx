import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Bookingcard.css';

const BookingCard = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [dropoffTime, setDropoffTime] = useState('');

  const locations = ["Kathmandu", "Pokhara", "Lalitpur", "Bhaktapur", "Chitwan"];

  const handlePickupInputChange = (e) => {
    const value = e.target.value;
    setPickupLocation(value);
    if (value) {
      setPickupSuggestions(locations.filter(location => location.toLowerCase().includes(value.toLowerCase())));
    } else {
      setPickupSuggestions([]);
    }
  };

  const handleDropoffInputChange = (e) => {
    const value = e.target.value;
    setDropoffLocation(value);
    if (value) {
      setDropoffSuggestions(locations.filter(location => location.toLowerCase().includes(value.toLowerCase())));
    } else {
      setDropoffSuggestions([]);
    }
  };

  const handleSuggestionClick = (setLocation, setSuggestions, suggestion) => {
    setLocation(suggestion);
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      userId: 'user-id-here',  // replace with actual user ID
      productId: 'product-id-here',  // replace with actual product ID
      pickupLocation,
      dropoffLocation,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime
    };

    try {
      const response = await axios.post('http://localhost:5000/api/bookings/create', bookingData);
      if (response.status === 201) {
        alert('Booking successful');
      }
    } catch (error) {
      console.error('Error making booking:', error);
    }
  };

  return (
    <div className="booking-card">
      <h2>Book a Vehicle Right Away</h2>
      <form className="booking-card-content" onSubmit={handleSubmit}>
        <div className="location-container">
          <div className="input-container">
            <input
              type="text"
              placeholder="Pickup Location"
              className="booking-input location-input"
              value={pickupLocation}
              onChange={handlePickupInputChange}
            />
            <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
            {pickupSuggestions.length > 0 && (
              <ul className="suggestions">
                {pickupSuggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(setPickupLocation, setPickupSuggestions, suggestion)}>
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Dropoff Location"
              className="booking-input location-input"
              value={dropoffLocation}
              onChange={handleDropoffInputChange}
            />
            <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
            {dropoffSuggestions.length > 0 && (
              <ul className="suggestions">
                {dropoffSuggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(setDropoffLocation, setDropoffSuggestions, suggestion)}>
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="input-container">
          <input
            type="date"
            className="booking-input"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
          />
          <input
            type="time"
            className="booking-input"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="date"
            className="booking-input"
            value={dropoffDate}
            onChange={(e) => setDropoffDate(e.target.value)}
          />
          <input
            type="time"
            className="booking-input"
            value={dropoffTime}
            onChange={(e) => setDropoffTime(e.target.value)}
          />
        </div>
        <button type="submit" className="search-btn">Search</button>
      </form>
    </div>
  );
};

export default BookingCard;
