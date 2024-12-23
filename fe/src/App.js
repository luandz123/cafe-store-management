import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
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
import { login, signup, forgotPassword } from './service/api'; // Ensure this path is correct

function App() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);

  // Form fields for Login and Sign Up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [emailForgot, setEmailForgot] = useState('');

  // Notification states
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

// Hàm xử lý đăng nhập
const handleLogin = async () => {
  try {
    const response = await login({ email, password });
    const { token, role } = response.data; // Giả sử API trả về token và role trực tiếp ở root

    // Lưu token vào localStorage
    localStorage.setItem('authToken', token);
    
    // Hiển thị thông báo thành công
    setMessage('Đăng nhập thành công!');
    setMessageType('success');
    setOpenSnackbar(true);
    
    // Đóng form đăng nhập
    setShowLoginForm(false);
    
    // Chuyển hướng dựa trên role
    if (role === 'ADMIN') {
      navigate('/admin/dashboard'); // Chuyển hướng đến trang dashboard admin
    } else {
       // Chuyển hướng đến trang người dùng thông thường
      navigate('/');
    }
  } catch (error) {
    // Hiển thị thông báo lỗi
    setMessage('Thông tin đăng nhập không chính xác!');
    setMessageType('error');
    setOpenSnackbar(true);
  }
};

  // Hàm xử lý đăng ký
  const handleSignUp = async () => {
    if (password === confirmPassword) {
      try {
        const userData = { phone, password, email, username };
        const response = await signup(userData); // Call signup API
        setMessage('Đăng ký thành công!');
        setMessageType('success');
        setOpenSnackbar(true);
        setShowSignUpForm(false);
        setShowLoginForm(true);
      } catch (error) {
        setMessage('Đăng ký thất bại!');
        setMessageType('error');
        setOpenSnackbar(true);
      }
    } else {
      setMessage('Mật khẩu và xác nhận mật khẩu không khớp!');
      setMessageType('error');
      setOpenSnackbar(true);
    }
  };

  // Hàm xử lý quên mật khẩu
  const handleForgotPassword = async () => {
    try {
      const response = await forgotPassword({ email: emailForgot });
      setMessage('Yêu cầu thay đổi mật khẩu đã được gửi!');
      setMessageType('success');
      setOpenSnackbar(true);
      setShowForgotPasswordForm(false);
      setEmailForgot(''); // Clear the forgot password email field
    } catch (error) {
      setMessage('Yêu cầu thay đổi mật khẩu thất bại!');
      setMessageType('error');
      setOpenSnackbar(true);
    }
  };

  // Hàm mở dialog thay đổi mật khẩu
  const handleChangePasswordClick = () => {
    setOpenChangePasswordDialog(true);
  };

  // Hàm đóng dialog thay đổi mật khẩu
  const handleCloseChangePasswordDialog = () => {
    setOpenChangePasswordDialog(false);
  };

  // Hàm lưu thay đổi mật khẩu
  const handleSaveChangePassword = () => {
    // Implement password change logic here (e.g., API call)
    setMessage('Mật khẩu đã được thay đổi thành công!');
    setMessageType('success');
    setOpenSnackbar(true);
    setOpenChangePasswordDialog(false);
  };

  // Hàm đóng Snackbar
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  // Kiểm tra xem có phải đang ở trang admin không
  const isAdminPage = location.pathname.startsWith('/admin');

  // Hàm chuyển sang form đăng nhập và đóng form đăng ký
  const switchToLogin = () => {
    setShowLoginForm(true);
    setShowSignUpForm(false);
    setShowForgotPasswordForm(false);
  };

  // Hàm chuyển sang form đăng ký và đóng form đăng nhập
  const switchToSignUp = () => {
    setShowSignUpForm(true);
    setShowLoginForm(false);
    setShowForgotPasswordForm(false);
  };

  // Hàm chuyển sang form quên mật khẩu và đóng các form khác
  const switchToForgotPassword = () => {
    setShowForgotPasswordForm(true);
    setShowLoginForm(false);
    setShowSignUpForm(false);
  };

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setShowLoginForm(false);
    setShowSignUpForm(false);
    navigate('/');
  };

  return (
    <OrderProvider>
      <div className="App">
        {/* Navbar */}
        <Navbar
          onLogout={handleLogout}
          onChangePassword={handleChangePasswordClick}
          isAdminPage={isAdminPage}
          openLoginForm={() => setShowLoginForm(true)}
          openSignUpForm={() => setShowSignUpForm(true)}
        />

        {/* Routes */}
        <Routes>
          {/* Trang chủ */}
          <Route
            path="/"
            element={
              <div>
                {/* Các phần giao diện */}
                <Home />
                <About />
                <Menu />
                <Contact />
              </div>
            }
          />

          {/* Trang quản lý Admin */}
          <Route
            path="/admin/*"
            element={
              <div style={{ display: 'flex' }}>
                <Sidebar onLogout={handleLogout} />
                <div style={{ flex: 1 }}>
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
            }
          />
        </Routes>

        {/* Snackbar thông báo */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity={messageType} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>

        {/* Dialog thay đổi mật khẩu */}
        <Dialog open={openChangePasswordDialog} onClose={handleCloseChangePasswordDialog}>
          <DialogTitle>Đổi mật khẩu</DialogTitle>
          <DialogContent>
            <ChangePasswordForm onClose={handleCloseChangePasswordDialog} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseChangePasswordDialog}>Đóng</Button>
            <Button onClick={handleSaveChangePassword} color="primary">
              Lưu
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog Đăng nhập */}
        <Dialog open={showLoginForm} onClose={() => setShowLoginForm(false)}>
          <DialogTitle>Đăng nhập</DialogTitle>
          <DialogContent>
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
              switchToSignUp={switchToSignUp}
              switchToForgotPassword={switchToForgotPassword}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowLoginForm(false)}>Đóng</Button>
          </DialogActions>
        </Dialog>

        {/* Dialog Đăng ký */}
        <Dialog open={showSignUpForm} onClose={() => setShowSignUpForm(false)}>
          <DialogTitle>Đăng ký</DialogTitle>
          <DialogContent>
            <SignUpForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              phone={phone}
              setPhone={setPhone}
              username={username}
              setUsername={setUsername}
              handleSignUp={handleSignUp}
              switchToLogin={switchToLogin}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowSignUpForm(false)}>Đóng</Button>
          </DialogActions>
        </Dialog>

        {/* Dialog Quên mật khẩu */}
        <Dialog open={showForgotPasswordForm} onClose={() => setShowForgotPasswordForm(false)}>
          <DialogTitle>Quên mật khẩu</DialogTitle>
          <DialogContent>
            <ForgotPasswordForm
              emailForgot={emailForgot}
              setEmailForgot={setEmailForgot}
              handleForgotPassword={handleForgotPassword}
              switchToLogin={switchToLogin}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowForgotPasswordForm(false)}>Đóng</Button>
          </DialogActions>
        </Dialog>
      </div>
    </OrderProvider>
  );
}

export default App;