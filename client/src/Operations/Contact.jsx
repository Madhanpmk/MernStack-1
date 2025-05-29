import React from 'react';
import styles from './Contact.module.css'; // CSS module for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faContactBook, faExclamation, faHandsHelping } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  return (
    <>
      {/* Navbar Section */}
      <div className={styles.navbar}>
        <h2>Office Infrastructure Management</h2>
        <div className={styles.navLinks}>
          <a href="/register"><FontAwesomeIcon icon={faBackward} /> Back</a>
          {/* <a href="/about"><FontAwesomeIcon icon={faExclamation} /> About Us</a>
          <a href="/contact"><FontAwesomeIcon icon={faContactBook} /> Contact</a>
          <a href="/help"><FontAwesomeIcon icon={faHandsHelping} /> Help</a> */}
          <img
            src="https://cdn1.iconfinder.com/data/icons/users-vol-2/32/user-man-enter-login-signup-512.png"
            className={styles.image1}
            onClick={() => (window.location.href = '/')}
            alt="Login Icon"
          />
        </div>
      </div>

      {/* Contact Information Section */}
      <div className={styles.contactContainer}>
        <h1 className={styles.title}>Contact Us</h1>
        <div className={styles.content}>
          <p>
            We're here to assist you with any questions or support you need regarding Office Infrastructure Management. Feel free to reach out to us through the following channels:
          </p>
          <div className={styles.contactDetails}>
            <h2>Get in Touch</h2>
            <p><strong>Email:</strong> madhankumarpmk777@gmail.com</p>
            <p><strong>Phone:</strong> +91 6380763270</p>
            <p><strong>Address:</strong> 1/448, pandiyan nagar, Virudhunagr </p>
            <p><strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM (EST)</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;