// src/pages/ManageOrders.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Button, TextField, Select, MenuItem, FormControl, InputLabel, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, Snackbar, Typography, CircularProgress, Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';

const ManageOrders = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isAddEnabled, setIsAddEnabled] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('authToken');

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/api/products/getAll');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setSnackbarMessage('Không thể tải sản phẩm');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/api/category/getAll');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setSnackbarMessage('Không thể tải danh mục');
      setOpenSnackbar(true);
    }
  };

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value ? Number(event.target.value) : "";
    setSelectedCategory(categoryId);

    if (categoryId) {
      const filtered = products.filter(p => p.category.id === categoryId && p.status === "Available");
      setFilteredProducts(filtered);
      setSelectedProduct("");
      setTotalAmount(0);
    } else {
      const availableProducts = products.filter(p => p.status === "Available");
      setFilteredProducts(availableProducts);
    }
    validateForm();
  };

  const handleProductChange = (event) => {
    const productId = event.target.value ? Number(event.target.value) : "";
    setSelectedProduct(productId);
    calculateTotalAmount(productId, quantity);
    validateForm();
  };

  const handleQuantityChange = (event) => {
    const qty = parseInt(event.target.value, 10);
    setQuantity(qty);
    calculateTotalAmount(selectedProduct, qty);
    validateForm();
  };

  const calculateTotalAmount = (productId, qty = quantity) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      const updatedTotal = product.price * qty;
      setTotalAmount(updatedTotal);
    } else {
      setTotalAmount(0);
    }
  };

  const handleCustomerNameChange = (event) => {
    setCustomerName(event.target.value);
    validateForm();
  };

  const handleCustomerEmailChange = (event) => {
    setCustomerEmail(event.target.value);
    validateForm();
  };

  const handleCustomerPhoneChange = (event) => {
    setCustomerPhone(event.target.value);
    validateForm();
  };

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
    validateForm();
  };

  const validateForm = () => {
    if (
      selectedProduct &&
      customerName &&
      customerEmail &&
      customerPhone &&
      paymentMethod &&
      quantity > 0
    ) {
      setIsAddEnabled(true);
    } else {
      setIsAddEnabled(false);
    }
  };

  const handleAddOrder = () => {
    if (!selectedProduct) return;

    const product = products.find((p) => p.id === selectedProduct);
    if (!product) {
      setSnackbarMessage('Sản phẩm không hợp lệ');
      setOpenSnackbar(true);
      return;
    }

    const existingOrder = orderList.find(order => order.productId === selectedProduct);
    if (existingOrder) {
      setSnackbarMessage('Sản phẩm đã được thêm vào đơn hàng');
      setOpenSnackbar(true);
      return;
    }

    const newOrder = {
      productId: product.id,
      productName: product.name,
      category: product.category || { name: 'N/A' },
      price: product.price,
      quantity,
      totalPrice: product.price * quantity
    };

    setOrderList([...orderList, newOrder]);
    setSelectedProduct("");
    setQuantity(1);
    setTotalAmount(0);
    setIsAddEnabled(false);
    setSnackbarMessage('Sản phẩm đã được thêm vào đơn hàng');
    setOpenSnackbar(true);
  };

  const handleDeleteOrder = (productId) => {
    const updatedOrders = orderList.filter((order) => order.productId !== productId);
    setOrderList(updatedOrders);
  };

  const handleSubmitBill = async () => {
    if (orderList.length === 0) {
      setSnackbarMessage('Chưa có sản phẩm trong đơn hàng');
      setOpenSnackbar(true);
      return;
    }

    const productDetails = orderList.map(order => ({
      productId: order.productId,
      productName: order.productName,
      category: order.category.name,
      price: order.price,
      quantity: order.quantity,
      totalPrice: order.totalPrice
    }));

    const newBill = {
      uuid: uuidv4(),
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      paymentMethod,
      total: orderList.reduce((acc, curr) => acc + curr.totalPrice, 0).toString(),
      productDetail: JSON.stringify(productDetails),
      createdBy: "admin"
    };

    try {
      await axiosInstance.post('/api/bills/add', newBill);
      setOrderList([]);
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
      setPaymentMethod('');
      setSnackbarMessage('Hóa đơn đã được tạo thành công');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error creating bill:', error);
      setSnackbarMessage('Tạo hóa đơn thất bại');
      setOpenSnackbar(true);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Quản lý đơn hàng
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Thông tin khách hàng */}
          <div style={{ marginBottom: "20px" }}>
            <TextField
              label="Tên khách hàng"
              value={customerName}
              onChange={handleCustomerNameChange}
              fullWidth
              style={{ marginBottom: "10px" }}
              required
            />
            <TextField
              label="Email khách hàng"
              value={customerEmail}
              onChange={handleCustomerEmailChange}
              fullWidth
              style={{ marginBottom: "10px" }}
              required
              type="email"
            />
            <TextField
              label="Số điện thoại"
              value={customerPhone}
              onChange={handleCustomerPhoneChange}
              fullWidth
              style={{ marginBottom: "10px" }}
              required
              type="tel"
            />

            {/* Payment Method */}
            <FormControl fullWidth style={{ marginBottom: "10px" }}>
              <InputLabel>Phương thức thanh toán</InputLabel>
              <Select value={paymentMethod} onChange={handlePaymentChange}>
                <MenuItem value="Thẻ">Thẻ</MenuItem>
                <MenuItem value="Thẻ tín dụng">Thẻ tín dụng</MenuItem>
                <MenuItem value="Thẻ ghi nợ">Thẻ ghi nợ</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Order Creation Form */}
          <div style={{ marginBottom: "20px" }}>
            {/* Category Selection */}
            <FormControl fullWidth style={{ marginBottom: "10px" }}>
              <InputLabel>Loại sản phẩm</InputLabel>
              <Select value={selectedCategory} onChange={handleCategoryChange}>
                <MenuItem value="">
                  <em>Tất cả</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Product Selection */}
            <FormControl fullWidth style={{ marginBottom: "10px" }}>
              <InputLabel>Chọn sản phẩm</InputLabel>
              <Select value={selectedProduct} onChange={handleProductChange}>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                      {product.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="">
                    <em>Không có sản phẩm</em>
                  </MenuItem>
                )}
              </Select>
            </FormControl>

            {/* Giá sản phẩm */}
            {selectedProduct && (
              <Typography variant="body1" style={{ marginBottom: "10px" }}>
                Giá: {products.find(p => p.id === selectedProduct)?.price.toLocaleString()} VNĐ
              </Typography>
            )}

            {/* Quantity */}
            <TextField
              label="Số lượng"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              fullWidth
              style={{ marginBottom: "10px" }}
              inputProps={{ min: 1 }}
            />

            {/* Tổng tiền */}
            <Typography 
              variant="h6" 
              style={{
                backgroundColor: '#9c27b0',
                color: '#fff',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '8px',
                width: '200px',
                margin: '0 auto',
                marginTop: '10px'
              }}
            >
              Tổng tiền: {totalAmount.toLocaleString()} VNĐ
            </Typography>

            {/* Add Order Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddOrder}
              disabled={!isAddEnabled}
              style={{ marginTop: "20px" }}
              startIcon={<AddIcon />}
            >
              Thêm sản phẩm
            </Button>
          </div>

          {/* Current Order List */}
          {orderList.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <Typography variant="h6" gutterBottom>
                Danh sách sản phẩm trong đơn hàng
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Sản phẩm</TableCell>
                      <TableCell>Danh mục</TableCell>
                      <TableCell>Giá</TableCell>
                      <TableCell>Số lượng</TableCell>
                      <TableCell>Tổng tiền</TableCell>
                      <TableCell>Xóa</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderList.map((order) => (
                      <TableRow key={order.productId}>
                        <TableCell>{order.productName}</TableCell>
                        <TableCell>{order.category.name}</TableCell>
                        <TableCell>{order.price.toLocaleString()} VNĐ</TableCell>
                        <TableCell>{order.quantity}</TableCell>
                        <TableCell>{order.totalPrice.toLocaleString()} VNĐ</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleDeleteOrder(order.productId)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={4} align="right"><strong>Tổng cộng:</strong></TableCell>
                      <TableCell colSpan={2}><strong>{orderList.reduce((acc, curr) => acc + curr.totalPrice, 0).toLocaleString()} VNĐ</strong></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Submit Bill Button */}
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmitBill}
                style={{ marginTop: "10px" }}
              >
                Tạo hóa đơn
              </Button>
            </div>
          )}

          {/* Snackbar thông báo */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
            message={snackbarMessage}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          />
        </>
      )}
    </div>
  );
};

export default ManageOrders;