import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, InputAdornment, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; // Biểu tượng chỉnh sửa
import SearchIcon from '@mui/icons-material/Search'; // Biểu tượng tìm kiếm
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '20px',
    backgroundColor: '#f7f7f7',
    borderRadius: '10px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#3f51b5',
    marginBottom: '20px',
  },
  tableContainer: {
    marginTop: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  table: {
    minWidth: 650,
  },
  searchField: {
    marginBottom: '20px',
    '& .MuiInputBase-root': {
      borderRadius: '8px',
      backgroundColor: '#fff',
    },
  },
  actionButton: {
    backgroundColor: '#3f51b5',
    color: '#fff',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#303f9f',
    },
  },
  dialog: {
    minWidth: '400px',
  },
  dialogInput: {
    marginBottom: '15px',
    '& .MuiInputBase-root': {
      borderRadius: '8px',
      backgroundColor: '#f5f5f5',
    },
  },
  selectInput: {
    marginBottom: '15px',
    '& .MuiInputBase-root': {
      borderRadius: '8px',
      backgroundColor: '#f5f5f5',
    },
  },
  saveButton: {
    backgroundColor: '#4caf50',
    color: '#fff',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#388e3c',
    },
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#d32f2f',
    },
  },
}));

const ManageProducts = () => {
  const classes = useStyles();
  
  // Dữ liệu mẫu sản phẩm
  const [products, setProducts] = useState([
    { id: 1, name: 'Sản phẩm 1', category: 'Điện tử' },
    { id: 2, name: 'Sản phẩm 2', category: 'Gia dụng' }
  ]);

  const [searchQuery, setSearchQuery] = useState(''); // Lưu trữ từ khóa tìm kiếm
  const [filteredProducts, setFilteredProducts] = useState(products); // Lưu trữ sản phẩm đã lọc
  const [openDialog, setOpenDialog] = useState(false); // Điều khiển Dialog thêm sản phẩm
  const [newProductName, setNewProductName] = useState(''); // Tên sản phẩm mới
  const [newProductCategory, setNewProductCategory] = useState('Điện tử'); // Loại sản phẩm
  const [editingProduct, setEditingProduct] = useState(null); // Lưu sản phẩm đang chỉnh sửa

  const categories = ['Điện tử', 'Gia dụng', 'Thực phẩm']; // Danh sách loại sản phẩm

  // Hàm tìm kiếm sản phẩm khi người dùng nhập
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    
    if (query === '') {
      setFilteredProducts(products); // Nếu không có từ khóa tìm kiếm, hiển thị tất cả sản phẩm
    } else {
      // Lọc sản phẩm theo tên
      setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(query.toLowerCase())));
    }
  };

  // Mở Dialog để thêm sản phẩm
  const handleOpenDialog = () => {
    setEditingProduct(null); // Đặt lại trạng thái cho sản phẩm mới
    setNewProductName(''); // Reset tên sản phẩm
    setNewProductCategory('Điện tử'); // Reset loại sản phẩm
    setOpenDialog(true);
  };

  // Mở Dialog để chỉnh sửa sản phẩm
  const handleEditProduct = (product) => {
    setEditingProduct(product); // Lưu sản phẩm cần chỉnh sửa
    setNewProductName(product.name); // Điền tên sản phẩm vào form chỉnh sửa
    setNewProductCategory(product.category); // Điền loại sản phẩm vào form chỉnh sửa
    setOpenDialog(true); // Mở dialog
  };

  // Đóng Dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Lưu sản phẩm mới hoặc cập nhật sản phẩm đang chỉnh sửa
  const handleSaveProduct = () => {
    if (newProductName.trim()) {
      if (editingProduct) {
        // Cập nhật sản phẩm đang chỉnh sửa
        setProducts(products.map(product => 
          product.id === editingProduct.id ? { ...product, name: newProductName, category: newProductCategory } : product
        ));
        setFilteredProducts(filteredProducts.map(product => 
          product.id === editingProduct.id ? { ...product, name: newProductName, category: newProductCategory } : product
        ));
      } else {
        // Thêm sản phẩm mới
        const newProduct = { id: products.length + 1, name: newProductName, category: newProductCategory };
        setProducts([...products, newProduct]); // Thêm sản phẩm vào danh sách
        setFilteredProducts([...products, newProduct]); // Cập nhật danh sách lọc
      }
      
      setNewProductName(''); // Reset tên sản phẩm
      setNewProductCategory('Điện tử'); // Reset loại sản phẩm
      setOpenDialog(false); // Đóng Dialog sau khi lưu
    }
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Quản lý danh mục sản phẩm</h2>

      {/* Thanh tìm kiếm */}
      <TextField
        label="Tìm kiếm sản phẩm"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        className={classes.searchField}
      />

      {/* Bảng hiển thị danh sách sản phẩm */}
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Tên sản phẩm</strong></TableCell>
              <TableCell><strong>Loại sản phẩm</strong></TableCell>
              <TableCell><strong>Hành động</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  {/* Nút chỉnh sửa */}
                  <IconButton onClick={() => handleEditProduct(product)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Nút Thêm sản phẩm */}
      <Button variant="contained" className={classes.actionButton} onClick={handleOpenDialog}>
        Thêm sản phẩm
      </Button>

      {/* Dialog để thêm hoặc chỉnh sửa sản phẩm */}
      <Dialog open={openDialog} onClose={handleCloseDialog} className={classes.dialog}>
        <DialogTitle>{editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên sản phẩm"
            type="text"
            fullWidth
            variant="standard"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            className={classes.dialogInput}
          />

          <FormControl fullWidth variant="standard" className={classes.selectInput}>
            <InputLabel>Loại sản phẩm</InputLabel>
            <Select
              value={newProductCategory}
              onChange={(e) => setNewProductCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <MenuItem key={index} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} className={classes.cancelButton}>
            Hủy
          </Button>
          <Button onClick={handleSaveProduct} className={classes.saveButton}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageProducts;
