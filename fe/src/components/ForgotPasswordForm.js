import React from 'react';
import { TextField, Button } from '@mui/material';

const ForgotPasswordForm = ({ email, setEmail, handleForgotPassword, setShowForgotPasswordForm }) => {
  return (
    <form>
      <TextField
        label="Email"
        fullWidth
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <Button fullWidth variant="contained" color="primary" onClick={handleForgotPassword} sx={{ marginTop: 2 }}>
        Gửi mật khẩu
      </Button>
      <Button fullWidth variant="text" sx={{ marginTop: 2 }} onClick={() => setShowForgotPasswordForm(false)}>
        Quay lại
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
