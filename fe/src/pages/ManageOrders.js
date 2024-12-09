import React, { useState, useEffect } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Snackbar, Typography } from '@mui/material';
import { jsPDF } from "jspdf"; // Thư viện tạo file PDF
import "jspdf-autotable";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { OrderContext } from '../contexts/OrderContext';
// Đã bỏ import ViewBill
// import ViewBill from './ViewBills';  // Đảm bảo đúng đường dẫn import
import { useOrderContext } from '../contexts/OrderContext';

const ManageOrders = () => {
  // Danh mục sản phẩm và các sản phẩm mẫu
  const products = [
    { id: 1, name: "Sản phẩm 1", price: 100, category: "Điện tử" },
    { id: 2, name: "Sản phẩm 2", price: 200, category: "Gia dụng" },
    { id: 3, name: "Sản phẩm 3", price: 300, category: "Thực phẩm" },
  ];

  const categories = ["Điện tử", "Gia dụng", "Thực phẩm"];

  // State
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isAddEnabled, setIsAddEnabled] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Handle input changes
  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
    calculateTotalAmount(event.target.value);
    validateForm(); // Gọi validateForm sau khi thay đổi sản phẩm
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    validateForm(); // Gọi validateForm sau khi thay đổi danh mục
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
    calculateTotalAmount(selectedProduct, event.target.value);
    validateForm(); // Gọi validateForm sau khi thay đổi số lượng
  };

  const handleCustomerNameChange = (event) => {
    setCustomerName(event.target.value);
    validateForm(); // Gọi validateForm sau khi thay đổi tên khách hàng
  };
  
  const handleCustomerEmailChange = (event) => {
    setCustomerEmail(event.target.value);
    validateForm(); // Gọi validateForm sau khi thay đổi email khách hàng
  };
  
  const handleCustomerPhoneChange = (event) => {
    setCustomerPhone(event.target.value);
    validateForm(); // Gọi validateForm sau khi thay đổi số điện thoại khách hàng
  };
  
  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
    validateForm(); // Gọi validateForm sau khi thay đổi phương thức thanh toán
  };

  const calculateTotalAmount = (productId, qty = quantity) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setTotalAmount(product.price * qty);
    }
  };

  // Add product to order list
  const handleAddOrder = () => {
    if (!selectedProduct || !customerName || !customerEmail || !customerPhone || !paymentMethod) return;

    const product = products.find((p) => p.id === selectedProduct);
    const newOrder = {
      productName: product.name,
      category: product.category,
      price: product.price,
      quantity,
      totalPrice: totalAmount,
      paymentMethod,
      customerName,
      customerEmail,
      customerPhone
    };

    setOrderList([...orderList, newOrder]);
    resetForm();
    setOpenSnackbar(true); // Show success message
  };

  const resetForm = () => {
    setSelectedProduct("");
    setSelectedCategory("");
    setQuantity(1);
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setPaymentMethod("");
    setTotalAmount(0);
    setIsAddEnabled(false);
  };

  // Remove order from the list
  const handleDeleteOrder = (index) => {
    const updatedOrders = orderList.filter((_, i) => i !== index);
    setOrderList(updatedOrders);
  };
  
  // Handle generating PDF invoice
  const generateInvoicePDF = () => {
    const doc = new jsPDF();
  
    // Title
    doc.setFontSize(18);
    doc.text("Hóa đơn đơn hàng", 14, 20);
    
    let yOffset = 30;
  
    // Customer Information
    doc.setFontSize(12);
    doc.text(`Khách hàng: ${orderList[0]?.customerName}`, 14, yOffset);
    yOffset += 10;
    doc.text(`Email: ${orderList[0]?.customerEmail}`, 14, yOffset);
    yOffset += 10;
    doc.text(`Số điện thoại: ${orderList[0]?.customerPhone}`, 14, yOffset);
    yOffset += 10;
    doc.text(`Phương thức thanh toán: ${orderList[0]?.paymentMethod}`, 14, yOffset);
    yOffset += 20;
  
    // Product table headers
    const tableColumn = ["Sản phẩm", "Danh mục", "Số lượng", "Tổng tiền"];
    const tableRows = [];
  
    // Add order details to rows
    orderList.forEach((order) => {
      const orderData = [
        order.productName,
        order.category,
        order.quantity,
        `${order.totalPrice} VNĐ`
      ];
      tableRows.push(orderData);
    });
  
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: yOffset,
      theme: "grid", // Grid style for table
      margin: { top: 20 },
      styles: {
        fontSize: 10,
        cellPadding: 3,
        overflow: "linebreak",
        halign: "center",
        valign: "middle",
        font: "helvetica", // Choose a clear font
      },
      headStyles: {
        fillColor: [33, 150, 243], // Màu xanh cho header
        textColor: [255, 255, 255], // Màu chữ trắng
        fontStyle: "bold", // In đậm
        halign: "center",
        valign: "middle"
      },
      bodyStyles: {
        fillColor: [240, 240, 240], // Màu nền nhạt cho các hàng
        textColor: [0, 0, 0], // Màu chữ đen
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255], // Màu nền trắng cho hàng chẵn
      },
    });
    
    // Save the PDF
    doc.save("invoice.pdf");
  };

  // Handle enabling or disabling "Add to Order" button
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

  // Display order details in a table format
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Quản lý đơn hàng
      </Typography>

      {/* Product Selection and Category Selection */}
      <div style={{ marginBottom: "20px" }}>
        <FormControl fullWidth style={{ marginBottom: "10px" }}>
          <InputLabel>Chọn sản phẩm</InputLabel>
          <Select value={selectedProduct} onChange={handleProductChange}>
            {products
              .filter((p) => p.category === selectedCategory || !selectedCategory)
              .map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        {/* Giá sản phẩm */}
        {selectedProduct && (
          <Typography variant="body1" style={{ marginBottom: "10px" }}>
            Giá: {products.find(p => p.id === selectedProduct)?.price} VNĐ
          </Typography>
        )}

        {/* Category Selection */}
        <FormControl fullWidth style={{ marginBottom: "10px" }}>
          <InputLabel>Loại sản phẩm</InputLabel>
          <Select value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Quantity */}
        <TextField
          label="Số lượng"
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          fullWidth
          style={{ marginBottom: "10px" }}
        />
      </div>

      {/* Customer Details and Payment */}
      <div style={{ marginBottom: "20px" }}>
        <TextField
          label="Tên khách hàng"
          value={customerName}
          onChange={handleCustomerNameChange}
          fullWidth
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Email khách hàng"
          value={customerEmail}
          onChange={handleCustomerEmailChange}
          fullWidth
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Số điện thoại"
          value={customerPhone}
          onChange={handleCustomerPhoneChange}
          fullWidth
          style={{ marginBottom: "10px" }}
        />
        <FormControl fullWidth style={{ marginBottom: "10px" }}>
          <InputLabel>Phương thức thanh toán</InputLabel>
          <Select value={paymentMethod} onChange={handlePaymentChange}>
            <MenuItem value="Thẻ">Thẻ</MenuItem>
            <MenuItem value="Thẻ tín dụng">Thẻ tín dụng</MenuItem>
            <MenuItem value="Thẻ ghi nợ">Thẻ ghi nợ</MenuItem>
          </Select>
        </FormControl>
        <Typography 
          variant="h6" 
          style={{
            backgroundColor: '#9c27b0',  // Màu nền tím
            color: '#fff',  // Màu chữ trắng
            padding: '10px',  // Khoảng cách bên trong
            display: 'flex',  // Để sử dụng Flexbox cho căn chỉnh
            alignItems: 'center',  // Căn giữa theo chiều dọc
            borderRadius: '8px',  // Bo góc 8px
            width: '200px', // Chiều rộng cố định cho thanh
            margin: '0 auto', // Căn giữa thanh trong container
          }}
        >
          Tổng tiền: {totalAmount} VNĐ
        </Typography>
      </div>

      {/* Add Order Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddOrder}
        disabled={!isAddEnabled}
        style={{ marginTop: "20px" }}
      >
        <AddIcon /> Thêm đơn hàng
      </Button>

      {/* Order List Table */}
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
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
            {orderList.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.productName}</TableCell>
                <TableCell>{order.category}</TableCell>
                <TableCell>{order.price} VNĐ</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.totalPrice} VNĐ</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteOrder(index)}>
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
        message="Đơn hàng đã được thêm thành công"
      />

      {/* Generate PDF Button */}
      <Button
        variant="contained"
        color="secondary"
        onClick={generateInvoicePDF}
        style={{ marginTop: "20px" }}
      >
        Tạo hóa đơn PDF
      </Button>
    </div>
  );
};

export default ManageOrders;
