import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Home.css'; // Import the CSS file

export const Home = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:4000/home/view')
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleViewDetails = (eventId) => {
        navigate(`/event/${eventId}`);
    };

    // Carousel settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Adjust to the desired number of columns per row
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <Box className="carousel-container">
            <Slider {...settings} style={{ width: '100%' }}>
                {data.map((row) => (
                    <Box key={row._id} px={2}>
                        <Card className="carousel-card">
                            <CardMedia
                                component="img"
                                className="carousel-card-media"
                                image={row.media?.images?.[0] || 'default_image_url.jpg'}
                                alt={row.eventName}
                            />
                            <CardContent sx={{ padding: '16px', flex: '1 0 auto' }}>
                                <Typography className="carousel-event-name" variant="h6" component="div">
                                    <strong>Event Name:</strong> {row.eventName}
                                </Typography>
                                <Typography className="carousel-date-time" variant="body2" color="text.secondary">
                                    <strong>Date:</strong> {new Date(row.date).toLocaleDateString()}
                                </Typography>
                                <Typography className="carousel-date-time" variant="body2" color="text.secondary">
                                    <strong>Time:</strong> {row.time}
                                </Typography>
                                {row.format === 'Offline' && (
                                    <Typography className="carousel-location" variant="body2" color="text.secondary">
                                        <strong>Location:</strong> {row.location ? `${row.location.venue}, ${row.location.city}` : 'Location not available'}
                                    </Typography>
                                )}
                                {row.format === 'Online' && (
                                    <Typography className="carousel-virtual-link" variant="body2" color="text.secondary">
                                        <strong>Virtual Link:</strong> 
                                        {row.location?.virtualLink ? (
                                            <a href={row.location.virtualLink} target="_blank" rel="noopener noreferrer">
                                                {row.location.virtualLink}
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
                                className="carousel-button" 
                                onClick={() => handleViewDetails(row._id)}
                            >
                                Buy Now
                            </Button>
                        </Card>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};
