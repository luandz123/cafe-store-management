// ProductController.java
package congtycualuan.example.cafemanagement.controller;

import congtycualuan.example.cafemanagement.model.Product;
import congtycualuan.example.cafemanagement.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Add a new product (ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<String> createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    // Update a product (ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable Integer id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    // Delete a product (ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Integer id) {
        return productService.deleteProduct(id);
    }

    // Get product by ID (USER, ADMIN)
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        return productService.getProductById(id);
    }

    // Get all products (USER, ADMIN)
    @GetMapping("/getAll")
    public ResponseEntity<List<Product>> getAllProducts() {
        return productService.getAllProducts();
    }

    // Search products by ID, Name, Category ID (USER, ADMIN)
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(
            @RequestParam(required = false) Integer id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Integer categoryId) {
        return productService.searchProducts(id, name, categoryId);
    }
}