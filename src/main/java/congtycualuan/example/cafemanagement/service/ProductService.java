// ProductService.java
package congtycualuan.example.cafemanagement.service;

import congtycualuan.example.cafemanagement.model.Product;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductService {
    ResponseEntity<String> createProduct(Product product);
    ResponseEntity<String> updateProduct(Integer id, Product product);
    ResponseEntity<String> deleteProduct(Integer id);
    ResponseEntity<Product> getProductById(Integer id);
    ResponseEntity<List<Product>> getAllProducts();
    ResponseEntity<List<Product>> searchProducts(Integer id, String name, Integer categoryId);
    long getProductCount();
}