// src/main/java/congtycualuan/example/cafemanagement/controller/DashboardController.java
package congtycualuan.example.cafemanagement.controller;

import congtycualuan.example.cafemanagement.dto.DashboardDTO;
import congtycualuan.example.cafemanagement.service.BillService;
import congtycualuan.example.cafemanagement.service.CategoryService;
import congtycualuan.example.cafemanagement.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin
public class DashboardController {

    @Autowired
    private ProductService productService;

    @Autowired
    private BillService billService;

    @Autowired
    private CategoryService categoryService;

    // Get dashboard data
    @GetMapping("/getAll")
    public ResponseEntity<DashboardDTO> getDashboardData() {
        long productCount = productService.getProductCount();
        long billCount = billService.getBillCount();
        long categoryCount = categoryService.getCategoryCount();

        DashboardDTO dashboard = new DashboardDTO(productCount, billCount, categoryCount);
        return ResponseEntity.ok(dashboard);
    }
}