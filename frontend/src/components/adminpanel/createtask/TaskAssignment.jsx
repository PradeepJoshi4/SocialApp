import React, { useState } from "react";
import { Card, CardContent, Button, Grid, Typography, Box, Autocomplete, TextField } from "@mui/material";

function TaskAssignmentPage({ usersNameArray }) {

    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    // Dummy data for teams and departments
    const teams = ["Team A", "Team B", "Team C"];
    const departments = ["Department X", "Department Y", "Department Z"];

    const handleUserChange = (event, newValue) => setSelectedUser(newValue);
    const handleTeamChange = (event, newValue) => setSelectedTeam(newValue);
    const handleDepartmentChange = (event, newValue) => setSelectedDepartment(newValue);

    return (
        <Box sx={{ padding: 3 }}>
            <Grid container spacing={3}>
                {/* Assign to User Card */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: "lavender" }}>
                        <CardContent>
                            <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography gutterBottom>
                                    User
                                </Typography>
                                <Autocomplete
                                    value={selectedUser}
                                    onChange={handleUserChange}
                                    options={usersNameArray || []}
                                    getOptionLabel={(option) => option}
                                    renderInput={(params) => <TextField {...params} size="small" label="Select User"
                                        InputLabelProps={{
                                            sx: { fontSize: '0.8rem' }, // Reduce the label font size
                                        }}
                                    />}
                                    sx={{
                                        width: 140, '& .MuiInputBase-input': {
                                            fontSize: '0.8rem', // Reduce the value font size
                                        }
                                    }}
                                    ListboxProps={{
                                        sx: {
                                            fontSize: '0.8rem', // Reduce the option font size
                                            padding: '0', // Remove extra padding
                                        }
                                    }}
                                />
                            </Grid>
                            <Box mt={2}>
                                <Button
                                    sx={{
                                        borderRadius: "10px",
                                        fontSize: "0.7rem", // Adjust font size to make it smaller
                                        padding: "4px 8px", // Adjust padding for a more compact button
                                    }}
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                >
                                    Assign
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Assign to Team Card */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: "lavender" }}>
                        <CardContent>
                            <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography gutterBottom>
                                    Team
                                </Typography>
                                <Autocomplete
                                    value={selectedTeam}
                                    onChange={handleTeamChange}
                                    options={teams}
                                    getOptionLabel={(option) => option}
                                    renderInput={(params) => <TextField {...params} size="small" label="Select Team"
                                        InputLabelProps={{
                                            sx: { fontSize: '0.8rem' }, // Reduce the label font size
                                        }}
                                    />}
                                    sx={{
                                        width: 140, '& .MuiInputBase-input': {
                                            fontSize: '0.8rem', // Reduce the value font size
                                        }
                                    }}
                                    ListboxProps={{
                                        sx: {
                                            fontSize: '0.8rem', // Reduce the option font size
                                            padding: '0', // Remove extra padding
                                        }
                                    }}
                                />
                            </Grid>
                            <Box mt={2}>
                                <Button
                                    sx={{
                                        borderRadius: "10px",
                                        fontSize: "0.7rem", // Adjust font size to make it smaller
                                        padding: "4px 8px", // Adjust padding for a more compact button
                                    }}
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                >
                                    Assign
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Assign to Department Card */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: "lavender" }}>
                        <CardContent>
                            <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography gutterBottom>
                                    Department
                                </Typography>
                                <Autocomplete
                                    value={selectedDepartment}
                                    onChange={handleDepartmentChange}
                                    options={departments}
                                    getOptionLabel={(option) => option}
                                    renderInput={(params) => <TextField {...params} size="small" label="Select Department"
                                        InputLabelProps={{
                                            sx: { fontSize: '0.8rem' }, // Reduce the label font size
                                        }}
                                    />}
                                    sx={{
                                        width: 180, '& .MuiInputBase-input': {
                                            fontSize: '0.8rem', // Reduce the value font size
                                        }
                                    }}
                                    ListboxProps={{
                                        sx: {
                                            fontSize: '0.8rem', // Reduce the option font size
                                            padding: '0', // Remove extra padding
                                        }
                                    }}
                                />
                            </Grid>
                            <Box mt={2}>
                                <Button
                                    sx={{
                                        borderRadius: "10px",
                                        fontSize: "0.7rem", // Adjust font size to make it smaller
                                        padding: "4px 8px", // Adjust padding for a more compact button
                                    }}
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                >
                                    Assign
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default TaskAssignmentPage;
