import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/users';

const ForgotPasswordForm = ({ onCancel }) => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isTokenSent, setIsTokenSent] = useState(false);
  
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageType, setMessageType] = useState('success');

  const forgotPassword = async (email) => {
    const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email });
    return response.data;
  };

  const resetPassword = async (token, newPassword) => {
    const response = await axios.post(`${API_BASE_URL}/reset-password`, { token, newPassword });
    return response.data;
  };

  const handleSendToken = async () => {
    if (!email) {
      setError('Vui lòng nhập email.');
      return;
    }
    try {
      await forgotPassword(email);
      setMessage('Token đã được gửi đến email của bạn.');
      setMessageType('success');
      setOpenSnackbar(true);
      setIsTokenSent(true);
      setError('');
    } catch (err) {
      setError('Gửi yêu cầu thất bại. Vui lòng thử lại.');
    }
  };

  const handleResetPassword = async () => {
    if (!token || !newPassword || !confirmPassword) {
      setError('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      return;
    }

    try {
      await resetPassword(token, newPassword);
      setMessage('Đặt lại mật khẩu thành công!');
      setMessageType('success');
      setOpenSnackbar(true);
      // Reset form state
      setIsTokenSent(false);
      setEmail('');
      setToken('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
      // Close the form/dialog
      onCancel();
    } catch (err) {
      setError('Đặt lại mật khẩu thất bại. Vui lòng kiểm tra lại token.');
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
      <Typography variant="h5" sx={{ marginBottom: 2, color: '#1976d2', fontWeight: 'bold' }}>
        {isTokenSent ? 'Đặt Lại Mật Khẩu' : 'Quên Mật Khẩu'}
      </Typography>
      
      {!isTokenSent ? (
        <>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && (
            <Typography color="error" sx={{ marginTop: 1 }}>
              {error}
            </Typography>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, marginTop: 2 }}>
            <Button variant="outlined" onClick={onCancel}>
              Hủy
            </Button>
            <Button variant="contained" onClick={handleSendToken}>
              Gửi Token
            </Button>
          </Box>
        </>
      ) : (
        <>
          <TextField
            label="Token"
            type="text"
            fullWidth
            margin="normal"
            variant="outlined"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <TextField
            label="Mật khẩu mới"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="Xác nhận mật khẩu mới"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" sx={{ marginTop: 1 }}>
              {error}
            </Typography>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, marginTop: 2 }}>
            <Button variant="outlined" onClick={() => setIsTokenSent(false)}>
              Quay lại
            </Button>
            <Button variant="contained" onClick={handleResetPassword}>
              Đặt Lại Mật Khẩu
            </Button>
          </Box>
        </>
      )}

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={messageType} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ForgotPasswordForm;