import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onLogout, isAdminPage }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Open menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  // Close menu
  const handleMenuClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  // Logout handler
  const handleSignOut = () => {
    onLogout();
    navigate('/'); // Redirect to '/' which shows LoginForm
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* Logo or App Name */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Coffee Management
          </Typography>

          {/* Account Icon */}
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircleIcon />
          </IconButton>

          {/* Account Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
          >
            {/* Removed the Forgot Password MenuItem */}
            <MenuItem onClick={handleSignOut}>Đăng Xuất</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;