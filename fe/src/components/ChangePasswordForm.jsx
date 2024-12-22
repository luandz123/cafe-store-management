import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Button, Box, Typography, Paper, Snackbar, Alert } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ChangePasswordForm = ({ onSave, onCancel }) => {
  const [values, setValues] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    showOldPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Xử lý thay đổi giá trị
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setError(''); // Xóa lỗi khi người dùng thay đổi giá trị
  };

  // Xử lý ẩn/hiện mật khẩu
  const toggleVisibility = (field) => {
    setValues({ ...values, [field]: !values[field] });
  };

  // Xử lý nút Hủy
  const handleCancel = () => {
    setValues({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      showOldPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
    });
    setError('');
    onCancel(); // Gọi hàm đóng form từ props
  };

  // Xử lý nút Lưu
  const handleSave = () => {
    if (!values.oldPassword || !values.newPassword || !values.confirmPassword) {
      setError('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    if (values.newPassword !== values.confirmPassword) {
      setError('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      return;
    }

    // Gọi hàm onSave (giả lập gọi API hoặc xử lý)
    onSave(values.oldPassword, values.newPassword);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000); // Ẩn thông báo thành công sau 3 giây
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
      <Typography variant="h5" sx={{ marginBottom: 2, color: '#1976d2', fontWeight: 'bold' }}>
        Đổi Mật Khẩu
      </Typography>

      {/* Mật khẩu cũ */}
      <TextField
        label="Mật khẩu cũ"
        type={values.showOldPassword ? 'text' : 'password'}
        fullWidth
        margin="normal"
        variant="outlined"
        value={values.oldPassword}
        onChange={handleChange('oldPassword')}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => toggleVisibility('showOldPassword')}>
                {values.showOldPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Mật khẩu mới */}
      <TextField
        label="Mật khẩu mới"
        type={values.showNewPassword ? 'text' : 'password'}
        fullWidth
        margin="normal"
        variant="outlined"
        value={values.newPassword}
        onChange={handleChange('newPassword')}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => toggleVisibility('showNewPassword')}>
                {values.showNewPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Xác nhận mật khẩu */}
      <TextField
        label="Xác nhận mật khẩu"
        type={values.showConfirmPassword ? 'text' : 'password'}
        fullWidth
        margin="normal"
        variant="outlined"
        value={values.confirmPassword}
        onChange={handleChange('confirmPassword')}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => toggleVisibility('showConfirmPassword')}>
                {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Hiển thị lỗi */}
      {error && (
        <Typography color="error" sx={{ marginTop: 1 }}>
          {error}
        </Typography>
      )}

      {/* Nút Hủy và Lưu */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, marginTop: 2 }}>
        <Button
          variant="outlined"
          onClick={handleCancel}
          sx={{
            color: '#9c27b0',
            borderColor: '#9c27b0',
            textTransform: 'none',
            '&:hover': { backgroundColor: '#f3e5f5', borderColor: '#9c27b0' },
          }}
        >
          Hủy
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            backgroundColor: '#1976d2',
            textTransform: 'none',
            '&:hover': { backgroundColor: '#135ba1' },
          }}
        >
          Lưu
        </Button>
      </Box>

      {/* Thông báo thành công */}
      <Snackbar open={success} autoHideDuration={3000}>
        <Alert severity="success">Mật khẩu đã được thay đổi thành công!</Alert>
      </Snackbar>
    </Paper>
  );
};

export default ChangePasswordForm;
