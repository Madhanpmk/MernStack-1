import React from 'react';
import styles from './About.module.css'; // CSS module for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faContactBook, faExclamation, faHandsHelping } from '@fortawesome/free-solid-svg-icons';

function About(){
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

      {/* About Us Content */}
      <div className={styles.aboutContainer}>
        <h1 className={styles.title}>About Us</h1>
        <div className={styles.content}>
          <p>
            Welcome to <strong>Office Infrastructure Management</strong>, your one-stop solution for managing office assets efficiently. Our platform is designed to help administrators and teams keep track of office equipment, streamline operations, and ensure a productive work environment.
          </p>
          <p>
            We provide tools to monitor products like PCs, ACs, fans, and lights, with features to add, update, and remove items seamlessly. Our goal is to simplify infrastructure management so you can focus on what matters most—your business.
          </p>
          <h2>Our Mission</h2>
          <p>
            To empower organizations with intuitive, reliable, and scalable solutions for office infrastructure management, ensuring optimal resource utilization and operational excellence.
          </p>
          <h2>Why Choose Us?</h2>
          <ul className={styles.features}>
            <li>User-friendly dashboard for real-time insights</li>
            <li>Flexible tools to manage office assets</li>
            <li>Secure and reliable data handling</li>
            <li>Dedicated support for all your needs</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default About;