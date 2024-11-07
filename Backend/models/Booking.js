const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', // This is where the Event model is referenced
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This is where the User model is referenced
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  ticketCount: {
    type: Number, // Keep this as a Number
    required: true
  }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
