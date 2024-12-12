// ManageProducts.js
import React, { useState, useEffect } from 'react';
import { 
  Button, 
  TextField, 
  IconButton, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Snackbar, 
  Alert, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Search } from '@mui/icons-material';
import { 
  getAllProducts, 
  getCategory, 
  addProduct, 
  updateProduct, 
  deleteProduct 
} from '../service/api';

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: '',
    description: '',
    price: '',
    status: 'Available',
    category: { id: '' }
  });

  // Fetch products and categories on component mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data);
    } catch (error) {
      handleError('Lỗi tải danh sách sản phẩm', error);
    }
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await getCategory();
      setCategories(response.data);
    } catch (error) {
      handleError('Lỗi tải danh sách loại sản phẩm', error);
    }
  };

  // Handle errors
  const handleError = (message, error) => {
    console.error(message, error);
    setSnackbarMessage(message);
    setSnackbarSeverity('error');
    setOpenSnackbar(true);
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open dialog for adding/editing product
  const handleOpenDialog = (product) => {
    setCurrentProduct(product ? { 
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      status: product.status,
      category: { id: product.category.id }
    } : {
      id: null,
      name: '',
      description: '',
      price: '',
      status: 'Available',
      category: { id: '' }
    });
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentProduct({
      id: null,
      name: '',
      description: '',
      price: '',
      status: 'Available',
      category: { id: '' }
    });
  };

  // Save product (add or update)
  const handleSaveProduct = async () => {
    // Validate required fields
    if (!currentProduct.name || !currentProduct.price || !currentProduct.category.id) {
      setSnackbarMessage('Vui lòng điền đầy đủ thông tin bắt buộc');
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
      return;
    }

    try {
      const productData = {
        name: currentProduct.name.trim(),
        description: currentProduct.description?.trim() || '',
        price: parseInt(currentProduct.price, 10),
        status: currentProduct.status,
        category: {
          id: currentProduct.category.id,
        },
      };

      if (currentProduct.id) {
        // Update existing product
        const response = await updateProduct(currentProduct.id, productData);
        setProducts(products.map(product => 
          product.id === currentProduct.id ? response.data : product
        ));
        setSnackbarMessage('Cập nhật sản phẩm thành công');
      } else {
        // Add new product
        const response = await addProduct(productData);
        setProducts([...products, response.data]);
        setSnackbarMessage('Thêm sản phẩm thành công');
      }

      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      handleCloseDialog();
    } catch (error) {
      handleError('Có lỗi xảy ra khi lưu sản phẩm', error);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;

    try {
      await deleteProduct(id);
      setProducts(products.filter(product => product.id !== id));
      setSnackbarMessage('Xóa sản phẩm thành công');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      handleError('Lỗi xóa sản phẩm', error);
    }
  };

  // Toggle product status
  const toggleVisibility = async (product) => {
    try {
      const updatedStatus = product.status === 'Available' ? 'Out of Stock' : 'Available';
      const updatedProduct = { 
        ...product, 
        status: updatedStatus,
        category: { id: product.category.id }
      };
      
      const response = await updateProduct(product.id, updatedProduct);
      setProducts(products.map(p => 
        p.id === product.id ? response.data : p
      ));

      setSnackbarMessage(`Sản phẩm đã ${updatedStatus === 'Available' ? 'hiển thị' : 'ẩn'}`);
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      handleError('Lỗi cập nhật trạng thái sản phẩm', error);
    }
  };

  // Close snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
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
              <TableCell>Trạng thái</TableCell>
              <TableCell>Loại sản phẩm</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map(product => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price.toLocaleString()} VND</TableCell>
                <TableCell>
                  <IconButton onClick={() => toggleVisibility(product)}>
                    <VisibilityIcon color={product.status === 'Available' ? "primary" : "disabled"} />
                  </IconButton>
                  {product.status === 'Available' ? 'Có sẵn' : 'Hết hàng'}
                </TableCell>
                <TableCell>{product.category.name}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(product)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleDeleteProduct(product.id)} 
                    sx={{ color: '#9c27b0' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Không tìm thấy sản phẩm nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Nút Thêm sản phẩm */}
      <Button 
        variant="contained" 
        onClick={() => handleOpenDialog(null)} 
        sx={{ mt: 2 }}
      >
        Thêm sản phẩm
      </Button>

      {/* Form Dialog Thêm/Sửa sản phẩm */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          {currentProduct.id ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Tên sản phẩm"
              value={currentProduct.name}
              onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
              required
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Mô tả"
              value={currentProduct.description}
              onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Giá"
              type="number"
              value={currentProduct.price}
              onChange={(e) =>
                setCurrentProduct({
                  ...currentProduct,
                  price: e.target.value,
                })
              }
              required
              inputProps={{ min: 0 }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="status-label">Trạng thái</InputLabel>
            <Select
              labelId="status-label"
              value={currentProduct.status}
              label="Trạng thái"
              onChange={(e) => setCurrentProduct({ ...currentProduct, status: e.target.value })}
              required
            >
              <MenuItem value="Available">Có sẵn</MenuItem>
              <MenuItem value="Out of Stock">Hết hàng</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="category-label">Loại sản phẩm</InputLabel>
            <Select
              labelId="category-label"
              value={currentProduct.category.id}
              label="Loại sản phẩm"
              onChange={(e) => {
                setCurrentProduct({ 
                  ...currentProduct, 
                  category: { id: e.target.value }
                });
              }}
              required
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
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

export default ManageProducts;