// src/components/SignUpForm.js
import React from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const SignUpForm = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  username,
  setUsername,
  phone,
  setPhone,
  handleSignUp,
  setShowSignUpForm
}) => {

  // Hàm xử lý sự kiện submit của form
  const onSubmit = (e) => {
    e.preventDefault(); // Ngừng hành động mặc định của form (tự động làm mới trang)
    handleSignUp(); // Gọi hàm handleSignUp để thực hiện logic đăng ký
  };

  return (
    <form onSubmit={onSubmit}>
      <Typography variant="h5" gutterBottom>
        Đăng ký
      </Typography>
      <TextField
        label="Tên người dùng"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="Số điện thoại"
        fullWidth
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="Email"
        fullWidth
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="Mật khẩu"
        fullWidth
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="Xác nhận mật khẩu"
        fullWidth
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <Button 
        fullWidth 
        variant="contained" 
        color="primary" 
        type="submit" // Dùng type="submit" để gọi hàm onSubmit khi người dùng nhấn nút
        sx={{ marginTop: 2 }}
      >
        Đăng ký
      </Button>
      <Button 
        fullWidth 
        variant="text" 
        sx={{ marginTop: 1 }} 
        onClick={() => setShowSignUpForm(false)} // Quay lại form đăng nhập
      >
        Quay lại Đăng nhập
      </Button>
    </form>
  );
};

export default SignUpForm;