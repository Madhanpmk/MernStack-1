import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faContactBook, faExclamation, faHandsHelping } from '@fortawesome/free-solid-svg-icons';
import styles from './Delete.module.css';
import Swal from 'sweetalert2';

const Delete = () => {
  const [modelno, setModelNo] = useState('');

  const handleChange = (e) => {
    setModelNo(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!modelno) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Model number is required to delete a record!'
      });
      return;
    }

    try {
      const response = await axios.delete('http://localhost:3001/deleteData', { data: { modelno } });
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: response.data,
      });
      setModelNo(''); // Clear the input field after successful deletion
    } catch (error) {
      if (error.response?.status === 404) {
        Swal.fire({
          icon: 'error',
          title: 'Not Found!',
          text: 'Model number not found. Please provide a valid model number.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Error deleting data: ' + error.message,
        });
      }
    }
  };

  return (
    <>
      {/* Navbar Section */}
      <div className={styles.navbar}>
        <h2>Office Infrastructure Management</h2>
        <div className={styles.navLinks}>
          <a href="/register"><FontAwesomeIcon icon={faBackward} /> Back</a>
          {/* <a href="#"><FontAwesomeIcon icon={faExclamation} /> About Us</a>
          <a href="/"><FontAwesomeIcon icon={faContactBook} /> Contact</a>
          <a href="/help"><FontAwesomeIcon icon={faHandsHelping} /> Help</a> */}
          <img 
            src='https://cdn1.iconfinder.com/data/icons/users-vol-2/32/user-man-enter-login-signup-512.png' 
            className={styles.image1} 
            onClick={() => window.location.href = '/'} 
            alt="User Profile"
          />
        </div>
      </div>
      
      {/* Form Section */}
      <div className={styles.formcontainer}>
        <form onSubmit={handleDelete} className={styles.form}>
          <center><h1 className={styles.h1}>Delete Service</h1></center>
          <br />
          <input
            className={styles.input_ins}
            name="modelno"
            placeholder="Model No"
            value={modelno}
            onChange={handleChange}
          />
          <br />
          <center><button className={styles.but} type="submit">Delete</button></center>
        </form>
      </div>
    </>
  );
};

export default Delete;
