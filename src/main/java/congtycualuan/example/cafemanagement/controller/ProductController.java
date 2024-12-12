// ProductController.java
package congtycualuan.example.cafemanagement.controller;

import congtycualuan.example.cafemanagement.model.Product;
import congtycualuan.example.cafemanagement.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Get all products
    @GetMapping("/getAll")
    public ResponseEntity<List<Product>> getAllProducts() {
        return productService.getAllProducts();
    }

    // Create new product
    @PostMapping("/add")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        ResponseEntity<String> response = productService.createProduct(product);
        if (response.getStatusCode().is2xxSuccessful()) {
            Product savedProduct = productService.getProductById(product.getId()).getBody();
            return ResponseEntity.ok(savedProduct);
        } else {
            return ResponseEntity.status(response.getStatusCode()).build();
        }
    }

    // Update existing product
    @PutMapping("/update/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Integer id, @RequestBody Product product) {
        ResponseEntity<String> response = productService.updateProduct(id, product);
        if (response.getStatusCode().is2xxSuccessful()) {
            Product updatedProduct = productService.getProductById(id).getBody();
            return ResponseEntity.ok(updatedProduct);
        } else {
            return ResponseEntity.status(response.getStatusCode()).build();
        }
    }

    // Delete product
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Integer id) {
        return productService.deleteProduct(id);
    }

    // Get product by ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        return productService.getProductById(id);
    }

    // Search products
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(
            @RequestParam(required = false) Integer id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Integer categoryId) {
        return productService.searchProducts(id, name, categoryId);
    }
}