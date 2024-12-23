// src/components/Navbar.js
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Badge,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const Navbar = ({
  isAdminPage,
  onLogout,
  onChangePassword,
  openLoginForm,
  openSignUpForm,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartCount, setCartCount] = useState(3); // Demo số lượng trong giỏ hàng
  const navigate = useNavigate();

  // Mở menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Đóng menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Xử lý đăng xuất
  const handleLogoutClick = () => {
    onLogout();
    handleMenuClose();
  };

  // Xử lý đổi mật khẩu
  const handleChangePasswordClick = () => {
    onChangePassword();
    handleMenuClose();
  };

  // Mở dialog đăng nhập
  const handleOpenLoginDialog = () => {
    openLoginForm();
    handleMenuClose();
  };

  // Mở dialog đăng ký
  const handleOpenSignUpDialog = () => {
    openSignUpForm();
    handleMenuClose();
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: '#333', color: '#fff', boxShadow: 'none' }}>
        <Toolbar>
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              fontFamily: 'Arial, sans-serif',
              color: '#f4b400',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            PTIT Coffee
          </Typography>

          {/* Hiển thị các nút cuộn mượt (chỉ hiển thị khi không phải trang Admin) */}
          {!isAdminPage && (
            <>
              <Button color="inherit" href="#home">
                Home
              </Button>
              <Button color="inherit" href="#about">
                About
              </Button>
              <Button color="inherit" href="#menu">
                Menu
              </Button>
              <Button color="inherit" href="#contact">
                Contact
              </Button>
            </>
          )}

          {/* Biểu tượng tìm kiếm */}
          <IconButton color="inherit" sx={{ marginRight: 2 }}>
            <SearchIcon />
          </IconButton>

          {/* Biểu tượng giỏ hàng với Badge */}
          <IconButton color="inherit" sx={{ marginRight: 2 }}>
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Biểu tượng tài khoản */}
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircleIcon />
          </IconButton>

          {/* Menu dropdown */}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            {!isAdminPage ? (
              <>
                <MenuItem onClick={handleOpenLoginDialog}>Đăng nhập</MenuItem>
                <MenuItem onClick={handleOpenSignUpDialog}>Đăng ký</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={handleChangePasswordClick}>Đổi mật khẩu</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Đăng xuất</MenuItem>
              </>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;