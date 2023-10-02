import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './../AuthContext';
import './LoginComponent.css';




function LoginComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();


    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/login', { username, password });
            if (response.data) {
                setIsAuthenticated(true);  // Set the authentication state
                navigate('/dashboard');
            } else {
                alert('Invalid username or password');
            }
        } catch (error) {
            console.error('Login error', error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Sakila Staff Login</h1>
                <div className="input-group">
                    <svg className="icon"><use xlinkHref="#user" /></svg>
                    <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
                </div>
                <div className="input-group">
                    <svg className="icon"><use xlinkHref="#lock" /></svg>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                </div>
                <button onClick={handleLogin}>Login</button>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="icons">
                <symbol id="user" viewBox="0 0 1792 1792">
                    <path d="M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53 3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48 108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5 783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z"/>
                </symbol>
                <symbol id="lock" viewBox="0 0 1792 1792">
                    <path d="M1600 768v576q0 40-28 68t-68 28H416q-40 0-68-28t-28-68V864q0-40 28-68t68-28h32V576q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z"/>
                </symbol>
            </svg>
        </div>
    );
}

export default LoginComponent;
