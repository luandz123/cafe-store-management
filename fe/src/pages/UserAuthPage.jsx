import React, { useState } from 'react';
import { Container, Typography, Button, Box, Card, CardContent } from '@mui/material';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

const UserAuthPage = ({ onLogin }) => {
  const [currentForm, setCurrentForm] = useState('login'); // Trạng thái để chuyển form

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      {/* Navbar đơn giản */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ backgroundColor: '#7b1fa2', padding: 2, borderRadius: 1 }}
      >
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
          Cafe Management System
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => setCurrentForm('login')} sx={{ color: 'white' }}>
            Login
          </Button>
          <Button color="inherit" onClick={() => setCurrentForm('signup')} sx={{ color: 'white' }}>
            Signup
          </Button>
          <Button color="inherit" onClick={() => setCurrentForm('forgot')} sx={{ color: 'white' }}>
            Forgot Password?
          </Button>
        </Box>
      </Box>

      {/* Hiển thị Form tương ứng */}
      <Card sx={{ marginTop: 4 }}>
        <CardContent>
          {currentForm === 'login' && <LoginForm handleLogin={onLogin} />}
          {currentForm === 'signup' && <SignUpForm />}
          {currentForm === 'forgot' && <ForgotPasswordForm />}
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserAuthPage;
