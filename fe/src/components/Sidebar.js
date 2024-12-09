// src/components/Sidebar.js
import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import { Dashboard, Category, Storefront, ShoppingCart, Receipt, People, ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div style={{ width: 250, backgroundColor: '#333', color: '#fff', height: '100vh' }}>
      <List>
        <ListItem button onClick={() => handleNavigation('/admin/dashboard')}>
          <Dashboard />
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => handleNavigation('/admin/manage-categories')}>
          <Category />
          <ListItemText primary="Manage Categories" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => handleNavigation('/admin/manage-products')}>
          <Storefront />
          <ListItemText primary="Manage Products" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => handleNavigation('/admin/manage-orders')}>
          <ShoppingCart />
          <ListItemText primary="Manage Orders" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => handleNavigation('/admin/view-bills')}>
          <Receipt />
          <ListItemText primary="View Bills" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => handleNavigation('/admin/manage-users')}>
          <People />
          <ListItemText primary="Manage Users" />
        </ListItem>
        <Divider />
        <ListItem button onClick={onLogout}>
          <ExitToApp />
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
