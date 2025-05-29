import React, { useState } from 'react';
import axios from 'axios';
import styles from './DisplayData.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faBackward, faContactBook, faExchange, faExchangeAlt, faExclamation, faHandsHelping, faHouse, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';

const DisplayData = () => {
  const [data, setData] = useState([]);
  const [typeCounts, setTypeCounts] = useState({});
  const [roomno, setRoomno] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3001/getDataByRoom', {
        params: { roomno }
      });
      if (response.data.data.length === 0) {
        setErrorMessage('No records found for the entered Room No');
      } else {
        const formattedData = response.data.data.map(item => ({
          ...item,
          dateAdded: new Date(item.dateAdded).toLocaleDateString()
        }));
        setData(formattedData);
        setTypeCounts(response.data.typeCounts);
        setErrorMessage('');
      }
    } catch (error) {
      alert('Error fetching data: ' + error.message);
    }
  };

  return (
    <>    
     <div className={styles.navbar}>
            <h2 >Office Infrastructure Management</h2>
            <div className={styles.navLinks}>
              <a href="/register"><FontAwesomeIcon icon={faBackward} /> Back</a>
              {/* <a href="#"><FontAwesomeIcon icon={faExclamation} /> About Us</a>
              <a href="/"><FontAwesomeIcon icon={faContactBook}/> Contact</a>
              <a href="/help"><FontAwesomeIcon icon={faHandsHelping} /> Help</a> */}
              <img src='https://cdn1.iconfinder.com/data/icons/users-vol-2/32/user-man-enter-login-signup-512.png' className={styles.image1} onClick={() => window.location.href = '/'} ></img>
    
            </div>
          </div>
    <div className={styles.dataContainer}>
    
      <h1 className={styles.h1}>Data Display</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter Room No"
          value={roomno}
          onChange={(e) => setRoomno(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>Search</button>
      </form>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      {data.length > 0 && (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Type</th>
                <th>Status</th>
               
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.type}</td>
                  <td>{item.status}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.typeCounts}>
            <h2>Total Counts by Type</h2>
            <ul>
              {Object.entries(typeCounts).map(([type, count]) => (
                <li key={type}>{type}: {count}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    
    </div>
    </>

  );
};

export default DisplayData;
