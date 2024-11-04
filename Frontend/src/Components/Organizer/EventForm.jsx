// EventForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Checkbox, FormControlLabel, MenuItem, Typography } from '@mui/material';

const categories = ['Workshop', 'Conference', 'Concert', 'Sports', 'Exhibition', 'Other'];
const formats = ['Online', 'Offline'];

const EventForm = () => {
    const [eventData, setEventData] = useState({
        eventName: '',
        description: '',
        category: '',
        format: '',
        date: { startDate: '', endDate: '' },
        time: { startTime: '', endTime: '', timezone: 'UTC' },
        location: { venue: '', city: '', address: '', virtualLink: '' },
        organizer: { name: '', contact: { email: '', phone: '', website: '' }, profileImage: '' },
        ticketing: { price: 0, paymentLink: '', capacity: 0 },
        media: { images: [], videoLink: '' },
        terms: { cancellationPolicy: '', safetyGuidelines: '' },
        notifications: { allowNotifications: true }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleNestedChange = (e, section, field) => {
        const { value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [section]: { ...prevData[section], [field]: value }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/events', eventData);
            alert("Event created successfully!");
        } catch (err) {
            console.error("Error creating event:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h4">Create Event</Typography>

            {/* Event Details */}
            <TextField label="Event Name" name="eventName" fullWidth required value={eventData.eventName} onChange={handleChange} />
            <TextField label="Description" name="description" fullWidth multiline rows={4} required value={eventData.description} onChange={handleChange} />
            <TextField label="Category" name="category" select fullWidth required value={eventData.category} onChange={handleChange}>
                {categories.map((cat) => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
            </TextField>
            <TextField label="Format" name="format" select fullWidth required value={eventData.format} onChange={handleChange}>
                {formats.map((fmt) => <MenuItem key={fmt} value={fmt}>{fmt}</MenuItem>)}
            </TextField>

            {/* Date and Time */}
            <Typography variant="h6">Date & Time</Typography>
            <TextField type="date" label="Start Date" fullWidth required value={eventData.date.startDate} onChange={(e) => handleNestedChange(e, 'date', 'startDate')} />
            <TextField type="date" label="End Date" fullWidth required value={eventData.date.endDate} onChange={(e) => handleNestedChange(e, 'date', 'endDate')} />
            <TextField type="time" label="Start Time" fullWidth required value={eventData.time.startTime} onChange={(e) => handleNestedChange(e, 'time', 'startTime')} />
            <TextField type="time" label="End Time" fullWidth required value={eventData.time.endTime} onChange={(e) => handleNestedChange(e, 'time', 'endTime')} />
            <TextField label="Timezone" name="timezone" fullWidth value={eventData.time.timezone} onChange={(e) => handleNestedChange(e, 'time', 'timezone')} />

            {/* Location */}
            <Typography variant="h6">Location</Typography>
            {eventData.format === 'Offline' ? (
                <>
                    <TextField label="Venue" fullWidth required value={eventData.location.venue} onChange={(e) => handleNestedChange(e, 'location', 'venue')} />
                    <TextField label="City" fullWidth required value={eventData.location.city} onChange={(e) => handleNestedChange(e, 'location', 'city')} />
                    <TextField label="Address" fullWidth required value={eventData.location.address} onChange={(e) => handleNestedChange(e, 'location', 'address')} />
                </>
            ) : (
                <TextField label="Virtual Link" fullWidth required value={eventData.location.virtualLink} onChange={(e) => handleNestedChange(e, 'location', 'virtualLink')} />
            )}

            {/* Organizer Details */}
            <Typography variant="h6">Organizer Details</Typography>
            <TextField label="Organizer Name" fullWidth required value={eventData.organizer.name} onChange={(e) => handleNestedChange(e, 'organizer', 'name')} />
            <TextField label="Email" fullWidth required value={eventData.organizer.contact.email} onChange={(e) => handleNestedChange(e, 'organizer.contact', 'email')} />
            <TextField label="Phone" fullWidth required value={eventData.organizer.contact.phone} onChange={(e) => handleNestedChange(e, 'organizer.contact', 'phone')} />
            <TextField label="Website" fullWidth value={eventData.organizer.contact.website} onChange={(e) => handleNestedChange(e, 'organizer.contact', 'website')} />
            <TextField label="Profile Image URL" fullWidth value={eventData.organizer.profileImage} onChange={(e) => handleNestedChange(e, 'organizer', 'profileImage')} />

            {/* Ticketing */}
            <Typography variant="h6">Ticketing</Typography>
            <TextField type="number" label="Price (INR)" fullWidth required value={eventData.ticketing.price} onChange={(e) => handleNestedChange(e, 'ticketing', 'price')} />
            {eventData.ticketing.price > 0 && (
                <TextField label="Payment Link" fullWidth required value={eventData.ticketing.paymentLink} onChange={(e) => handleNestedChange(e, 'ticketing', 'paymentLink')} />
            )}
            <TextField type="number" label="Capacity" fullWidth required value={eventData.ticketing.capacity} onChange={(e) => handleNestedChange(e, 'ticketing', 'capacity')} />

            {/* Media */}
            <Typography variant="h6">Media</Typography>
            <TextField label="Images (Comma separated URLs)" fullWidth value={eventData.media.images} onChange={(e) => handleNestedChange(e, 'media', 'images')} />
            <TextField label="Video Link" fullWidth value={eventData.media.videoLink} onChange={(e) => handleNestedChange(e, 'media', 'videoLink')} />

            {/* Terms */}
            <Typography variant="h6">Terms</Typography>
            <TextField label="Cancellation Policy" fullWidth value={eventData.terms.cancellationPolicy} onChange={(e) => handleNestedChange(e, 'terms', 'cancellationPolicy')} />
            <TextField label="Safety Guidelines" fullWidth value={eventData.terms.safetyGuidelines} onChange={(e) => handleNestedChange(e, 'terms', 'safetyGuidelines')} />

            {/* Notifications */}
            <FormControlLabel
                control={<Checkbox checked={eventData.notifications.allowNotifications} onChange={(e) => handleNestedChange(e, 'notifications', 'allowNotifications')} />}
                label="Allow Notifications"
            />

            <Button type="submit" variant="contained" color="primary">Create Event</Button>
        </form>
    );
};

export default EventForm;
