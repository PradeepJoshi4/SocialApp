import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DrawerAppBar from './AdminNavBar';
import { Button, Grid, Typography } from '@mui/material';
import ManageUsers from './ManageUsers';
import CreateTask from './createtask/CreateTask';
import OverviewCards from '.';
import ManageTask from './managetask';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [manageUsers, setManagerUser] = useState(false);
    const [nameOfAdmin, setNameOfAdmin] = useState("");
    const [createTask, setCreateTask] = useState(false);
    const [overview, setOverview] = useState(true);
    const [managetask, setManageTask] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const userName = localStorage.getItem('userName');
                setNameOfAdmin(userName)
                if (!token) {
                    window.location.href = '/'; // Redirect to login if no token
                    return;
                }

                const response = await axios.get('http://localhost:5000/api/auth/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setUsers(response.data); // Set users data in state
            } catch (error) {
                console.error('Error fetching users:', error); // Log error to console
                setErrorMessage(error.response ? error.response.data.message : 'Something went wrong');
            }
        };

        fetchUsers();
    }, []);

    const handlemanageusers = () => {
        setManagerUser(true);
        setCreateTask(false);
        setOverview(false);
        setManageTask(false);
    }

    const handleCreateTask = () => {
        setCreateTask(true);
        setManagerUser(false);
        setManageTask(false);
        setOverview(false);
    }

    const handleDashClick = () => {
        setOverview(true);
        setCreateTask(false);
        setManagerUser(false);
        setManageTask(false);
    }

    const handleManageTask = () => {
        setManageTask(true);
        setOverview(false);
        setCreateTask(false);
        setManagerUser(false);
    }

    return (
        <Grid>
            <Grid>
                {/* DrawerAppBar component for Admin Navbar */}
                <Grid item>
                    <DrawerAppBar nameOfAdmin={nameOfAdmin} />
                </Grid>

                {/* Create Task Button in its own Grid container */}
                <Grid sx={{ marginTop: 10, ml: 3, display: "flex", justifyContent: "space-between", gap: 1 }}>
                    <Grid>
                        <Typography
                            variant='h6'
                            sx={{ fontFamily: "initial", cursor: "pointer" }}
                            onClick={handleDashClick}
                        >
                            TechWorld
                        </Typography>
                    </Grid>
                    <Grid sx={{ gap: 2, display: "flex", mr: 3 }}>
                        <Grid item>
                            <Button variant="contained" color="secondary" size='small' onClick={handleCreateTask} sx={{ fontSize: "0.7rem" }}>
                                Create task
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button size='small' variant="contained" color="secondary" onClick={handleManageTask} sx={{ fontSize: "0.7rem" }}>
                                Manage task
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button size='small' variant="contained" color="secondary" onClick={handlemanageusers} sx={{ fontSize: "0.7rem" }}>
                                Manage users
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <hr />
            {overview && (
                <Grid sx={{ mr: 3, ml: 3, mt: 1 }}>
                    <Grid sx={{ mb: 1 }}>Overview</Grid>
                    <Grid>
                        <OverviewCards />
                    </Grid>
                </Grid>
            )}
            {manageUsers && <ManageUsers />}
            {createTask && <CreateTask />}
            {managetask && <ManageTask />}

        </Grid>
    );
};

export default AdminDashboard;
