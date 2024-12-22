import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Badge,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';
import LoginForm from './LoginForm'; // Import form đăng nhập
import SignUpForm from './SignUpForm'; // Import form đăng ký

const Navbar = ({ isAdminPage, onLogin, onSignUp }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartCount, setCartCount] = useState(3); // Demo số lượng trong giỏ hàng
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const navigate = useNavigate();

  // Mở menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Đóng menu
  const handleMenuClose = () => {
    setAnchorEl(null);
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
          >
            PTIT Coffee
          </Typography>

          {/* Hiển thị các nút cuộn mượt (chỉ hiển thị khi không phải trang Admin) */}
          {!isAdminPage && (
            <>
              <Button color="inherit">
                <Link
                  to="home"
                  smooth={true}
                  duration={500}
                  offset={-70}
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  Home
                </Link>
              </Button>
              <Button color="inherit">
                <Link
                  to="about"
                  smooth={true}
                  duration={500}
                  offset={-70}
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  About
                </Link>
              </Button>
              <Button color="inherit">
                <Link
                  to="menu"
                  smooth={true}
                  duration={500}
                  offset={-70}
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  Menu
                </Link>
              </Button>
              <Button color="inherit">
                <Link
                  to="contact"
                  smooth={true}
                  duration={500}
                  offset={-70}
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  Contact
                </Link>
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
            <MenuItem
              onClick={() => {
                setShowLoginForm(true);
                handleMenuClose();
              }}
            >
              Đăng nhập
            </MenuItem>
            <MenuItem
              onClick={() => {
                setShowSignUpForm(true);
                handleMenuClose();
              }}
            >
              Đăng ký
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Dialog Form Đăng nhập */}
      {showLoginForm && (
        <Dialog open={showLoginForm} onClose={() => setShowLoginForm(false)}>
          <DialogTitle>Đăng nhập</DialogTitle>
          <DialogContent>
            <LoginForm
              onLoginSuccess={() => {
                setShowLoginForm(false);
                navigate('/admin'); // Chuyển hướng đến trang admin sau khi đăng nhập thành công
              }}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Dialog Form Đăng ký */}
      {showSignUpForm && (
        <Dialog open={showSignUpForm} onClose={() => setShowSignUpForm(false)}>
          <DialogTitle>Đăng ký</DialogTitle>
          <DialogContent>
            <SignUpForm
              onSignUpSuccess={() => {
                setShowSignUpForm(false);
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Navbar;
