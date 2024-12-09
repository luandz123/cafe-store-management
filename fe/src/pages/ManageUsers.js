import React, { useState } from 'react';
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Snackbar,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';

// Giả sử danh sách người dùng như sau
const usersData = [
  { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com", phone: "0123456789", role: "Admin" },
  { id: 2, name: "Trần Thị B", email: "b@gmail.com", phone: "0123456789", role: "User" },
  { id: 3, name: "Lê Minh C", email: "c@gmail.com", phone: "0123456789", role: "User" },
  // Thêm nhiều người dùng ở đây
];

const ManageUsers = () => {
  const [users, setUsers] = useState(usersData);
  const [filteredUsers, setFilteredUsers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Hàm xử lý thay đổi tìm kiếm
  const handleSearchChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    if (term === '') {
      setFilteredUsers(users); // Hiển thị toàn bộ khi không có từ khóa tìm kiếm
    } else {
      const filtered = users.filter((user) => 
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.phone.includes(term) ||
        user.role.toLowerCase().includes(term)
      );
      setFilteredUsers(filtered);
    }
  };

  // Hàm xóa người dùng
  const handleDeleteUser = (id) => {
    const updatedUsers = filteredUsers.filter((user) => user.id !== id);
    setFilteredUsers(updatedUsers);
    setOpenSnackbar(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Quản lý người dùng
      </Typography>

      {/* Tìm kiếm */}
      <TextField
        label="Tìm kiếm người dùng"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: "20px" }}
        InputProps={{
          endAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />

      {/* Bảng danh sách người dùng */}
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Xóa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {/* Nút xóa màu tím */}
                  <IconButton
                    onClick={() => handleDeleteUser(user.id)}
                    style={{ color: '#9c27b0' }}  // Màu tím
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar thông báo */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Người dùng đã được xóa"
      />
    </div>
  );
};

export default ManageUsers;
