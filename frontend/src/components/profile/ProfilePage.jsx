import React from 'react';
import { Avatar, Button, Typography, Grid, Paper, Box } from '@mui/material';

const ProfilePage = ({ posts }) => {
    // Hardcoded profile data
    const profile = {
        name: 'Rohan Sharma',
        email: 'rohan@example.com',
        bio: 'Web developer with a passion for learning new technologies and creating impactful applications.',
        profilePicture: 'https://randomuser.me/api/portraits/men/10.jpg', // Example profile picture URL
    };

    return (
        <Grid sx={{ padding: 3, bgcolor: "lavender" }}>
            <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
                <Grid>
                    <Avatar
                        src={profile.profilePicture || '/default-profile.png'}
                        alt={profile.name}
                        sx={{ width: 50, height: 50 }}
                    />
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </Grid>
                <Grid sx={{ display: "flex", gap: 2 }}>
                    <Typography>
                        conections
                        <p style={{ textAlign: "center" }}>23</p>
                    </Typography>
                    <Typography>
                        posts
                        <p style={{ textAlign: "center" }}>{posts.length}</p>
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProfilePage;
