import React from 'react';
import './AboutUs.css'; // Import the CSS file

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <div className="about-us-hero">
                <h1 className="hero-heading">Welcome to Our Company</h1>
                <p className="hero-subheading">Redefining Excellence, One Step at a Time</p>
            </div>
            <div className="about-us-content">
                <section>
                    <h2>Our Story</h2>
                    <p>
                        Established over a decade ago, <strong>Our Company</strong> started with a simple idea: to create 
                        meaningful solutions that address real-world challenges. From a modest team of passionate 
                        innovators to a global network of experts, we have stayed true to our roots of innovation and 
                        commitment.
                    </p>
                    <p>
                        Our journey is one of resilience, creativity, and unwavering dedication. We have navigated through 
                        industry changes and technological advancements, embracing new opportunities and building 
                        partnerships that last.
                    </p>
                </section>
                <section>
                    <h2>What Sets Us Apart</h2>
                    <p>
                        At the core of our success lies our ability to adapt and thrive. We don’t just follow trends; we 
                        set them. Here’s what makes us stand out:
                    </p>
                    <ul className="values-list">
                        <li><strong>Innovative Solutions:</strong> Leveraging cutting-edge technology to provide 
                        forward-thinking services.</li>
                        <li><strong>Client First Approach:</strong> We prioritize understanding our clients' unique needs 
                        and tailoring our solutions accordingly.</li>
                        <li><strong>Global Perspective:</strong> With a multicultural team and projects across the globe, 
                        we offer insights that are rich in diversity.</li>
                        <li><strong>Commitment to Excellence:</strong> We uphold the highest standards in every aspect of 
                        our work, ensuring quality and reliability.</li>
                    </ul>
                </section>
                <section>
                    <h2>Our Vision for the Future</h2>
                    <p>
                        As we look to the future, our vision remains focused on innovation, sustainability, and community 
                        impact. We aim to grow responsibly, balancing progress with mindful practices that contribute 
                        positively to the world around us.
                    </p>
                    <p>
                        Whether it's developing eco-friendly technologies or supporting local communities, our goals 
                        align with creating a better tomorrow.
                    </p>
                </section>
                <section>
                    <h2>Meet Our Team</h2>
                    <p>
                        Behind every project is a group of talented individuals who bring diverse experiences and skills 
                        to the table. Our team of engineers, designers, strategists, and managers collaborates seamlessly 
                        to turn visions into reality.
                    </p>
                </section>
                <div className="call-to-action">
                    <button className="cta-button">Explore Our Projects</button>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
