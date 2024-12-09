import React, { createContext, useState, useContext } from 'react';

// Khởi tạo Context
const DashboardContext = createContext();

// Tạo provider để chia sẻ dữ liệu
export const DashboardProvider = ({ children }) => {
  const [userCount, setUserCount] = useState(1200);
  const [productCount, setProductCount] = useState(100);
  const [orderCount, setOrderCount] = useState(250);
  const [revenue, setRevenue] = useState(10500);
  const [systemStatus, setSystemStatus] = useState("Online");

  return (
    <DashboardContext.Provider value={{
      userCount, setUserCount,
      productCount, setProductCount,
      orderCount, setOrderCount,
      revenue, setRevenue,
      systemStatus, setSystemStatus
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

// Custom Hook để sử dụng Context
export const useDashboard = () => useContext(DashboardContext);
