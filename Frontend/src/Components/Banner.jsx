import React from 'react';
import '..'; // Create a CSS file for styles

const Banner = () => {
    return (
        <div className="banner">
            <div className="background" />
            <div className="content">
                <div className="logo">
                    {/* Inner components like shapes can be represented with nested divs */}
                    <div className="logo-shape1"></div>
                    <div className="logo-shape2"></div>
                    {/* Add other elements accordingly */}
                </div>
                <div className="nav-links">
                    <span>Trending</span>
                    <span>Sports</span>
                    <span>Concerts</span>
                    <span>Theater</span>
                </div>
                <div className="buttons">
                    <button className="sign-up">Sign Up</button>
                    <button className="login">Login</button>
                </div>
            </div>
            <div className="search-section">
                <input type="text" placeholder="Search by Event, Artist, Venue..." />
                <input type="text" placeholder="Zip code or State" />
                <input type="date" placeholder="Date" />
                <button className="search-button">Search</button>
            </div>
        </div>
    );
};

export default Banner;
