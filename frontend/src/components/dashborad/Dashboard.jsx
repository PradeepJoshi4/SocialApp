// src/components/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import UserNavBar from '../usersection/UserNavBar';
import { Grid } from '@mui/material';
import UserPage from '../usersection/UserPage';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
        const userNameDecoded = decodedToken.name;
        setUserName(userNameDecoded);
        if (!token) {
          window.location.href = '/';  // Redirect to login if no token
          return;
        }

        const response = await axios.get('http://localhost:5000/api/auth/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response);
        setUsers(response.data);  // Set users data in state
      } catch (error) {
        toast(error)
      }
    };

    fetchUsers();
  }, []);

  return (
    <Grid>
      <Grid>
        {/* DrawerAppBar component for Admin Navbar */}
        <Grid item>
          <UserNavBar userName={userName} />
        </Grid>

        <Grid sx={{ marginTop: 10 }}>
          <UserPage users={users} />
        </Grid>


      </Grid>
    </Grid>
  );
};

export default Dashboard;
