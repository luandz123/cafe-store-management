import React from 'react';
import { TextField, Button, Grid } from '@mui/material';

const SignUpForm = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleSignUp,
  setShowSignUpForm
}) => {

  // Hàm xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();  // Ngăn không cho form reload trang
    handleSignUp();      // Gọi hàm handleSignUp từ props khi form được submit
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
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

        <Grid item xs={12}>
          <Button 
            fullWidth 
            variant="text" 
            sx={{ marginTop: 2 }} 
            onClick={() => setShowSignUpForm(false)}
          >
            Quay lại
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignUpForm;
