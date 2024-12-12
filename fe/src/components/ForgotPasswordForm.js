// src/components/ForgotPasswordForm.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { forgotPassword } from '../service/api';

const ForgotPasswordForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      setMessage('Vui lòng nhập email!');
      setMessageType('error');
      return;
    }

    setLoading(true);
    try {
      const data = {
        email,
      };
      const response = await forgotPassword(data);
      setMessage(response.data.message || 'Nếu email tồn tại, bạn sẽ nhận được hướng dẫn qua email.');
      setMessageType('success');
      setEmail('');
      onClose();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Đã xảy ra lỗi!');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '400px' }}>
      <Typography variant="h6" gutterBottom>
        Quên mật khẩu
      </Typography>

      {message && (
        <Typography variant="body2" color={messageType === 'error' ? 'error' : 'success.main'} sx={{ marginBottom: 2 }}>
          {message}
        </Typography>
      )}

      <TextField
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button onClick={onClose} color="secondary" variant="outlined" disabled={loading}>
          Hủy
        </Button>
        <Button onClick={handleForgotPassword} color="primary" variant="contained" disabled={loading}>
          {loading ? 'Đang gửi...' : 'Gửi'}
        </Button>
      </Box>
    </Box>
  );
};

export default ForgotPasswordForm;