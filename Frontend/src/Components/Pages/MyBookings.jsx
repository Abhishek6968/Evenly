import React, { useEffect, useState } from 'react';
import './MyBooking.css';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:4000/book/my-bookings', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setBookings(data.bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="bookings-container">
      {bookings.map((booking) => (
        <div key={booking._id} className="booking-card">
          <h3>Event Details</h3>
          <p><strong>Event Name:</strong> {booking.eventId.eventName}</p>
          <p><strong>Date:</strong> {new Date(booking.eventId.date).toDateString()}</p>
          <p><strong>Venue:</strong> {booking.eventId.location.venue || 'Online Event'}</p>
          <p><strong>Address:</strong> {booking.eventId.location.address}</p>
          {booking.eventId.location.virtualLink && (
            <p><strong>Virtual Link:</strong> <a href={booking.eventId.location.virtualLink}>Join Event</a></p>
          )}
          <h3>Booking Details</h3>
          <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toDateString()}</p>
          <p><strong>Ticket Count:</strong> {booking.ticketCount}</p>
          <p><strong>Payment Status:</strong> {booking.paymentStatus}</p>
        </div>
      ))}
    </div>
  );
};

export default Bookings;
