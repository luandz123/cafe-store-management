// src/pages/ViewBill.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ViewBill = () => {
  const [bills, setBills] = useState([]);
  const token = localStorage.getItem('authToken');
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/bills/getAll', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Fetched bills:', response.data);
        setBills(response.data);
      } catch (error) {
        console.error('Error fetching bills:', error);
      }
    };

    fetchBills();
  }, []);

  const deleteBill = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/bills/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBills(bills.filter(bill => bill.id !== id));
    } catch (error) {
      console.error('Error deleting bill:', error);
    }
  };

  const generateBill = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/bills/generate/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob' // Important for handling binary data
      });

      // Create a blob from the PDF stream
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = window.URL.createObjectURL(pdfBlob);

      // Create a link to download the PDF
      const downloadLink = document.createElement('a');
      downloadLink.href = pdfUrl;
      downloadLink.setAttribute('download', `bill_${id}.pdf`);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();

      // Open the PDF in a new tab
      window.open(pdfUrl);

      // Revoke the object URL after some time to free up memory
      setTimeout(() => {
        window.URL.revokeObjectURL(pdfUrl);
      }, 1000);
    } catch (error) {
      console.error('Error generating bill:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" gutterBottom>
        Bills
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>UUID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Product Detail</TableCell>
            <TableCell>Created By</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bills.map((bill) => (
            <TableRow key={bill.id}>
              <TableCell>{bill.id}</TableCell>
              <TableCell>{bill.uuid}</TableCell>
              <TableCell>{bill.name}</TableCell>
              <TableCell>{bill.email}</TableCell>
              <TableCell>{bill.phone}</TableCell>
              <TableCell>{bill.paymentMethod}</TableCell>
              <TableCell>{bill.total}</TableCell>
              <TableCell>{bill.productDetail}</TableCell>
              <TableCell>{bill.createdBy}</TableCell>
              <TableCell>
                <IconButton onClick={() => deleteBill(bill.id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => generateBill(bill.id)}>
                  <DownloadIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ViewBill;