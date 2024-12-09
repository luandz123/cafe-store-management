import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, IconButton, Box, Paper } from '@mui/material';
import { ArrowUpward, ShoppingCart, TrendingUp, Dashboard as DashboardIcon } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  // Khai báo các state cho các chỉ số
  const [productCount, setProductCount] = useState(300); // Tổng số sản phẩm
  const [orderCount, setOrderCount] = useState(1200); // Tổng số đơn hàng
  const [dailyRevenue, setDailyRevenue] = useState(2000); // Doanh thu trong ngày
  const [weeklyRevenue, setWeeklyRevenue] = useState(14000); // Doanh thu trong tuần
  const [monthlyRevenue, setMonthlyRevenue] = useState(50000); // Doanh thu trong tháng
  const [customerCount, setCustomerCount] = useState(1500); // Số lượng khách hàng
  const [lowStock, setLowStock] = useState([ // Tình trạng tồn kho (sản phẩm sắp hết hàng)
    { name: 'Sản phẩm A', stock: 5 },
    { name: 'Sản phẩm B', stock: 3 },
    { name: 'Sản phẩm C', stock: 10 },
  ]);

  // Dữ liệu biểu đồ Doanh thu theo thời gian (Ngày)
  const revenueData = [
    { date: '2024-12-01', revenue: 1200 },
    { date: '2024-12-02', revenue: 1500 },
    { date: '2024-12-03', revenue: 1700 },
    { date: '2024-12-04', revenue: 2000 },
    { date: '2024-12-05', revenue: 1800 },
    { date: '2024-12-06', revenue: 2200 },
    { date: '2024-12-07', revenue: 2400 },
  ];

  return (
    <Box sx={{ padding: '20px' }}>
      {/* Tạo một Paper bao quanh để làm nền cho dashboard */}
      <Paper sx={{ padding: '20px' }} elevation={3}>
        <Grid container spacing={3}>
          {/* Card 1 - Tổng số sản phẩm */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', borderRadius: '10px' }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Tổng số sản phẩm
                </Typography>
                <Typography variant="h4" color="primary">
                  {productCount}
                </Typography>
                <IconButton color="primary">
                  <ShoppingCart />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 2 - Tổng số đơn hàng */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', borderRadius: '10px' }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Tổng số đơn hàng
                </Typography>
                <Typography variant="h4" color="primary">
                  {orderCount}
                </Typography>
                <IconButton color="primary">
                  <TrendingUp />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 3 - Doanh thu */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', borderRadius: '10px' }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Doanh thu trong ngày
                </Typography>
                <Typography variant="h4" color="primary">
                  ${dailyRevenue}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  Doanh thu trong tuần
                </Typography>
                <Typography variant="h4" color="primary">
                  ${weeklyRevenue}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  Doanh thu trong tháng
                </Typography>
                <Typography variant="h4" color="primary">
                  ${monthlyRevenue}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 4 - Số lượng khách hàng */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', borderRadius: '10px' }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Số lượng khách hàng
                </Typography>
                <Typography variant="h4" color="primary">
                  {customerCount}
                </Typography>
                <IconButton color="primary">
                  <DashboardIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>

          {/* Biểu đồ doanh thu theo thời gian */}
          <Grid item xs={12}>
            <Card sx={{ padding: '20px', borderRadius: '10px' }}>
              <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
                Doanh thu theo thời gian
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          {/* Tình trạng tồn kho - Sản phẩm sắp hết hàng */}
          <Grid item xs={12}>
            <Card sx={{ padding: '20px', borderRadius: '10px' }}>
              <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
                Tình trạng tồn kho
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {lowStock.map((product, index) => (
                  <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" color="textSecondary">
                      {product.name}
                    </Typography>
                    <Typography variant="body1" color="error">
                      {product.stock} còn lại
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Dashboard;
