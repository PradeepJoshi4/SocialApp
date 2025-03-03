import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, ListItemText, Box, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';

// Define the logo styles using styled-components
const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: rgb(30, 35, 41);
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    color: rgb(35, 129, 206);
  }
`;

const Navbar = ({ handleOpenSignup, handleOpenLogin }) => {
  const [openDrawer, setOpenDrawer] = useState(false);  // State for the Drawer (mobile menu)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));  // Check if the screen size is mobile

  const toggleDrawer = (open) => {
    setOpenDrawer(open);  // Toggle the Drawer visibility
  };

  // Drawer menu items
  const menuItems = (
    <Box sx={{ width: 250 }} onClick={() => toggleDrawer(false)}>
      <List>
        <ListItem button onClick={handleOpenSignup}>
          <ListItemText primary="Sign Up" />
        </ListItem>
        <ListItem button onClick={handleOpenLogin}>
          <ListItemText primary="Log In" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'lavender' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo Section */}
        <Logo>TechWorld</Logo>

        {/* Desktop Menu Items */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 2, color: "black", fontWeight: "bold" }}>
            <Button color="inherit" href="#features" sx={{ fontWeight: 'bold' }} >Features</Button>

            <Button color="inherit" sx={{ fontWeight: 'bold' }} onClick={handleOpenSignup}>Sign Up</Button>
            <Button color="inherit" sx={{ fontWeight: 'bold' }} onClick={handleOpenLogin}>Log In</Button>
          </Box>
        )}

        {/* Mobile Menu Icon */}
        {isMobile ? (
          <IconButton edge="start" color="inherit" onClick={() => toggleDrawer(true)} sx={{ display: { md: 'none' }, color: "black" }}>
            <MenuIcon />
          </IconButton>
        ) : null}

        {/* Mobile Drawer Menu */}
        <Drawer anchor="left" open={openDrawer} onClose={() => toggleDrawer(false)}>
          {menuItems}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
