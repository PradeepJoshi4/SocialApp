import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, Alert, TextField, Box, Typography, TablePagination } from '@mui/material';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddUser from './AddUser';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editUserData, setEditUserData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        department: ''
    });
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [openModalForAdd, setOpenModalForAdd] = useState(false);

    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Adjust number of rows per page

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

    // Handle page change for pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle rows per page change for pagination
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page when changing rows per page
    };

    // Delete user
    const deleteUser = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/auth/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Refresh user list after deleting
            setUsers(users.filter(user => user._id !== userId));
            setAlertMessage('User deleted successfully');
            setAlertOpen(true);
        } catch (error) {
            setAlertMessage(error.response ? error.response.data.message : 'Something went wrong');
            setAlertOpen(true);
        }
    };

    // Handle edit user data
    const handleEditClick = (user) => {
        setEditUserData({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
            department: user.department
        });
        setIsEditModalOpen(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const editUser = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            await axios.put(`http://localhost:5000/api/auth/users/${editUserData._id}`, editUserData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Update the user list after editing
            setUsers(users.map(user => user._id === editUserData._id ? { ...user, ...editUserData } : user));
            setIsEditModalOpen(false);  // Close modal after editing
            setAlertMessage('User updated successfully');
            setAlertOpen(true);
        } catch (error) {
            setErrorMessage(error.response ? error.response.data.message : 'Something went wrong');
        }
    };

    const handleAdd = () => {
        console.log("add button clicked");
        setOpenModalForAdd(true);
    }

    // Paginated data to display
    const paginatedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Grid>

            {/* Alert for messages */}
            {alertOpen && (
                <Grid item xs={12}>
                    <Alert severity={errorMessage ? 'error' : 'success'} onClose={() => setAlertOpen(false)}>
                        {alertMessage}
                    </Alert>
                </Grid>
            )}

            <Grid sx={{ ml: 3, display: "flex", justifyContent: "space-between", alignItems: 'center', height: '100%' }}>
                <Typography sx={{ fontFamily: "revert-layer" }}>Manage users</Typography>
                <Button
                    sx={{
                        bgcolor: "lavender", fontSize: "0.7rem",
                        padding: "4px 8px", borderRadius: "10px", mb: 1, mr: 3, color: "black",
                        fontWeight: "bolder"
                    }}
                    size="small"
                    onClick={handleAdd}
                >
                    Add user
                </Button>

            </Grid>

            {/* Table for displaying users */}
            <Grid item xs={12} sx={{ ml: 3, mr: 3 }}>
                <TableContainer>
                    <Table
                        size='small'  // Use small size for the table
                        sx={{
                            border: "1px solid lightgray",
                            fontSize: '0.875rem',  // Reduce font size of table content
                            '& th, & td': {
                                padding: '0px',  // Adjust padding for cells
                            },
                        }}
                    >
                        <TableHead sx={{ textAlign: "center" }}>
                            <TableRow sx={{ textAlign: "center" }}>
                                <TableCell sx={{ textAlign: "center", fontWeight: "bold", border: "1px solid lightgray", padding: '6px' }}>Name</TableCell>
                                <TableCell sx={{ textAlign: "center", fontWeight: "bold", border: "1px solid lightgray", padding: '6px' }}>Email</TableCell>
                                <TableCell sx={{ textAlign: "center", fontWeight: "bold", border: "1px solid lightgray", padding: '6px' }}>Password</TableCell>
                                <TableCell sx={{ textAlign: "center", fontWeight: "bold", border: "1px solid lightgray", padding: '6px' }}>Role</TableCell>
                                <TableCell sx={{ textAlign: "center", fontWeight: "bold", border: "1px solid lightgray", padding: '6px' }}>Department</TableCell>
                                <TableCell sx={{ fontWeight: "bold", border: "1px solid lightgray", textAlign: "center", padding: '6px' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedUsers.length > 0 ? (
                                paginatedUsers.map((user) => (
                                    <TableRow key={user._id}>
                                        <TableCell sx={{ textAlign: "center", border: "1px solid lightgray", padding: '8px' }}>{user.name}</TableCell>
                                        <TableCell sx={{ textAlign: "center", border: "1px solid lightgray", padding: '8px' }}>{user.email}</TableCell>
                                        <TableCell sx={{ textAlign: "center", border: "1px solid lightgray", padding: '8px' }}>{user.password}</TableCell>
                                        <TableCell sx={{ textAlign: "center", color: user.role === "admin" ? "red" : "green", fontWeight: "bolder", border: "1px solid lightgray", padding: '8px' }}>{user.role}</TableCell>
                                        <TableCell sx={{ textAlign: "center", border: "1px solid lightgray", padding: '8px' }}>{user.department === null ? "Null" : user.department}</TableCell>
                                        <TableCell sx={{ display: "flex", justifyContent: "center", padding: '8px' }}>
                                            <IconButton color="success" onClick={() => handleEditClick(user)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton sx={{ color: "darkviolet" }} onClick={() => deleteUser(user._id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ padding: '8px' }}>No users found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>


                {/* Pagination controls */}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Grid>

            {/* Edit User Modal */}
            <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} fullWidth>

                <DialogContent>
                    <DialogTitle sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'center' }}>
                        Edit User: {editUserData.name}
                    </DialogTitle>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Name"
                            name="name"
                            value={editUserData.name}
                            onChange={handleEditChange}
                            fullWidth
                            sx={{ backgroundColor: '#f9f9f9' }}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={editUserData.email}
                            onChange={handleEditChange}
                            fullWidth
                            sx={{ backgroundColor: '#f9f9f9' }}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={editUserData.password}
                            onChange={handleEditChange}
                            fullWidth
                            sx={{ backgroundColor: '#f9f9f9' }}
                        />
                        <TextField
                            label="Role"
                            name="role"
                            value={editUserData.role}
                            onChange={handleEditChange}
                            fullWidth
                            sx={{ backgroundColor: '#f9f9f9' }}
                        />
                        <TextField
                            label="Department"
                            name="department"
                            value={editUserData.department}
                            onChange={handleEditChange}
                            fullWidth
                            sx={{ backgroundColor: '#f9f9f9' }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button
                        onClick={() => setIsEditModalOpen(false)}
                        color="secondary"
                        variant="outlined"
                        sx={{ width: '120px', borderRadius: '20px' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={editUser}
                        color="primary"
                        variant="contained"
                        sx={{ width: '120px', borderRadius: '20px', backgroundColor: 'primary.main' }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {
                openModalForAdd && <AddUser
                    openModalForAdd={openModalForAdd}
                    setOpenModalForAdd={setOpenModalForAdd}
                    setUsers={setUsers}

                />
            }

        </Grid>
    );
};

export default ManageUsers;
