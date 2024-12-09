import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography, Box } from '@mui/material';

const ChangePasswordForm = ({ onClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('Tất cả các trường đều phải điền!');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu mới và xác nhận mật khẩu không khớp!');
      return;
    }
    // Xử lý thay đổi mật khẩu thành công
    setSuccess('Đổi mật khẩu thành công!');
    setError('');
    // Đóng form sau khi thay đổi thành công (hoặc có thể thêm logic)
    onClose();
  };

  return (
    <Box sx={{ width: '400px' }}>
      <Dialog open={true} onClose={onClose}>
        <DialogTitle>Đổi mật khẩu</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
            Vui lòng điền thông tin để thay đổi mật khẩu của bạn.
          </Typography>

          {/* Hiển thị thông báo lỗi nếu có */}
          {error && (
            <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
              {error}
            </Typography>
          )}

          {/* Hiển thị thông báo thành công nếu có */}
          {success && (
            <Typography variant="body2" color="success" sx={{ marginBottom: 2 }}>
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
          <Button onClick={onClose} color="secondary" variant="outlined">
            Hủy
          </Button>
          <Button onClick={handleChangePassword} color="primary" variant="contained">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChangePasswordForm;
