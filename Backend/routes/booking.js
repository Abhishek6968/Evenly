const express = require('express');
const router = express.Router();
const app = express();
app.use(express.json());
const Event = require('../models/eventData');
const Booking = require('../models/Booking');
const mongoose = require('mongoose');



// Route to book tickets
router.post('/book-ticket/:eventId', async (req, res) => {
  try {
    const {eventId}=req.params;
    const { userId, tickets } = req.body;
    const ticketCount = Number(tickets); 
    if (isNaN(ticketCount) || ticketCount <= 0) {
    return res.status(400).json({ error: 'Invalid ticket count' });
    }

    console.log(req.body);
     // Validate userId format
     if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }
    

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if there are enough tickets available
    if (event.ticketing.capacity < ticketCount) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    // Create a new booking with status 'booked'
    const booking = new Booking({
      userId,
      eventId,
      ticketCount: ticketCount, // Use ticketCount or adapt field name
      paymentStatus: 'completed'
    });
    ;

    // Reduce the event's ticket capacity
    event.ticketing.capacity = event.ticketing.capacity - ticketCount;
    await event.save(); // Save the updated event capacity
    await booking.save(); // Save the booking

    res.status(200).json({ message: 'Ticket booked successfully', booking });
  } catch (error) {
    console.error('Error booking ticket:', error);
    res.status(500).json({ error: 'Error booking ticket' });
  }
});

module.exports = router;
