import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ComboBox from './TeamsDropdown'
import TaskAssignmentPage from './TaskAssignment'
import axios from 'axios'

const CreateTask = () => {
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [usersNameArray, setUsersNameArray] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    window.location.href = '/';  // Redirect to login if no token
                    return;
                }

                const response = await axios.get('http://localhost:5000/api/auth/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setUsers(response.data);  // Set users data in state


            } catch (error) {
                setErrorMessage(error.response ? error.response.data.message : 'Something went wrong');
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (users.length > 0) {
            let nameOfUsers = users.map(user => user.name);
            setUsersNameArray(nameOfUsers);
        }
    }, [users]);  // This will run whenever 'users' is updated



    return (
        <Grid>
            <Grid sx={{ mr: 6 }}>
                <Grid
                    sx={{
                        ml: 3,
                        display: "flex",
                        justifyContent: "space-between", // Distribute space between left and right
                        width: '100%', // Ensure it takes full width
                        gap: 1,
                    }}
                >
                    <Typography>
                        Create Task
                    </Typography>

                    <ComboBox />
                </Grid>
            </Grid>

            <TaskAssignmentPage usersNameArray={usersNameArray} />
        </Grid>
    )
}

export default CreateTask
