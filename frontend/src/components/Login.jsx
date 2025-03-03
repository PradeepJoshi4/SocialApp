import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Box, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = ({ handleCloseLogin, handleOpenSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });

            console.log("login data",response);

            const { token } = response.data;
            const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
            console.log(decodedToken);

            const userName = decodedToken.name; // Extract name from the decoded token
            const userRole = decodedToken.role; // Extract role from the decoded token

            // Store token, name, and role in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('userName', userName); // Store the name
            localStorage.setItem('userRole', userRole); // Store the role

            // Use navigate to redirect
            if (userRole === 'admin') {
                navigate("/admin-dashboard"); // Redirect to admin dashboard
                handleCloseLogin();
            } else {
                navigate("/dashboard"); // Redirect to normal dashboard
                handleCloseLogin();

            }

        } catch (error) {
            setErrorMessage(error.response ? error.response.data.message : 'Something went wrong');
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 480, margin: '0 auto', padding: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '100%' }}>
                <Typography variant="h6" align="center" color="primary" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                    Log In
                </Typography>

                {errorMessage && <Alert severity="error" sx={{ marginBottom: 2 }}>{errorMessage}</Alert>}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                type="submit"
                                sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#115293' } }}
                            >
                                Log In
                            </Button>
                        </Grid>
                    </Grid>
                </form>

                <Typography variant="body2" color="textSecondary" align="center" sx={{ marginTop: 2 }}>
                    Don't have an account?{' '}
                    <Button
                        variant="text"
                        color="primary"
                        onClick={() => {
                            handleCloseLogin();
                            handleOpenSignup();
                        }}
                    >
                        Sign Up
                    </Button>
                </Typography>
            </Box>
        </Box>
    );
};

export default Login;
