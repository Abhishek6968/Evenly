// src/pages/EventDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, TextField } from '@mui/material';
import { useAuth } from '../../AuthContext'; // Import your authentication context

export const EventDetails = () => {
    const { eventId } = useParams(); // Get the event ID from the route parameters
    const [tickets, setTickets] = useState(1);
    const [message, setMessage] = useState('');
    const { user, token } = useAuth(); // Get the user and token from AuthContext

    useEffect(() => {
        if (!user) {
            setMessage('Please log in to book an event.');
        }
    }, [user]);

    const handleBooking = () => {
        if (!user) {
            setMessage('User not authenticated. Please log in.');
            return;
        }

        axios.post(
            `http://localhost:4000/book/book-ticket/${eventId}`,
            { tickets }, // Ticket quantity from state
            { headers: { Authorization: `Bearer ${token}` } } // Include token in the request headers
        )
        .then((res) => setMessage('Booking successful!'))
        .catch((err) => setMessage(`Booking failed: ${err.response?.data?.message || err.message}`));
    };

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
            <Button variant="contained" color="primary" onClick={handleBooking} disabled={!user}>
                Book Now
            </Button>
            {message && <Typography variant="body1" color="error">{message}</Typography>}
        </Box>
    );
};

export default EventDetails;
