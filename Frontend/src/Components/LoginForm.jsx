// LoginForm.js
import React, { useState } from 'react';
import { TextField, Button, MenuItem, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const LoginForm = () => {
    const [formData, setFormData] = useState({ userName: '', password: '', userType: 'user' });
    const [error, setError] = useState(''); // Track login errors
    const navigate = useNavigate();
    const { setUserType, setUser, setToken } = useAuth(); // Ensure all functions are accessible from context

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state before attempting login
        try {
            const response = await axios.post('http://localhost:4000/user/login', formData);
            const { token, user } = response.data;

            // Update context and localStorage
            setUserType(user.userType);
            setUser(user);
            setToken(token);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            window.alert('Login successful');
            navigate(`/${user.userType}`);
        } catch (error) {
            console.error('Login error:', error);
            setError('Invalid credentials. Please try again.'); // Display a friendly error message
        }
    };

    const signup = () => {
        navigate('/register');
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f0f2f5">
            <Paper elevation={3} style={{ padding: '20px', width: '350px' }}>
                <Typography variant="h5" component="h1" align="center" gutterBottom>Login</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        select
                        label="User Type"
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="organizer">Organizer</MenuItem>
                    </TextField>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        style={{ marginTop: '16px' }}
                    >
                        Login
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={signup}
                        fullWidth
                        style={{ marginTop: '16px' }}
                    >
                        Create an Account
                    </Button>
                    {error && <Typography color="error" align="center" style={{ marginTop: '16px' }}>{error}</Typography>}
                </form>
            </Paper>
        </Box>
    );
};

export default LoginForm;
