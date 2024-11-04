import React, { useState } from 'react';
import { TextField, Button, MenuItem, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        userType: 'user', // default userType
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Check if the user already exists
            const response = await axios.get('http://localhost:4000/user/view');
            const existingUser = response.data.find(
                (user) => user.userName === formData.userName && user.userType === formData.userType
            );

            if (existingUser) {
                window.alert('User already exists');
            } else {
                // Create a new user if not existing
                await axios.post('http://localhost:4000/user/create', formData);
                window.alert('Account created successfully');
                navigate('/'); // Redirect to login page after successful signup
            }
        } catch (error) {
            console.error('Error during user signup', error);
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f0f2f5">
            <Paper elevation={3} style={{ padding: '20px', width: '350px' }}>
                <Typography variant="h5" component="h1" align="center" gutterBottom>
                    Sign Up
                </Typography>
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
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="organizer">Organizer</MenuItem>
                        {/* <MenuItem value="admin">Admin</MenuItem> */}

                    </TextField>
                    <Button variant="contained" color="primary" type="submit" fullWidth style={{ marginTop: '16px' }}>
                        Sign Up
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default SignUp;
