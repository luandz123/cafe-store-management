import React, { createContext, useContext, useState } from 'react';

// Tạo context
const OrderContext = createContext();

// Provider cung cấp dữ liệu đơn hàng
export const OrderProvider = ({ children }) => {
  const [orderList, setOrderList] = useState([
    {
      customerName: "Nguyễn Văn A",
      customerEmail: "a@example.com",
      customerPhone: "0123456789",
      paymentMethod: "Thanh toán qua thẻ",
      totalPrice: 500000
    },
    {
      customerName: "Trần Thị B",
      customerEmail: "b@example.com",
      customerPhone: "0987654321",
      paymentMethod: "Thanh toán khi nhận hàng",
      totalPrice: 300000
    }
  ]);

  return (
    <OrderContext.Provider value={{ orderList, setOrderList }}>
      {children}
    </OrderContext.Provider>
  );
};

// Hook để sử dụng context
export const useOrderContext = () => useContext(OrderContext);
