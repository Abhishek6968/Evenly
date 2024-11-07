import React from 'react';
import './Hero.css';
import darkArrow from '../../assets/dark-arrow.png'

export const Hero = () => {
  return (
    <div className="hero container">
    <div className="hero-text">
        <h1>Welcome to Evenly</h1>
        <p>Discover and book the best events happening in your city. Whether it's concerts, workshops, or festivals, find it all on Evenly. Organize or attend with ease!</p>
        <button className="btn">Explore More<img src={darkArrow} /></button>
    </div>
    </div>
  );
};
