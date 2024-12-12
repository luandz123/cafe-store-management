// ChangePasswordForm.js
import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';

const ChangePasswordForm = ({ onClose, authToken }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('Tất cả các trường đều phải điền!');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu mới và xác nhận mật khẩu không khớp!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        '/api/users/change-password',
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setSuccess(response.data.message || 'Đổi mật khẩu thành công!');
      setError('');
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Đã xảy ra lỗi!');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '400px' }}>
      <Dialog open={true} onClose={onClose}>
        <DialogTitle>Đổi mật khẩu</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
            Vui lòng điền thông tin để thay đổi mật khẩu của bạn.
          </Typography>

          {error && (
            <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
              {error}
            </Typography>
          )}

          {success && (
            <Typography variant="body2" color="success.main" sx={{ marginBottom: 2 }}>
              {success}
            </Typography>
          )}

          <TextField
            label="Mật khẩu cũ"
            type="password"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />

          <TextField
            label="Mật khẩu mới"
            type="password"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <TextField
            label="Xác nhận mật khẩu"
            type="password"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary" variant="outlined" disabled={loading}>
            Hủy
          </Button>
          <Button onClick={handleChangePassword} color="primary" variant="contained" disabled={loading}>
            {loading ? 'Đang lưu...' : 'Lưu'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChangePasswordForm;