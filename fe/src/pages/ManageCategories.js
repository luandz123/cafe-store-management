// ManageCategories.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  IconButton,
  CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const token = localStorage.getItem('authToken'); // Lấy token từ localStorage
    if (!token) {
      handleError('Không tìm thấy token xác thực. Vui lòng đăng nhập lại.', null);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:8080/api/category/getAll', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
      setFilteredCategories(response.data);
    } catch (error) {
      handleError('Không thể tải danh mục', error);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (message, error) => {
    console.error(message, error);
    setSnackbarMessage(message);
    setSnackbarSeverity('error');
    setOpenSnackbar(true);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setFilteredCategories(
      query 
        ? categories.filter(category =>
            category.name.toLowerCase().includes(query.toLowerCase())
          )
        : categories
    );
  };

  const handleOpenDialog = () => {
    setEditingCategory(null);
    setCategoryName('');
    setOpenDialog(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingCategory(null);
    setCategoryName('');
  };

  const handleSaveCategory = async () => {
    if (!categoryName.trim()) {
      handleError('Tên danh mục không được để trống', null);
      return;
    }

    const token = localStorage.getItem('authToken'); // Lấy token từ localStorage
    if (!token) {
      handleError('Không tìm thấy token xác thực. Vui lòng đăng nhập lại.', null);
      return;
    }

    try {
      if (editingCategory) {
        // Cập nhật danh mục
        const response = await axios.put(`http://localhost:8080/api/category/update/${editingCategory.id}`, { name: categoryName }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Update Response:', response);
        setSnackbarMessage('Cập nhật danh mục thành công');
      } else {
        // Thêm danh mục mới
        const response = await axios.post('http://localhost:8080/api/category/add', { name: categoryName }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Add Response:', response);
        setSnackbarMessage('Thêm danh mục thành công');
      }
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      fetchCategories(); // Tải lại danh mục
      handleCloseDialog();
    } catch (error) {
      console.error('Save Category Error:', error);
      handleError(editingCategory ? 'Cập nhật danh mục thất bại' : 'Thêm danh mục thất bại', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa danh mục này?')) return;

    const token = localStorage.getItem('authToken'); // Lấy token từ localStorage
    if (!token) {
      handleError('Không tìm thấy token xác thực. Vui lòng đăng nhập lại.', null);
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/category/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSnackbarMessage('Xóa danh mục thành công');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      fetchCategories(); // Tải lại danh mục
    } catch (error) {
      console.error('Delete Category Error:', error);
      handleError('Xóa danh mục thất bại', error);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Quản lý Danh mục</h2>
      <TextField
        label="Tìm kiếm danh mục"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Thêm Danh mục
      </Button>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </div>
      ) : (
        <TableContainer style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên Danh mục</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCategories.map(category => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditCategory(category)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteCategory(category.id)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredCategories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    Không tìm thấy danh mục nào.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{editingCategory ? 'Sửa Danh mục' : 'Thêm Danh mục'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Tên Danh mục"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Hủy</Button>
          <Button onClick={handleSaveCategory} color="primary">Lưu</Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ManageCategories;