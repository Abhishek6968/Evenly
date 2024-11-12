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
      {/* Handle event name */}
      <p>
        <strong>Event Name:</strong> {booking.eventId && booking.eventId.eventName ? booking.eventId.eventName : "Event Name Unavailable"}
      </p>

      {/* Handle event date */}
      <p>
        <strong>Date:</strong> {booking.eventId && booking.eventId.date ? new Date(booking.eventId.date).toDateString() : "Date Unavailable"}
      </p>

      {/* Handle venue */}
      <p>
        <strong>Venue:</strong> {booking.eventId && booking.eventId.location && booking.eventId.location.venue ? booking.eventId.location.venue : "Venue Unavailable"}
      </p>

      {/* Handle address */}
      <p>
        <strong>Address:</strong> {booking.eventId && booking.eventId.location && booking.eventId.location.address ? booking.eventId.location.address : "Address Unavailable"}
      </p>

      {/* Handle virtual link */}
      {booking.eventId && booking.eventId.location && booking.eventId.location.virtualLink ? (
        <p>
          <strong>Virtual Link:</strong> <a href={booking.eventId.location.virtualLink} target="_blank" rel="noopener noreferrer">Join Event</a>
        </p>
      ) : (
        <p><strong>Virtual Link:</strong> Not Available</p>
      )}

      <h3>Booking Details</h3>
      {/* Handle booking date */}
      <p>
        <strong>Booking Date:</strong> {booking.bookingDate ? new Date(booking.bookingDate).toDateString() : "Booking Date Unavailable"}
      </p>

      {/* Handle ticket count */}
      <p>
        <strong>Ticket Count:</strong> {booking.ticketCount ? booking.ticketCount : "Ticket Count Unavailable"}
      </p>

      {/* Handle payment status */}
      <p>
        <strong>Payment Status:</strong> {booking.paymentStatus ? booking.paymentStatus : "Payment Status Unavailable"}
      </p>
    </div>
  ))}
</div>

  );
};

export default Bookings;
