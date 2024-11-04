import React from 'react';

const Footer = () => {
  return (
    <div style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.section}>
          <h4 style={styles.heading}>Quick Links</h4>
          <ul style={styles.linkList}>
            <li style={styles.linkItem}><a style={styles.link} href="#home">Home</a></li>
            <li style={styles.linkItem}><a style={styles.link} href="#about">About Us</a></li>
            <li style={styles.linkItem}><a style={styles.link} href="#services">Services</a></li>
            <li style={styles.linkItem}><a style={styles.link} href="#contact">Contact</a></li>
          </ul>
        </div>

        <div style={styles.section}>
          <h4 style={styles.heading}>Follow Us</h4>
          <div style={styles.socialIcons}>
            <a href="https://facebook.com" style={styles.icon}>F</a>
            <a href="https://twitter.com" style={styles.icon}>T</a>
            <a href="https://instagram.com" style={styles.icon}>I</a>
            <a href="https://linkedin.com" style={styles.icon}>L</a>
          </div>
        </div>

        <div style={styles.section}>
          <h4 style={styles.heading}>Contact Us</h4>
          <p style={styles.contactInfo}>Email: info@example.com</p>
          <p style={styles.contactInfo}>Phone: +1 234 567 890</p>
        </div>
      </div>

      <div style={styles.bottom}>
        <p style={styles.bottomText}>© 2024 Your Company Name. All Rights Reserved.</p>
      </div>
    </div>
  );
};

const styles = {
  footer: {
    backgroundColor: '#04092C',
    color: 'white',
    padding: '20px 0',
    fontFamily: 'Poppins, sans-serif',
    width: '100%', // Ensure full width
    position: 'relative', // Position relative for potential absolute children
    left: 0, // Align left
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    maxWidth: '1200px', // You can adjust or remove this for full responsiveness
    margin: '0 auto',
    padding: '0 20px', // Add some padding to the container for small screens
  },
  section: {
    flex: '1 1 200px',
    margin: '10px 0',
  },
  heading: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  linkList: {
    listStyleType: 'none',
    padding: 0,
  },
  linkItem: {
    margin: '5px 0',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.3s',
  },
  socialIcons: {
    display: 'flex',
    gap: '10px',
  },
  icon: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '20px',
    border: '1px solid white',
    borderRadius: '50%',
    padding: '10px',
    textAlign: 'center',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.3s',
  },
  contactInfo: {
    fontSize: '14px',
    margin: '5px 0',
  },
  bottom: {
    textAlign: 'center',
    marginTop: '20px',
    borderTop: '1px solid #ffffff',
    paddingTop: '10px',
  },
  bottomText: {
    fontSize: '14px',
  },
};

export default Footer;
