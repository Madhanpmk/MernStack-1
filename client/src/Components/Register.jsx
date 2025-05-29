import React, { useState, useEffect } from 'react';
import styles from './Register.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faContactBook, faExchange, faExclamation, faHandsHelping, faHouse, faSearch, faTools, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'; // Required to register components for Chart.js

function Register() {
  const [isNestedVisible, setIsNestedVisible] = useState(false);
  const [user, setUser] = useState([]);
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    const fetchDisplayDetails = async () => {
      try {
        const response = await fetch("http://localhost:3001/fetch");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setDisplay(data);
      } catch (error) {
        console.error("Error fetching Register details:", error);
      }
    };
    fetchDisplayDetails();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:3001/log");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching Register details:", error);
      }
    };
    fetchUserDetails();
  }, []);

  const toggleNestedSidebar = () => setIsNestedVisible(!isNestedVisible);

  // Data for Pie Chart
  const pieChartData = {
    labels: ['Total Products', 'Total Logins'],
    datasets: [
      {
        data: [display.length, user.length],
        backgroundColor: ['#ff1900', '#2ecc71'], // Color for the chart
        hoverOffset: 4
      }
    ]
  };

  return (
    <div className={styles.container}>
      {/* Navbar Section */}
      <div className={styles.navbar}>
        <h2>Office Infrastructure Management</h2>
        <div className={styles.navLinks}>
          <a href="/displaydata"><FontAwesomeIcon icon={faSearch} /> Find Product</a>
          <a href="/about"><FontAwesomeIcon icon={faExclamation} /> About Us</a>
          <a href="/Contact"><FontAwesomeIcon icon={faContactBook} /> Contact</a>
          {/* <a href="/help"><FontAwesomeIcon icon={faHandsHelping} /> Help</a> */}
          <img src='https://cdn1.iconfinder.com/data/icons/users-vol-2/32/user-man-enter-login-signup-512.png' className={styles.image1} onClick={() => window.location.href = '/'} ></img>
        </div>
      </div>

      {/* Sidebar Section */}
      <div className={styles.contain}>
        <div className={styles.sidebar}>
          <a href="#"><FontAwesomeIcon icon={faHouse} /> Home</a>
          {/* <a href="#"><FontAwesomeIcon icon={faTools} /> Settings</a> */}
          <a href="#" onClick={toggleNestedSidebar}><FontAwesomeIcon icon={faHandsHelping} /> Services</a>
          {isNestedVisible && (
            <div className={styles.nested}>
              <a href="/insert"><FontAwesomeIcon icon={faAdd} /> Add Product</a>
              <a href="/delete"><FontAwesomeIcon icon={faTrash} /> Remove Product</a>
              <a href="/update"><FontAwesomeIcon icon={faExchange} /> Make Changes</a>
              
            </div>
          )}
        </div>

        {/* Main Content Section */}
        <div className={styles.maincontent}>
          <div className={styles.head}><h1>Welcome Dashboard Admin !</h1></div>

          {/* Total Products and Logins */}
          <div className={styles.admin}>
            <div className={styles.admin1}>
              <br />
              <img src="https://icon-library.com/images/pc-icon-png/pc-icon-png-2.jpg" className={styles.pc} alt="PC Icon" />
              <h2>Total Products</h2>
              <p>{display ? display.length : 0}</p>
            </div>
            <div className={styles.admin2}><br />
              <img src="https://icon-library.com/images/login-icon-images/login-icon-images-0.jpg" className={styles.pc} alt="User Icon" />
              <h2>Total Logins</h2>
              <p>{user ? user.length : 0}</p>
            </div>
          </div>

          {/* Pie Chart */}
          <br /><br />
          <div className={styles.chartContainer}>
           
            <Pie data={pieChartData} />
            <h2>Product vs Logins</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
