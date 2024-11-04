import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Grid, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:4000/home/view')
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, []);

    // const handleLogin = () => {
    //     navigate('/login');
    // };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="20vh">
            {/* <Button variant="contained" color="primary" onClick={handleLogin}>
                Login
            </Button> */}
            
            <Grid container spacing={2} justifyContent="center" sx={{ padding: '20px', marginTop: '20px' }}>
                {data.map((row) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={row._id}>
                        <Card 
                            sx={{ 
                                width: '100%',
                                height: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                transition: 'transform 0.3s ease-in-out',
                                '&:hover': { 
                                    transform: 'scale(1.05)' 
                                }
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="120"
                                image={row.media.images[0]}
                                alt={row.organizer.name}
                            />
                            <CardContent sx={{ padding: '16px', flex: '1 0 auto' }}>
                                <Typography gutterBottom variant="h6" component="div">
                                    <strong>Event Name:</strong> {row.eventName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Date:</strong> {new Date(row.date.startDate).toLocaleDateString()} - {new Date(row.date.endDate).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Time:</strong> {`${row.time.startTime} - ${row.time.endTime} ${row.time.timezone}`}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ marginTop: '8px' }}>
                                    <strong>Location:</strong> {`${row.location.venue}, ${row.location.city}`}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ marginTop: '8px' }}>
                                    <strong>Organizer:</strong> {row.organizer.name}
                                </Typography>
                            </CardContent>
                            <Button variant="contained" color="primary" sx={{ margin: '16px', flexShrink: 0 }}>
                                View Details
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
