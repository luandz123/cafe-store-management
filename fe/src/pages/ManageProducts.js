import React, { useState } from 'react';
import { Button, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Search } from '@mui/icons-material';

function ManageProducts() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Sản phẩm 1', description: 'Mô tả sản phẩm 1', price: 100, visible: true, category: 'Điện tử' },
    { id: 2, name: 'Sản phẩm 2', description: 'Mô tả sản phẩm 2', price: 200, visible: false, category: 'Gia dụng' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ name: '', description: '', price: '', visible: true, category: '' });

  const categories = ['Điện tử', 'Gia dụng', 'Thời trang']; // Các loại sản phẩm
  
  // Xử lý tìm kiếm sản phẩm
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Xử lý mở/đóng dialog form thêm/sửa sản phẩm
  const handleOpenDialog = (product) => {
    setCurrentProduct(product || { name: '', description: '', price: '', visible: true, category: 'Điện tử' }); // Default category is "Điện tử"
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveProduct = () => {
    if (currentProduct.id) {
      // Cập nhật sản phẩm
      setProducts(products.map(product => 
        product.id === currentProduct.id ? currentProduct : product
      ));
      setSnackbarMessage('Sửa sản phẩm thành công');
    } else {
      // Thêm mới sản phẩm
      const newProduct = { ...currentProduct, id: products.length + 1 };
      setProducts([...products, newProduct]);
      setSnackbarMessage('Thêm sản phẩm thành công');
    }
    setOpenDialog(false);
    setOpenSnackbar(true);
  };

  // Xử lý xóa sản phẩm
  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
    setSnackbarMessage('Xóa sản phẩm thành công');
    setOpenSnackbar(true);
  };

  // Xử lý ẩn hiện sản phẩm
  const toggleVisibility = (id) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, visible: !product.visible } : product
    ));
  };

  // Đóng snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  

  return (
    <div>
      {/* Phần tìm kiếm */}
      <TextField
        label="Tìm kiếm sản phẩm"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: <Search />
        }}
      />

      {/* Bảng sản phẩm */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Loại sản phẩm</TableCell> {/* Cột Loại sản phẩm */}
              <TableCell>Ẩn Hiện</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map(product => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.category}</TableCell> {/* Hiển thị Loại sản phẩm */}
                <TableCell>
                  <IconButton onClick={() => toggleVisibility(product.id)}>
                    <VisibilityIcon color={product.visible ? "primary" : "disabled"} />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(product)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteProduct(product.id)} sx={{ color: '#9c27b0' }}>
                    <DeleteIcon /> {/* Màu tím cho nút xóa */}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Nút Thêm sản phẩm */}
      <Button variant="contained" onClick={() => handleOpenDialog(null)} sx={{ mt: 2 }}>
        Thêm sản phẩm
      </Button>

      {/* Form Dialog Thêm/Sửa sản phẩm */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{currentProduct.id ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Tên sản phẩm"
            fullWidth
            value={currentProduct.name}
            onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Mô tả"
            fullWidth
            value={currentProduct.description}
            onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Giá"
            type="number"
            fullWidth
            value={currentProduct.price}
            onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
            sx={{ mb: 2 }}
          />

          {/* Menu lựa chọn Loại sản phẩm */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Loại sản phẩm</InputLabel>
            <Select
              value={currentProduct.category}
              onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
              label="Loại sản phẩm"
            >
              {categories.map((category, index) => (
                <MenuItem key={index} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Hủy</Button>
          <Button onClick={handleSaveProduct} color="primary">Lưu</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar thông báo */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ManageProducts;
