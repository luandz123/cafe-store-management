import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email'; // Thêm icon cho input
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
      const data = { email };
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
    <Paper elevation={3} sx={{ padding: 4, width: '400px', margin: 'auto', textAlign: 'center' }}>
      {/* Tiêu đề */}
      <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
        Quên Mật Khẩu
      </Typography>

      {/* Thêm hình ảnh hoặc biểu tượng */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
        <img 
          src="https://cdn-icons-png.flaticon.com/512/561/561127.png" 
          alt="Forgot Password" 
          width="80"
          height="80"
        />
      </Box>

      {/* Thông báo */}
      {message && (
        <Typography
          variant="body2"
          color={messageType === 'error' ? 'error' : 'success.main'}
          sx={{ marginBottom: 2 }}
        >
          {message}
        </Typography>
      )}

      {/* Input email */}
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 3 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputProps={{
          startAdornment: (
            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 1 }}>
              <EmailIcon color="primary" />
            </Box>
          ),
        }}
      />

      {/* Nút thao tác */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          onClick={onClose}
          color="secondary"
          variant="outlined"
          disabled={loading}
          sx={{
            textTransform: 'none',
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
        >
          Hủy
        </Button>
        <Button
          onClick={handleForgotPassword}
          color="primary"
          variant="contained"
          disabled={loading}
          sx={{
            textTransform: 'none',
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#135ba1' },
          }}
        >
          {loading ? 'Đang gửi...' : 'Gửi'}
        </Button>
      </Box>
    </Paper>
  );
};

export default ForgotPasswordForm;
