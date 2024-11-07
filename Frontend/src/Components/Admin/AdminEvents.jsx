// AdminEvents.jsx
import React, { useEffect, useState } from 'react';
import { Typography, Paper, Button, Box } from '@mui/material';
import axios from 'axios';

const AdminEvents = () => {
    const [events, setEvents] = useState([]);

    // Fetch events on component load
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

    // Approve an event
    const approveEvent = async (id) => {
        try {
            await axios.put(`http://localhost:4000/admin/approveEvent/${id}`);
            alert('Event approved successfully');
            fetchEvents(); // Refresh events list
        } catch (error) {
            console.error('Error approving event:', error);
            alert('Error approving event');
        }
    };

    // Delete an event
    const deleteEvent = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/admin/deleteEvent/${id}`);
            alert('Event deleted successfully');
            fetchEvents(); // Refresh events list
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('Error deleting event');
        }
    };
    const revokeEvent = async(id)=>{
        try{
            axios.put(`http://localhost:4000/admin/revokeEvent/${id}`);
            alert('Event revoked successfully');
            fetchEvents();
        }
        catch(error){
            console.error('Error revoking event:', error);
            alert('Error revoking event');
    }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f0f2f5">
            <Paper elevation={3} style={{ padding: '20px', width: '80%' }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Admin Event Management
                </Typography>
                {events.map((event) => (
                    <Box key={event._id} mb={3} p={2} border="1px solid #ddd" borderRadius="4px">
                        <Typography variant="h6">{event.eventName}</Typography>
                        <Typography>Description: {event.description}</Typography>
                        <Typography>Category: {event.category}</Typography>
                        <Typography>Status: {event.status}</Typography>
                        <Box mt={2} display="flex" gap={2}>
                            <Button variant="contained" color="primary" onClick={() => approveEvent(event._id)}>
                                Approve
                            </Button>
                            <Button variant="contained" color="secondary" onClick={() => revokeEvent(event._id)}>
                                Revoke
                            </Button>
                            <Button variant="contained" color="secondary" onClick={() => deleteEvent(event._id)}>
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
