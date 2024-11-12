// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import Slider from 'react-slick';
import { EventCard } from './EventCard';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Home.css'; // Import CSS for styling
import './Programs/Testimonial';
import Testimonial from './Programs/Testimonial';

export const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/home/view')
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } }
        ]
    };

    return (
        <>
        <Box className="carousel-container">
            <Slider {...settings} style={{ width: '100%' }}>
                {data.map((event) => (
                    <EventCard key={event._id} event={event} />
                ))}
            </Slider>
        </Box>
        <Testimonial />
        </>

    );
};
