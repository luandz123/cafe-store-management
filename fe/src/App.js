import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'; 
import { Container, Grid, Card, CardContent, Snackbar, Alert, Dialog, DialogContent, DialogTitle, Button, AppBar, Toolbar, Typography } from '@mui/material';
import { OrderProvider } from './contexts/OrderContext';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ChangePasswordForm from './components/ChangePasswordForm';
import Dashboard from './pages/Dashboard';
import ManageCategories from './pages/ManageCategories';
import ManageProducts from './pages/ManageProducts';
import ManageOrders from './pages/ManageOrders';
import ViewBills from './pages/ViewBills';
import ManageUsers from './pages/ManageUsers';
import Home from './pages/Home'; // Trang Home
import About from './pages/About'; // Trang About
import Menu from './pages/Menu'; // Trang Menu
import Contact from './pages/Contact'; // Trang Contact
import './styles.css'; // Thêm file CSS cho ứng dụng

function App() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    // Dữ liệu giả lập để xác thực
    const validEmail = 'phong@123';
    const validPassword = '12345';
  
    if (email === validEmail && password === validPassword) {
      setMessage('Đăng nhập thành công!');
      setMessageType('success');
      setOpenSnackbar(true);
      localStorage.setItem('authToken', 'fakeToken123'); // Lưu token giả lập
      navigate('/admin'); // Chuyển đến trang admin
    } else {
      setMessage('Thông tin đăng nhập không chính xác!');
      setMessageType('error');
      setOpenSnackbar(true);
    }
  };
  

  const handleSignUp = () => {
    if (password === confirmPassword) {
      setMessage('Đăng ký thành công!');
      setMessageType('success');
      setOpenSnackbar(true);
      setShowSignUpForm(false);
      setShowLoginForm(true);
    } else {
      setMessage('Mật khẩu và xác nhận mật khẩu không khớp!');
      setMessageType('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseChangePasswordDialog = () => {
    setOpenChangePasswordDialog(false);
  };

  const handleSaveChangePassword = () => {
    setMessage('Mật khẩu đã được thay đổi thành công!');
    setMessageType('success');
    setOpenSnackbar(true);
    setOpenChangePasswordDialog(false);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <OrderProvider>
      <div className="App">
        {/* Navbar */}
        <Navbar
          onLogin={() => setShowLoginForm(true)}
          onSignUp={() => setShowSignUpForm(true)}
          onForgotPassword={() => setShowForgotPasswordForm(true)}
          isAdminPage={isAdminPage}
        />

        {/* Routes */}
        <Routes>
          <Route path="/" element={(
            <div>
              {/* Các phần giao diện */}
              <Home />
              <About />
              <Menu />
              <Contact />
            </div>
          )} />

          {/* Trang quản lý Admin */}
          <Route path="/admin/*" element={(
            <div style={{ display: 'flex' }}>
              <Sidebar onLogout={() => navigate('/')} />
              <div style={{ flex: 1 }}>
                <Navbar
                  onLogout={() => navigate('/')}
                  onChangePassword={() => setOpenChangePasswordDialog(true)}
                  isAdminPage={isAdminPage}
                />
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="manage-categories" element={<ManageCategories />} />
                  <Route path="manage-products" element={<ManageProducts />} />
                  <Route path="manage-orders" element={<ManageOrders />} />
                  <Route path="view-bills" element={<ViewBills />} />
                  <Route path="manage-users" element={<ManageUsers />} />
                </Routes>
              </div>
            </div>
          )} />
        </Routes>

        {/* Snackbar thông báo */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={messageType}
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>

        {/* Dialog thay đổi mật khẩu */}
        <Dialog open={openChangePasswordDialog} onClose={handleCloseChangePasswordDialog}>
          <DialogTitle>Đổi mật khẩu</DialogTitle>
          <DialogContent>
            <ChangePasswordForm onClose={handleCloseChangePasswordDialog} />
          </DialogContent>
        </Dialog>
      </div>
    </OrderProvider>
  );
}

export default App;
