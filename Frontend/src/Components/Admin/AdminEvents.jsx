import React, { useEffect, useState } from 'react';
import { Typography, Paper, Button, Box } from '@mui/material';
import axios from 'axios';
import './AdminEvent.css';

const AdminEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:4000/admin/getAllEvents');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const approveEvent = async (id) => {
        try {
            await axios.put(`http://localhost:4000/admin/approveEvent/${id}`);
            alert('Event approved successfully');
            fetchEvents();
        } catch (error) {
            console.error('Error approving event:', error);
            alert('Error approving event');
        }
    };

    const deleteEvent = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/admin/deleteEvent/${id}`);
            alert('Event deleted successfully');
            fetchEvents();
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('Error deleting event');
        }
    };

    const revokeEvent = async (id) => {
        try {
            await axios.put(`http://localhost:4000/admin/revokeEvent/${id}`);
            alert('Event revoked successfully');
            fetchEvents();
        } catch (error) {
            console.error('Error revoking event:', error);
            alert('Error revoking event');
        }
    };

    return (
        <Box p={3}>
        <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5" align="center" gutterBottom>
                Admin Event Management
            </Typography>
            {events.map((event) => (
                <Box key={event._id} mb={3} p={2} className="event-box">
                    <Typography variant="h6">{event.eventName}</Typography>
                    <Box display="flex" className="event-columns">
                        <Box className="leftColumn">
                            <Typography className="description">Description: {event.description}</Typography>
                            <Typography>Category: {event.category}</Typography>
                            <Typography>Format: {event.format}</Typography>
                            <Typography>Date: {new Date(event.date).toLocaleDateString()}</Typography>
                            <Typography>Time: {event.time}</Typography>
                            <Typography>Ticket Price: ${event.ticketing.price}</Typography>
                            <Typography>Capacity: {event.ticketing.capacity}</Typography>
                        </Box>
                        <Box className="rightColumn">
                            {event.format === 'Offline' ? (
                                <>
                                    <Typography>Venue: {event.location.venue}</Typography>
                                    <Typography>City: {event.location.city}</Typography>
                                    <Typography>Address: {event.location.address}</Typography>
                                </>
                            ) : (
                                <Typography>Virtual Link: {event.location.virtualLink}</Typography>
                            )}
                            <Typography>Organizer Name: {event.organizer?.name}</Typography>
                            <Typography>Organizer Email: {event.organizer?.contact?.email}</Typography>
                            <Typography>Organizer Phone: {event.organizer?.contact?.phone}</Typography>
                            <Typography>Cancellation Policy: {event.terms.cancellationPolicy}</Typography>
                            <Typography>Safety Guidelines: {event.terms.safetyGuidelines}</Typography>
                            <Typography>Status: {event.status}</Typography>
                        </Box>
                    </Box>
                    <Box mt={2} display="flex" gap={2}>
                        <Button variant="contained" color="primary" onClick={() => approveEvent(event._id)}>
                            Approve
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => revokeEvent(event._id)}>
                            Revoke
                        </Button>
                        <Button variant="contained" color="error" onClick={() => deleteEvent(event._id)}>
                            Delete
                        </Button>
                    </Box>
                </Box>
            ))}
        </Paper>
    </Box>
    );
};

export default AdminEvents;
