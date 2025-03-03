import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Container, Button } from '@mui/material';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

const OverviewCards = () => {
    const cardData = [
        {
            title: 'Our Innovative Team',
            description: 'This is a description for card number 1. It provides some details about the card content.',
            imageUrl: 'https://source.unsplash.com/featured/?nature,water',
            icon: <PeopleOutlineIcon />
        },
        {
            title: 'Events',
            description: 'This is a description for card number 2. It provides some details about the card content.',
            imageUrl: 'https://source.unsplash.com/featured/?landscape',
            icon: <EmojiEventsOutlinedIcon />
        },
        {
            title: 'Achievements',
            description: 'This is a description for card number 3. It provides some details about the card content.',
            imageUrl: 'https://source.unsplash.com/featured/?city,building',
            icon: <StarOutlineIcon />
        },
    ];

    return (
        <Grid>
            {/* Grid container that spans full width */}
            <Grid container justifyContent="flex-start" spacing={3}>
                {cardData.map((card, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            sx={{
                                width: '100%', // Ensure the card takes full width of the Grid item
                                boxShadow: 3,
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                                bgcolor: 'lavender',
                                cursor: 'pointer',
                            }}
                        >
                            <CardContent>
                                <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {card.title}
                                    </Typography>
                                    <Button sx={{ color: 'darkviolet' }}>
                                        {card.icon}
                                    </Button>
                                </Grid>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'gray',
                                        fontSize: '0.9rem',
                                        lineHeight: 1.5,
                                    }}
                                >
                                    {card.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default OverviewCards;
