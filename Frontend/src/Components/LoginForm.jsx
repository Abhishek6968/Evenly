// LoginForm.js
import React, { useState } from 'react';
import { TextField, Button, MenuItem, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const LoginForm = () => {
    const [formData, setFormData] = useState({ userName: '', password: '', userType: 'user' });
    const navigate = useNavigate();
    const { setUserType } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:4000/user/view');
            const existingUser = response.data.find(
                (user) => user.userName === formData.userName && user.userType === formData.userType
            );

            if (existingUser) {
                setUserType(existingUser.userType); // Set user type in context
                window.alert('Login successful');
                if (existingUser.userType === 'admin') {
                    navigate('/admin');
                } else if (existingUser.userType === 'organizer') {
                    navigate('/organizer');
                } else {
                    navigate('/user');
                }
            } else {
                window.alert('Invalid Credentials');
            }
        } catch (error) {
            console.error('Error during user check', error);
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f0f2f5">
            <Paper elevation={3} style={{ padding: '20px', width: '350px' }}>
                <Typography variant="h5" component="h1" align="center" gutterBottom>Login</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField label="Username" name="userName" value={formData.userName} onChange={handleChange} fullWidth required margin="normal" />
                    <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth required margin="normal" />
                    <TextField select label="User Type" name="userType" value={formData.userType} onChange={handleChange} fullWidth required margin="normal">
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="organizer">Organizer</MenuItem>
                    </TextField>
                    <Button variant="contained" color="primary" type="submit" fullWidth style={{ marginTop: '16px' }}>Login</Button>
                </form>
            </Paper>
        </Box>
    );
};

export default LoginForm;
