// src/main/java/congtycualuan/example/cafemanagement/controller/BillController.java
package congtycualuan.example.cafemanagement.controller;

import congtycualuan.example.cafemanagement.model.Bill;
import congtycualuan.example.cafemanagement.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bills")
@CrossOrigin
public class BillController {

    @Autowired
    private BillService billService;

    // Get all bills
    @GetMapping("/getAll")
    public ResponseEntity<List<Bill>> getAllBills() {
        List<Bill> bills = billService.getAllBills();
        return ResponseEntity.ok(bills);
    }

    // Create a new bill
    @PostMapping("/add")
    public ResponseEntity<Bill> createBill(@RequestBody Bill bill) {
        Bill createdBill = billService.createBill(bill);
        return ResponseEntity.ok(createdBill);
    }

    // Get bill by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<Bill> getBillById(@PathVariable Integer id) {
        Optional<Bill> billOpt = billService.getBillById(id);
        return billOpt.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete bill by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBillById(@PathVariable Integer id) {
        billService.deleteBillById(id);
        return ResponseEntity.noContent().build();
    }

    // Generate report for a specific bill
    @GetMapping("/generate/{id}")
    public ResponseEntity<byte[]> generateBillReport(@PathVariable Integer id) {
        byte[] report = billService.generateReport(id);
        if (report.length == 0) {
            return ResponseEntity.notFound().build();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "bill_report_" + id + ".pdf");
        headers.setContentLength(report.length);

        return ResponseEntity.ok()
                .headers(headers)
                .body(report);
    }
}