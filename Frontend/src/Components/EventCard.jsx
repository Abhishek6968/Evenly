import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import './EventCard.css'; // Import custom CSS if needed

export const EventCard = ({ event }) => {
    const navigate = useNavigate();

    const handleViewDetails = (eventId) => {
        navigate(`/event/${eventId}`);
    };

    return (
        <Box px={2}>
            <Card className="carousel-card">
                <CardMedia
                    component="img"
                    className="carousel-card-media"
                    image={event.media?.images?.[0] || 'default_image_url.jpg'}
                    alt={event.eventName}
                />
                <CardContent>
                    <Typography variant="h6" component="div">
                        <strong>Event Name:</strong> {event.eventName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Time:</strong> {event.time}
                    </Typography>
                    {event.format === 'Offline' && (
                        <Typography variant="body2" color="text.secondary">
                            <strong>Location:</strong> {event.location ? `${event.location.venue}, ${event.location.city}` : 'Location not available'}
                        </Typography>
                    )}
                    {event.format === 'Online' && (
                        <Typography variant="body2" color="text.secondary">
                            <strong>Virtual Link:</strong>
                            {event.location?.virtualLink ? (
                                <a href={event.location.virtualLink} target="_blank" rel="noopener noreferrer">
                                    {event.location.virtualLink}
                                </a>
                            ) : (
                                "NA"
                            )}
                        </Typography>
                    )}
                </CardContent>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleViewDetails(event._id)}
                >
                    Buy Now
                </Button>
            </Card>
        </Box>
    );
};
