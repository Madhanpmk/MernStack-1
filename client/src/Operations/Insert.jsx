import React, { useState } from 'react';
import axios from 'axios';
import styles from './Insert.module.css';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faBackward, faContactBook, faExchange, faExchangeAlt, faExclamation, faHandsHelping, faHouse, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
const Insert = () => {
  const [formData, setFormData] = useState({
    modelno: '',
    type: '',
    status: '',
    roomno: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { modelno, type, status, roomno } = formData;

    // Client-side conditional logic
    if (modelno && type && status && roomno) {
      try {
        const dataWithDate = {
          ...formData,
          date: new Date().toISOString(), // Automatically adds the current date and time
        };
        await axios.post('http://localhost:3001/addData', formData);
       
        
        Swal.fire({
          title: 'Success!',
          text: 'Data inserted successfully',
          icon: 'success',
          confirmButtonText: 'OK',
          color: 'black',
        });
        // Clear the input fields after successful submission
        setFormData({
          modelno: '',
          type: '',
          status: '',
          roomno: '',
          
        });
      } catch (error) {
        Swal.fire({
          title: 'Warning!',
          text: 'All fields are required',
          icon: 'warning',
          confirmButtonText: 'OK',
        });
      }
    } else {
      Swal.fire({
        title: 'Warning!',
        text: 'All fields are required',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
     
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


      <div className={styles.formcontainer}>
      
        <form onSubmit={handleSubmit} className={styles.form}>
       
          <center><h1 className={styles.h1}>Services</h1></center><br />
          <input className={styles.input_ins} name="modelno" value={formData.modelno} placeholder="Model No" onChange={handleChange} />
          <select 
            className={styles.input_ins} 
            name="type" 
            value={formData.type} 
            onChange={handleChange} 
            required
          >
            <option value="">Select Type</option> {/* Default placeholder */}
            <option value="AC">AC</option>
            <option value="PC">PC</option>
            <option value="FAN">FAN</option>
          </select>
          <input className={styles.input_ins} name="status" value={formData.status} placeholder="Status" onChange={handleChange} />
          <input className={styles.input_ins} name="roomno" value={formData.roomno} placeholder="Room No" onChange={handleChange} />
          <center> <button className={styles.but} type="submit">Submit</button></center>
          
        </form>
      </div>
    </>
  );
};

export default Insert;
