import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close'; // Thêm biểu tượng dấu nhân
import { jsPDF } from 'jspdf';
import { useLocation, } from 'react-router-dom';  // Import useLocation


const ViewBill = () => {
  const location = useLocation();  // Lấy thông tin từ useLocation
  const order = location.state?.order;  // Nhận đơn hàng từ state truyền qua

  const [openDialog, setOpenDialog] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(order);

  // Hàm tải hóa đơn PDF
  const handleDownloadBill = (order) => {
    const doc = new jsPDF();
    doc.text("Hóa đơn đơn hàng", 14, 20);
    let yOffset = 30;

    const tableColumn = ["Email", "Số điện thoại", "Phương thức thanh toán", "Tổng tiền"];
    const tableRows = [
      [order.customerEmail, order.customerPhone, order.paymentMethod, `${order.totalPrice} VNĐ`],
    ];

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: yOffset,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 2, halign: "center" },
      headStyles: { fillColor: [240, 240, 240] },
    });

    doc.save(`invoice_${order.customerEmail}.pdf`);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentOrder(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>Thông tin hóa đơn</Typography>

      {/* Hiển thị thông tin hóa đơn */}
      {currentOrder ? (
        <div>
          <Typography variant="h6">Thông tin khách hàng</Typography>
          <TextField
            label="Tên khách hàng"
            value={currentOrder.customerName}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Email"
            value={currentOrder.customerEmail}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Số điện thoại"
            value={currentOrder.customerPhone}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Phương thức thanh toán"
            value={currentOrder.paymentMethod}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Tổng tiền"
            value={`${currentOrder.totalPrice} VNĐ`}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
          <Typography variant="h6" style={{ marginTop: '20px' }}>Chi tiết sản phẩm</Typography>
          {currentOrder.items && currentOrder.items.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên loại</TableCell>
                  <TableCell>Giá</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Tổng tiền</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentOrder.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.price} VNĐ</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.totalPrice} VNĐ</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              Không có sản phẩm trong đơn hàng.
            </Typography>
          )}
        </div>
      ) : (
        <Typography variant="body1">Không có thông tin hóa đơn.</Typography>
      )}

      {/* Dialog Xem Chi Tiết Hóa Đơn */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle
          style={{
            backgroundColor: '#6a1b9a',  // Màu tím
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: '10px'
          }}
        >
          Chi tiết hóa đơn
          <IconButton onClick={handleCloseDialog} style={{ color: 'white' }}>
            <CloseIcon /> {/* Dấu nhân */}
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {currentOrder && (
            <div>
              <Typography variant="h6">Thông tin khách hàng</Typography>
              <TextField
                label="Tên khách hàng"
                value={currentOrder.customerName}
                fullWidth
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label="Email"
                value={currentOrder.customerEmail}
                fullWidth
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label="Số điện thoại"
                value={currentOrder.customerPhone}
                fullWidth
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label="Phương thức thanh toán"
                value={currentOrder.paymentMethod}
                fullWidth
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label="Tổng tiền"
                value={`${currentOrder.totalPrice} VNĐ`}
                fullWidth
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
              <Typography variant="h6" style={{ marginTop: '20px' }}>Chi tiết sản phẩm</Typography>
              {currentOrder.items && currentOrder.items.length > 0 ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Tên loại</TableCell>
                      <TableCell>Giá</TableCell>
                      <TableCell>Số lượng</TableCell>
                      <TableCell>Tổng tiền</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentOrder.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.price} VNĐ</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.totalPrice} VNĐ</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography variant="body1" style={{ marginTop: '10px' }}>
                  Không có sản phẩm trong đơn hàng.
                </Typography>
              )}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleCloseDialog} color="secondary">
            Đóng
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewBill;
