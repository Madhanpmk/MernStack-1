import { useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function Login() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        axios
            .post("http://localhost:3001/login", { email, pass })
            .then((result) => {
                console.log(result);
                if (result.data === "success") {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Login successful!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        navigate("/register");
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Invalid login credentials',
                        icon: 'error',
                        confirmButtonText: 'Try Again'
                    });
                }
            })
            .catch((err) => {
                console.error(err);
                Swal.fire({
                    title: 'Error',
                    text: 'Something went wrong. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:3001/register", { name, email, pass })
            .then((result) => {
                console.log(result);
                if (result.data === "success") {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Registration successful!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Registration failed',
                        icon: 'error',
                        confirmButtonText: 'Try Again'
                    });
                }
            })
            .catch((err) => {
                console.error(err);
                Swal.fire({
                    title: 'Error',
                    text: 'Something went wrong during registration',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    }; 

    return (
        <>
            <div className={styles.container}>
                <div className={styles.main}>
                    <input type="checkbox" id="chk" aria-hidden="true" className={styles.chk} />

                    <div className={styles.signup}>
                        <form onSubmit={handleRegister}>
                            <label htmlFor="chk" aria-hidden="true" className={styles.label}>Sign up</label>
                            <input 
                                type="text" 
                                className={styles.input} 
                                value={name} 
                                placeholder="User name" 
                                required 
                                onChange={(e) => setName(e.target.value)} 
                            />
                            <input 
                                type="email" 
                                className={styles.input} 
                                value={email} 
                                placeholder="Email" 
                                required 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                            <input 
                                type="password" 
                                className={styles.input} 
                                value={pass} 
                                placeholder="Password" 
                                required 
                                onChange={(e) => setPass(e.target.value)} 
                            />
                            <button className={styles.button}>Signup</button>
                        </form>
                    </div>

                    <div className={styles.login}>
                        <form onSubmit={handleLogin}>
                            <label htmlFor="chk" aria-hidden="true" className={styles.label}>Login</label>
                            <input 
                                type="email" 
                                className={styles.input} 
                                value={email}
                                placeholder="Email" 
                                required  
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input 
                                type="password" 
                                className={styles.input} 
                                value={pass} 
                                placeholder="Password" 
                                required  
                                onChange={(e) => setPass(e.target.value)} 
                            />
                            <button className={styles.button}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;