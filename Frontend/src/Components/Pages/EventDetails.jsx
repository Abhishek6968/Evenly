// src/pages/EventDetails.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, TextField } from '@mui/material';

export const EventDetails = () => {
    const { eventId } = useParams();
    const [userId, setUserId] = useState('');
    const [tickets, setTickets] = useState(1);
    const [message, setMessage] = useState('');

    const handleBooking = () => {
        axios.post(`http://localhost:4000/book/book-ticket/${eventId}`, { userId, tickets })
            .then((res) => setMessage('Booking successful!'))
            .catch((err) => setMessage(`Booking failed: ${err.response.data.error || err.message}`));
    };

    return (
        <Box>
            <Typography variant="h4">Book Your Event</Typography>
            <TextField
                label="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Number of Tickets"
                type="number"
                value={tickets}
                onChange={(e) => setTickets(Number(e.target.value))}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleBooking}>
                Book Now
            </Button>
            {message && <Typography variant="body1">{message}</Typography>}
        </Box>
    );
};
