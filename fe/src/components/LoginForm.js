import React from 'react';
import { TextField, Button } from '@mui/material';

const LoginForm = ({ email, setEmail, password, setPassword, handleLogin, setShowLoginForm }) => {
  
  // Hàm xử lý sự kiện submit của form
  const onSubmit = (e) => {
    e.preventDefault(); // Ngừng hành động mặc định của form (tự động làm mới trang)
    handleLogin(); // Gọi hàm handleLogin để thực hiện logic đăng nhập
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField
        label="Email"
        fullWidth
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Cập nhật giá trị email
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="Mật khẩu"
        fullWidth
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Cập nhật giá trị password
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
        Đăng nhập
      </Button>
      <Button 
        fullWidth 
        variant="text" 
        sx={{ marginTop: 2 }} 
        onClick={() => setShowLoginForm(false)} // Chuyển sang form đăng ký hoặc quên mật khẩu
      >
        Quay lại
      </Button>
    </form>
  );
};

export default LoginForm;
