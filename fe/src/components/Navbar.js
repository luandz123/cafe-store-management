import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onLogout, onChangePassword, isAdminPage }) => { // Thêm prop isAdminPage để biết có phải đang ở trang Admin không
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleMenuClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    onLogout();
    navigate('/');  // Điều hướng về trang đăng nhập
  };

  const handleChangePassword = () => {
    onChangePassword();
    setOpen(false); // Đóng menu
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" style={{ flex: 1 }}>
          Cafe Management System
        </Typography>

        {/* Hiển thị các nút đăng nhập, đăng ký chỉ nếu không phải ở trang Admin */}
        {!isAdminPage && (
          <>
            <Button color="inherit" onClick={() => navigate('/login')}>Đăng nhập</Button>
            <Button color="inherit" onClick={() => navigate('/signup')}>Đăng ký</Button>
          </>
        )}

        <IconButton color="inherit" onClick={handleMenuOpen}>
          <AccountCircleIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleChangePassword}>Đổi mật khẩu</MenuItem>
          <MenuItem onClick={handleSignOut}>Đăng xuất</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
