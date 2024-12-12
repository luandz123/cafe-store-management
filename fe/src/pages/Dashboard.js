import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, IconButton, Box, Paper } from '@mui/material';
import { ShoppingCart, TrendingUp, Category } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAllProducts, getCategory, getAllBills } from '../service/api'; // Import the new getAllBills function

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [billCount, setBillCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [lowStock, setLowStock] = useState([]); // Define lowStock state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [productsResponse, billsResponse, categoriesResponse] = await Promise.all([
          getAllProducts(),
          getAllBills(),
          getCategory()
        ]);
        setProductCount(productsResponse.data.length);
        setBillCount(billsResponse.data.length);
        setCategoryCount(categoriesResponse.data.length);

        // Define low stock threshold
        const lowStockThreshold = 5;
        // Filter products with stock less than threshold
        const lowStockProducts = productsResponse.data.filter(product => product.stock < lowStockThreshold);
        setLowStock(lowStockProducts);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };

    fetchCounts();
  }, []);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  // Sample revenue data
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

          {/* Card 2 - Tổng số hóa đơn */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', borderRadius: '10px' }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Tổng số hóa đơn
                </Typography>
                <Typography variant="h4" color="primary">
                  {billCount}
                </Typography>
                <IconButton color="primary">
                  <TrendingUp />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 3 - Tổng số danh mục */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', borderRadius: '10px' }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Tổng số danh mục
                </Typography>
                <Typography variant="h4" color="primary">
                  {categoryCount}
                </Typography>
                <IconButton color="primary">
                  <Category />
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
                {lowStock.length > 0 ? (
                  lowStock.map((product, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1" color="textSecondary">
                        {product.name}
                      </Typography>
                      <Typography variant="body1" color="error">
                        {product.stock} còn lại
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body1" color="textSecondary">
                    Không có sản phẩm nào sắp hết hàng.
                  </Typography>
                )}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Dashboard;