import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'; 
import { Container, Grid, Card, CardContent, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { OrderProvider } from './contexts/OrderContext'; // Thêm OrderContext
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import AdminPage from './pages/AdminPage'; // Trang Admin  
import Sidebar from './components/Sidebar'; // Thanh điều hướng bên trái
import Navbar from './components/Navbar'; // Thanh điều hướng trên cùng
import ChangePasswordForm from './components/ChangePasswordForm'; // Form thay đổi mật khẩu
import Dashboard from './pages/Dashboard'; // Import Dashboard component mới
import ManageCategories from './pages/ManageCategories';
import ManageProducts from './pages/ManageProducts';
import ManageOrders from './pages/ManageOrders'; 
import ViewBills from './pages/ViewBills'; // Import ViewBills component mới
import ManageUsers from './pages/ManageUsers'; 
import { login, signup } from './service/api'; // Thêm signup vào import

function App() {
  // Initialize to show Login form by default
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  // Removed showForgotPasswordForm

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState(''); // Thêm state cho phone
  const [username, setUsername] = useState(''); // Thêm state cho username

  // Notification states
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false); // State điều khiển dialog thay đổi mật khẩu

  const navigate = useNavigate();
  const location = useLocation(); // Lấy thông tin location hiện tại

  // Hàm xử lý đăng nhập
  const handleLogin = async () => {
    try {
      const response = await login({ email, password });
      const token = response.data.token; // Điều chỉnh theo cấu trúc phản hồi API của bạn
      localStorage.setItem('authToken', token); // Lưu token vào localStorage
      setMessage('Đăng nhập thành công!');
      setMessageType('success');
      setOpenSnackbar(true);
      setShowLoginForm(false);
      navigate('/admin/dashboard'); // Redirect to admin dashboard
    } catch (error) {
      setMessage('Thông tin đăng nhập không chính xác!');
      setMessageType('error');
      setOpenSnackbar(true);
    }
  };

  // Hàm xử lý đăng ký
  const handleSignUp = async () => {
    if (password === confirmPassword) {
      // Gọi API đăng ký
      try {
        const userData = { phone, password, email, username };
        // Thực hiện đăng ký với userData
        // Giả định gọi API signUp
        // const response = await signup(userData);
        setMessage('Đăng ký thành công!');
        setMessageType('success');
        setOpenSnackbar(true);
        setShowSignUpForm(false);
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

  // Hàm mở dialog thay đổi mật khẩu
  const handleChangePasswordClick = () => {
    setOpenChangePasswordDialog(true); // Mở dialog
  };

  // Hàm đóng dialog thay đổi mật khẩu
  const handleCloseChangePasswordDialog = () => {
    setOpenChangePasswordDialog(false); // Đóng dialog
  };

  // Hàm lưu thay đổi mật khẩu
  const handleSaveChangePassword = () => {
    // Xử lý lưu mật khẩu mới (giả lập)
    setMessage('Mật khẩu đã được thay đổi thành công!');
    setMessageType('success');
    setOpenSnackbar(true);
    setOpenChangePasswordDialog(false); // Đóng dialog khi lưu thành công
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
    // Removed setShowForgotPasswordForm
  };

  // Hàm chuyển sang form đăng ký và đóng form đăng nhập
  const switchToSignUp = () => {
    setShowSignUpForm(true);
    setShowLoginForm(false);
    // Removed setShowForgotPasswordForm
  };

  return (
    <OrderProvider>
      <div className="App">
        {/* Routes */}
        <Routes>
          {/* Nếu chưa đăng nhập, hiển thị các form */}
          <Route path="/" element={(
            <Container maxWidth="lg">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} className="left-column">
                  <img src="/images/banner.jpg" alt="Banner" className="banner-image" />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Card>
                    <CardContent>
                      {showLoginForm && !isAdminPage && (
                        <LoginForm
                          email={email}
                          setEmail={setEmail}
                          password={password}
                          setPassword={setPassword}
                          handleLogin={handleLogin}
                          switchToSignUp={switchToSignUp}
                        />
                      )}

                      {showSignUpForm && !isAdminPage && (
                        <SignUpForm
                          email={email}
                          setEmail={setEmail}
                          password={password}
                          setPassword={setPassword}
                          confirmPassword={confirmPassword}
                          setConfirmPassword={setConfirmPassword}
                          phone={phone} // Thêm prop cho phone
                          setPhone={setPhone} // Thêm prop cho setPhone
                          username={username} // Thêm prop cho username
                          setUsername={setUsername} // Thêm prop cho setUsername
                          handleSignUp={handleSignUp}
                          switchToLogin={switchToLogin}
                        />
                      )}

                      {/* Removed showForgotPasswordForm */}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          )} />

          {/* Trang quản lý Admin */}
          <Route path="/admin/*" element={(
            <div style={{ display: 'flex' }}>
              {/* Thanh điều hướng bên trái */}
              <Sidebar onLogout={() => {
                // Clear token on logout
                localStorage.removeItem('authToken');
                // Set state to show login form
                setShowLoginForm(true);
                setShowSignUpForm(false);
                // Navigate to '/'
                navigate('/');
              }} />

              {/* Nội dung của trang Admin */}
              <div style={{ flex: 1 }}>
                <Navbar onLogout={() => {
                  // Clear token on logout
                  localStorage.removeItem('authToken');
                  // Set state to show login form
                  setShowLoginForm(true);
                  setShowSignUpForm(false);
                  // Navigate to '/'
                  navigate('/');
                }} onChangePassword={handleChangePasswordClick} isAdminPage={isAdminPage} />
                <Routes>
                  {/* Liên kết tới Dashboard */}
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="manage-categories" element={<ManageCategories />} />
                  <Route path="manage-products" element={<ManageProducts />} /> {/* Thêm route cho ManageProducts */}
                  <Route path="manage-orders" element={<ManageOrders />} /> {/* Thêm route cho Manage Orders */}
                  <Route path="view-bills" element={<ViewBills />} /> {/* Thêm route cho ViewBills */}
                  <Route path="manage-users" element={<ManageUsers />} /> {/* Thêm đường dẫn cho Manage Users */}
                </Routes>
              </div>
            </div>
          )} />
        </Routes>

        {/* Snackbar thông báo */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose} // Đã truyền hàm đóng Snackbar vào đây
        >
          <Alert
            onClose={handleSnackbarClose} // Đã truyền hàm đóng Alert vào đây
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
            {/* Chỉ render một form và truyền props cần thiết */}
            <ChangePasswordForm onClose={handleCloseChangePasswordDialog} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseChangePasswordDialog}>Đóng</Button>
          </DialogActions>
        </Dialog>
      </div>
    </OrderProvider>
  );
}

export default App;