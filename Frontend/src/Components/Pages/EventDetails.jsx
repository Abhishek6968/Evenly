import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, TextField } from '@mui/material';
import { useAuth } from '../../AuthContext';

export const EventDetails = () => {
    const { eventId } = useParams(); 
    const { user, token } = useAuth(); // Get the user and token from AuthContext
    const [tickets, setTickets] = useState(1);
    const [message, setMessage] = useState('');
    const [userDetails, setUserDetails] = useState({ name: '', email: '', phone: '' });

    useEffect(() => {
        if (!user) {
            setMessage('Please log in to book an event.');
        }
    }, [user]);

    const handlePayment = async () => {
        if (!user) {
            setMessage('User not authenticated. Please log in.');
            return;
        }
    
        try {
            const response = await axios.post(`http://localhost:4000/book/book-ticket/${eventId}`, 
                { tickets, userDetails }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
    
            const { orderId, amount } = response.data;
    
            const options = {
                key: 'rzp_test_ipCtKOkJvSDDZC', // Replace with your actual key_id
                amount: amount,
                currency: 'INR',
                name: 'Event Booking',
                description: 'Ticket purchase',
                order_id: orderId,
                handler: async function (response) {
                    try {
                        await axios.post('http://localhost:4000/book/verify-payment', 
                            {
                                order_id: response.razorpay_order_id,
                                payment_id: response.razorpay_payment_id,
                            }
                        );
                        setMessage('Payment successful and booking confirmed!');
                    } catch (verificationError) {
                        console.error('Verification failed:', verificationError);
                        setMessage('Payment verification failed.');
                    }
                },
                prefill: {
                    name: userDetails.name,
                    email: userDetails.email,
                    contact: userDetails.phone
                }
            };
    
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            setMessage(error.response.data.message);
    };
    
    }
    return (
        <Box>
            <Typography variant="h4">Book Your Event</Typography>
            <TextField
                label="Number of Tickets"
                type="number"
                value={tickets}
                onChange={(e) => setTickets(Number(e.target.value))}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Name"
                value={userDetails.name}
                onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Email"
                value={userDetails.email}
                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Phone"
                value={userDetails.phone}
                onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handlePayment} disabled={!user || !userDetails.name || !userDetails.email || !userDetails.phone}>
                Pay and Book Now
            </Button>
            {message && <Typography variant="body1" color="error">{message}</Typography>}
        </Box>
    );
};

export default EventDetails;
