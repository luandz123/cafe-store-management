// src/components/Logo.js
import React from 'react';
import './Logo.css';  // Bạn có thể tạo CSS riêng cho Logo

const Logo = () => {
  return (
    <div className="logo-container">
      <img src="/images/logo.png" alt="Logo" className="logo-image" />
      <h1 className="system-title">Cafe Management System</h1>
    </div>
  );
};

export default Logo;
