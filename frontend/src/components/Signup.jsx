import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Box, Typography, Alert, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Signup = ({ handleCloseSignup, handleOpenLogin }) => { // Receive the functions as props
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        confirmPassword
      });
      console.log("signup response ",response)
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      handleOpenLogin();  // Redirect to login page after successful signup
      handleCloseSignup();
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Something went wrong');
      } else if (error.request) {
        setErrorMessage('No response from the server. Please check your connection.');
      } else {
        setErrorMessage(error.message || 'An error occurred. Please try again.');
      }
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 480,
        margin: '0 auto',
        padding: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Typography variant="h6" align="center" color="primary" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Create Account
        </Typography>

        {successMessage && <Alert severity="success" sx={{ marginBottom: 2 }}>{successMessage}</Alert>}
        {errorMessage && <Alert severity="error" sx={{ marginBottom: 2 }}>{errorMessage}</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>

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
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  fontWeight: 'bold',
                  backgroundColor: '#1976d2',
                  '&:hover': { backgroundColor: '#115293' },
                }}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>

        <Typography variant="body2" color="textSecondary" align="center">
          Already have an account?{' '}
          <Button
            variant="text"
            color="primary"
            onClick={() => {
              handleCloseSignup(); // Close the signup modal
              handleOpenLogin(); // Open the login modal
            }}
          >
            Log In
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default Signup;
