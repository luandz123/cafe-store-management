// src/main/java/congtycualuan/example/cafemanagement/service/BillService.java
package congtycualuan.example.cafemanagement.service;

import congtycualuan.example.cafemanagement.model.Bill;


import java.util.List;
import java.util.Optional;


public interface BillService {
    List<Bill> getAllBills();
    Bill createBill(Bill bill);
    Optional<Bill> getBillById(Integer id); // Added method
    void deleteBillById(Integer id);       // Added method
    byte[] generateReport(Integer id);
    long getBillCount(); 
}