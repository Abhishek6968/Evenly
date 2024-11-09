// server-side route for booking (e.g., routes/booking.js)
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Event = require('../models/eventData');
const Booking = require('../models/Booking');

router.post('/book-ticket/:eventId', async (req, res) => {
  try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ message: 'Authorization token missing' });
      
      const decoded = jwt.verify(token, 'secret');
      const { eventId } = req.params;
      const { tickets } = req.body;
      const userId = decoded.userId;
      const ticketsCount = parseInt(tickets, 10);

      if (isNaN(ticketsCount)) {
        return res.status(400).json({ message: 'Invalid ticket count' });
      }

      const event = await Event.findById(eventId);
      if (!event) return res.status(404).json({ message: 'Event not found' });
      if (event.ticketing.capacity < ticketsCount) return res.status(400).json({ message: 'Not enough seats available' });

      // Create booking with the correct field name 'ticketCount'
      const booking = new Booking({ 
        userId, 
        eventId, 
        ticketCount: ticketsCount, // Use ticketCount here
        paymentStatus: 'completed' 
      });

      event.ticketing.capacity -= ticketsCount;
      await event.save();
      await booking.save();

      res.status(200).json({ message: 'Ticket booked successfully', booking });
  } catch (error) {
      console.error('Error booking ticket:', error);
      res.status(500).json({ error: 'Error booking ticket' });
  }
});



module.exports = router;
