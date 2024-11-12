import React from 'react';
import './Testimonial.css'; // Import the CSS file

const Testimonial = () => {
    const testimonials = [
        {
            name: "John Doe",
            feedback: "Evenly made managing our corporate event a breeze. The platform's intuitive design and responsive team ensured a seamless experience!",
            company: "Tech Solutions Ltd.",
        },
        {
            name: "Jane Smith",
            feedback: "The virtual event guide chatbot was a game-changer! It provided real-time support to our attendees, enhancing their overall experience.",
            company: "Innovate Conference",
        },
        {
            name: "Michael Lee",
            feedback: "Booking and managing our live event with Evenly was straightforward and efficient. The live score updates were a hit with our audience.",
            company: "SportsWorld Inc.",
        }
    ];

    return (
        <div className="testimonial-container">
            <h2>What Our Clients Say</h2>
            <div className="testimonial-grid">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial-card">
                        <p className="feedback">"{testimonial.feedback}"</p>
                        <p className="client-name">- {testimonial.name}, <em>{testimonial.company}</em></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonial;
