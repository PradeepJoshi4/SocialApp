import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'

const AddUser = ({ openModalForAdd, setOpenModalForAdd, setUsers }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');

    const handleAddUser = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please log in first.");
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/adduser',
                {
                    name,
                    email,
                    password,
                    role,
                    department
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('New User Response:', response.data);  // Log the response data

            // Update the users state with the new list of users (response.data contains the full list now)
            setUsers(response.data);

            // Close the modal after adding the user
            setOpenModalForAdd(false);
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert('An error occurred while adding the user.');
            }
        }
    };





    return (
        <Dialog fullWidth open={openModalForAdd} onClose={() => setOpenModalForAdd(false)}>

            <DialogContent>
                <DialogTitle sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'center' }}>
                </DialogTitle>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Name"
                        name="name"
                        fullWidth
                        sx={{ backgroundColor: '#f9f9f9' }}
                        onChange={(e) => setName(e.target.value)}

                    />
                    <TextField
                        label="Email"
                        name="email"
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}

                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}

                        fullWidth
                        sx={{ backgroundColor: '#f9f9f9' }}
                    />
                    <TextField
                        label="Role"
                        name="role"
                        onChange={(e) => setRole(e.target.value)}

                        fullWidth
                        sx={{ backgroundColor: '#f9f9f9' }}
                    />
                    <TextField
                        label="Department"
                        name="department"
                        onChange={(e) => setRole(e.target.value)}

                        fullWidth
                        sx={{ backgroundColor: '#f9f9f9' }}
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button
                    color="secondary"
                    variant="outlined"
                    sx={{ width: '120px', borderRadius: '20px' }}
                    onClick={() => setOpenModalForAdd(false)}
                >
                    Cancel
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    sx={{ width: '120px', borderRadius: '20px', backgroundColor: 'primary.main' }}
                    onClick={handleAddUser}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddUser;