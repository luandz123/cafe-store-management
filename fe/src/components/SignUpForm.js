import React from 'react';
import { TextField, Button, Grid } from '@mui/material';

const SignUpForm = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  phone,
  setPhone,
  username,
  setUsername,
  handleSignUp,
  switchToLogin
}) => {

  // Hàm xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();  // Ngăn không cho form reload trang
    handleSignUp();      // Gọi hàm handleSignUp từ props khi form được submit
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {/* Email Field */}
        <Grid item xs={12}>
          <TextField
            label="Email"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
            required
          />
        </Grid>

        {/* Password Field */}
        <Grid item xs={12}>
          <TextField
            label="Mật khẩu"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
          />
        </Grid>

        {/* Confirm Password Field */}
        <Grid item xs={12}>
          <TextField
            label="Xác nhận mật khẩu"
            fullWidth
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
          />
        </Grid>

        {/* Phone Field */}
        <Grid item xs={12}>
          <TextField
            label="Số điện thoại"
            fullWidth
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            variant="outlined"
            margin="normal"
            required
          />
        </Grid>
        
        {/* Username Field */}
        <Grid item xs={12}>
          <TextField
            label="Tên người dùng"
            fullWidth
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            margin="normal"
            required
          />
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            color="primary" 
            sx={{ marginTop: 2 }}
          >
            Đăng ký
          </Button>
        </Grid>

        {/* Switch to Login Button */}
        <Grid item xs={12}>
          <Button 
            fullWidth 
            variant="text" 
            sx={{ marginTop: 2 }} 
            onClick={switchToLogin} // Chuyển sang form đăng nhập và đóng form đăng ký
          >
            Đăng nhập
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignUpForm;