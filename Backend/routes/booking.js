const express = require('express');
const jwt = require('jsonwebtoken');
const Razorpay = require('razorpay');
const router = express.Router();
const Event = require('../models/eventData');
const Booking = require('../models/Booking');
const Order = require('../models/orderData'); 
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();


// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: 'rzp_test_ipCtKOkJvSDDZC', // Razorpay Key
  key_secret: 'kUeOf6NfOQfBHtWFKr8Fi1DW' // Razorpay Secret
});
const transporter = nodemailer.createTransport({
  service: 'Gmail', // or use 'SMTP' if you have specific settings
  auth: {
    user: process.env.EMAIL_USER, // Replace with your email
    pass: process.env.EMAIL_PASS // Replace with your email password or use environment variables for security
  }
});

router.post('/book-ticket/:eventId', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Authorization token missing' });

    const decoded = jwt.verify(token, 'secret');
    const { eventId } = req.params;
    const { tickets, userDetails } = req.body;
    const userId = decoded.userId;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.ticketing.capacity < tickets) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    const amount = tickets * event.ticketing.price*100; 

    // Razorpay order creation
    const order = await razorpay.orders.create({
      amount: amount,
      currency: 'INR',
      receipt: `receipt_order_${new Date().getTime()}`,
    });

    if (!order) {
      return res.status(500).json({ message: 'Error creating Razorpay order' });
    }

    // Save order data in DB for future reference
    const orderData = new Order({
      orderId: order.id,
      userId,
      eventId,
      tickets,
      userDetails,
      status: 'pending',
      amount:amount,
    });
    await orderData.save();

    // Return Razorpay order ID to frontend
    res.status(200).json({
      orderData,
      orderId: order.id,
      amount,
    });

  } catch (error) {
    console.error('Error booking ticket:', error);
    res.status(500).json({ error: 'Error booking ticket' });
  }
});

   
router.post('/verify-payment', async (req, res) => {
  try {
    const { order_id, payment_id } = req.body;

    // Find the order in the database by order ID
    const order = await Order.findOne({ orderId: order_id });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Check if the payment ID matches the Razorpay order ID
    if (order.paymentId && order.paymentId !== payment_id) {
      return res.status(400).json({ message: 'Payment verification failed: mismatched payment ID' });
    }

    // Ensure that the payment status is not already completed
    if (order.status === 'confirmed') {
      return res.status(400).json({ message: 'Order already confirmed' });
    }

    // Mark the order as confirmed and save the payment ID
    order.paymentStatus = 'completed';
    order.status = 'confirmed';
    order.paymentId = payment_id;
    await order.save();

    // Reduce the event capacity
    const event = await Event.findById(order.eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    event.ticketing.capacity -= order.tickets;
    await event.save();

    // Create a booking record
    const booking = new Booking({
      userId: order.userId,
      eventId: order.eventId,
      ticketCount: order.tickets,
      paymentStatus: 'completed',
    });
    await booking.save();

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: order.userDetails.email,
      subject: 'Booking Confirmation for Your Event',
      text: `Dear ${order.userDetails.name},\n\nThank you for booking ${order.tickets} ticket(s) for the event "${event.eventName}". Your booking has been confirmed.\n\nBest regards,\nEvenly Team`
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
      return res.status(200).json({ message: 'Booking successful and email sent' });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return res.status(200).json({ message: 'Booking successful, but email failed to send' });
    }

  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Error verifying payment. Please try again later.' });
  }
});



module.exports = router;
