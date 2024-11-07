import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import axios from 'axios';
import { InputLabel, Select, MenuItem } from '@mui/material';
import './EventForm.css';

const EventForm = () => {
    const [formData, setFormData] = useState({
        eventName: '',
        description: '',
        category: '',
        format: '',
        date: '',
        time: '',
        location: {
            venue: '',
            city: '',
            address: '',
            virtualLink: ''
        },
        organizer: {
            name: '',
            contact: {
                email: '',
                phone: ''
            }
        },
        ticketing: {
            price: 0,
            capacity: 0
        },
        media: {
            images: []
        },
        terms: {
            cancellationPolicy: '',
            safetyGuidelines: ''
        },
        status: 'pending',
        submittedBy: 'organizer'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Nested update handler for form fields like location and organizer.contact
        const updateNestedField = (path, value) => {
            const keys = path.split('.');
            setFormData((prevData) => {
                let updatedData = { ...prevData };
                let nested = updatedData;
                for (let i = 0; i < keys.length - 1; i++) {
                    nested = nested[keys[i]];
                }
                nested[keys[keys.length - 1]] = value;
                return updatedData;
            });
        };

        if (name.includes('.')) {
            updateNestedField(name, value);
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/home/post/', formData);
            alert('Event submitted for admin approval');
        } catch (error) {
            console.error('Error details:', error.response?.data || error.message);
            alert(`Error: ${error.response?.data?.message || 'Invalid data'}`);
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f0f2f5">
            <Paper elevation={3} style={{ padding: '20px', width: '400px' }}>
                <Typography variant="h5" component="h1" align="center" gutterBottom>
                    Submit Event for Approval
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField label="Event Name" name="eventName" value={formData.eventName} onChange={handleChange} fullWidth required margin="normal" />
                    <TextField label="Description" name="description" value={formData.description} onChange={handleChange} fullWidth required margin="normal" multiline rows={3} />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            fullWidth
                        >
                            {['Workshop', 'Conference', 'Concert', 'Sports', 'Exhibition', 'Other'].map((cat) => (
                                <MenuItem key={cat} value={cat}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl component="fieldset" margin="normal" fullWidth>
                        <Typography variant="subtitle1">Format</Typography>
                        <RadioGroup name="format" value={formData.format} onChange={handleChange} row>
                            <FormControlLabel value="Online" control={<Radio />} label="Online" />
                            <FormControlLabel value="Offline" control={<Radio />} label="Offline" />
                        </RadioGroup>
                    </FormControl>
                    <TextField label="Date" name="date" type="date" value={formData.date} onChange={handleChange} fullWidth required margin="normal" InputLabelProps={{ shrink: true }} />
                    <TextField label="Time" name="time" type="time" value={formData.time} onChange={handleChange} fullWidth required margin="normal" InputLabelProps={{ shrink: true }} />

                    {formData.format === 'Offline' && (
                        <>
                            <TextField label="Venue" name="location.venue" value={formData.location.venue} onChange={handleChange} fullWidth required margin="normal" />
                            <TextField label="City" name="location.city" value={formData.location.city} onChange={handleChange} fullWidth required margin="normal" />
                            <TextField label="Address" name="location.address" value={formData.location.address} onChange={handleChange} fullWidth required margin="normal" />
                        </>
                    )}
                    {formData.format === 'Online' && (
                        <TextField label="Virtual Link" name="location.virtualLink" value={formData.location.virtualLink} onChange={handleChange} fullWidth required margin="normal" />
                    )}
                    <TextField label="Organizer Name" name="organizer.name" value={formData.organizer.name} onChange={handleChange} fullWidth required margin="normal" />
                    <TextField label="Organizer Email" name="organizer.contact.email" type="email" value={formData.organizer.contact.email} onChange={handleChange} fullWidth required margin="normal" />
                    <TextField label="Organizer Phone" name="organizer.contact.phone" value={formData.organizer.contact.phone} onChange={handleChange} fullWidth required margin="normal" />
                    <TextField label="Ticket Price" name="ticketing.price" type="number" value={formData.ticketing.price} onChange={handleChange} fullWidth required margin="normal" />
                    <TextField label="Capacity" name="ticketing.capacity" type="number" value={formData.ticketing.capacity} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Media Images" name="media.images" value={formData.media.images} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Cancellation Policy" name="terms.cancellationPolicy" value={formData.terms.cancellationPolicy} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Safety Guidelines" name="terms.safetyGuidelines" value={formData.terms.safetyGuidelines} onChange={handleChange} fullWidth margin="normal" />
                    
                    <Button variant="contained" color="primary" type="submit" fullWidth style={{ marginTop: '16px' }}>
                        Submit for Approval
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default EventForm;
