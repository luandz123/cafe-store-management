import React from 'react';
import { Typography, Container, Grid, Card, CardContent, CardHeader, Divider, Box, IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import './AdminPage.css';  // Tạo file CSS tùy chỉnh nếu cần

const AdminPage = () => {
  return (
    <Container maxWidth="xl" sx={{ marginTop: 4 }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Trang Quản Lý Admin
      </Typography>
      
      {/* Cards (thống kê tổng quan) */}
      <Grid container spacing={3} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card variant="outlined" sx={{ boxShadow: 3 }}>
            <CardHeader
              title="Tổng Số Người Dùng"
              action={<IconButton><MoreVert /></IconButton>}
              sx={{ backgroundColor: '#F4F6F8' }}
            />
            <CardContent>
              <Typography variant="h5" color="primary">
                1,250
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Số lượng người dùng hiện tại.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card variant="outlined" sx={{ boxShadow: 3 }}>
            <CardHeader
              title="Doanh Thu"
              action={<IconButton><MoreVert /></IconButton>}
              sx={{ backgroundColor: '#F4F6F8' }}
            />
            <CardContent>
              <Typography variant="h5" color="primary">
                $5,620
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Doanh thu trong tháng này.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card variant="outlined" sx={{ boxShadow: 3 }}>
            <CardHeader
              title="Sản Phẩm Mới"
              action={<IconButton><MoreVert /></IconButton>}
              sx={{ backgroundColor: '#F4F6F8' }}
            />
            <CardContent>
              <Typography variant="h5" color="primary">
                80
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Số lượng sản phẩm mới cập nhật.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Divider */}
      <Divider sx={{ marginBottom: 4 }} />

      {/* Nội dung chính */}
      <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 2 }}>
        Danh Sách Người Dùng
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <Typography variant="body1" color="textSecondary">
          Hiển thị tất cả người dùng trong hệ thống.
        </Typography>
        <IconButton>
          <MoreVert />
        </IconButton>
      </Box>

      {/* Danh sách người dùng */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Danh Sách Người Dùng
              </Typography>
              <Divider sx={{ marginY: 2 }} />
              {/* Table hoặc danh sách người dùng */}
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* Mỗi dòng có thể là một người dùng */}
                <Box sx={{ padding: 1, borderBottom: '1px solid #eee' }}>
                  <Typography variant="body2">Người dùng: Nguyễn Văn A</Typography>
                  <Typography variant="body2" color="textSecondary">Email: a@example.com</Typography>
                </Box>
                <Box sx={{ padding: 1, borderBottom: '1px solid #eee' }}>
                  <Typography variant="body2">Người dùng: Trần Thị B</Typography>
                  <Typography variant="body2" color="textSecondary">Email: b@example.com</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminPage;
