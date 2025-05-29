import React, { useState } from 'react';
import axios from 'axios';
import styles from './Update.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faBackward, faContactBook, faExchange, faExclamation, faHandsHelping, faHouse, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'; // Import SweetAlert2

const Update = () => {
  const [formData, setFormData] = useState({
    modelno: '',
    type: '',
    status: '',
    roomno: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { modelno, type, status, roomno } = formData;

    if (modelno) {
      // Create an object with only the provided fields
      const updateData = {};
      if (type) updateData.type = type;
      if (status) updateData.status = status;
      if (roomno) updateData.roomno = roomno;

      try {
        await axios.put('http://localhost:3001/updateData', { modelno, ...updateData });
        // Success alert with SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Data updated successfully',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
        });
      } catch (error) {
        // Error alert with SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Error updating data: ${error.message}`,
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#d33',
        });
      }
    } else {
      // Warning alert with SweetAlert2
      Swal.fire({
        icon: 'warning',
        title: 'Missing Field',
        text: 'Model number is required to update a record',
        confirmButtonText: 'OK',
        confirmButtonColor: '#f39c12',
      });
    }
  };

  return (
    <>
      <div className={styles.navbar}>
        <h2>Office Infrastructure Management</h2>
        <div className={styles.navLinks}>
          <a href="/register"><FontAwesomeIcon icon={faBackward} /> Back</a>
          {/* <a href="#"><FontAwesomeIcon icon={faExclamation} /> About Us</a>
          <a href="/"><FontAwesomeIcon icon={faContactBook} /> Contact</a>
          <a href="/help"><FontAwesomeIcon icon={faHandsHelping} /> Help</a> */}
          <img
            src="https://cdn1.iconfinder.com/data/icons/users-vol-2/32/user-man-enter-login-signup-512.png"
            className={styles.image1}
            onClick={() => (window.location.href = '/')}
            alt="Login Icon"
          />
        </div>
      </div>
      <div className={styles.formcontainer}>
        <form onSubmit={handleUpdate} className={styles.form}>
          <center>
            <h1 className={styles.h1}>Modify Service</h1>
          </center>
          <br />
          <input
            className={styles.input_ins}
            name="modelno"
            placeholder="Model No"
            onChange={handleChange}
          />
          <select
            className={styles.input_ins}
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="AC">AC</option>
            <option value="PC">PC</option>
            <option value="FAN">FAN</option>
            <option value="LIGHT">LIGHT</option>
          </select>
          <input
            className={styles.input_ins}
            name="status"
            placeholder="Status"
            onChange={handleChange}
          />
          <input
            className={styles.input_ins}
            name="roomno"
            placeholder="Room No"
            onChange={handleChange}
          />
          <br />
          <center>
            <button className={styles.but} type="submit">
              Change
            </button>
          </center>
        </form>
      </div>
    </>
  );
};

export default Update;