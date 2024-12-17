import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ForgotPasswordForm from './ForgotPasswordForm'; // Import the ForgotPasswordForm

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  switchToSignUp
}) => {
  // State to control Forgot Password Dialog
  const [openForgotPasswordDialog, setOpenForgotPasswordDialog] = useState(false);

  const handleOpenForgotPassword = () => {
    setOpenForgotPasswordDialog(true);
  };

  const handleCloseForgotPassword = () => {
    setOpenForgotPasswordDialog(false);
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
      <Typography variant="h5" sx={{ marginBottom: 2, textAlign: 'center', color: '#1976d2', fontWeight: 'bold' }}>
        Đăng Nhập
      </Typography>
      
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <TextField
          label="Mật khẩu"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button variant="contained" type="submit" fullWidth>
            Đăng Nhập
          </Button>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
          <Button 
            variant="text" 
            onClick={switchToSignUp}
          >
            Đăng ký
          </Button>
          <Button 
            variant="text" 
            onClick={handleOpenForgotPassword} // Add Forgot Password button
          >
            Quên Mật Khẩu
          </Button>
        </Box>
      </form>

      {/* Forgot Password Dialog */}
      <Dialog open={openForgotPasswordDialog} onClose={handleCloseForgotPassword}>
        <DialogTitle>Quên Mật Khẩu</DialogTitle>
        <DialogContent>
          <ForgotPasswordForm onCancel={handleCloseForgotPassword} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForgotPassword}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default LoginForm;