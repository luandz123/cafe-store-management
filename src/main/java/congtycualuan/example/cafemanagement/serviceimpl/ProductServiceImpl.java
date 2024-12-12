// ProductServiceImpl.java
package congtycualuan.example.cafemanagement.serviceimpl;

import congtycualuan.example.cafemanagement.model.Product;
import congtycualuan.example.cafemanagement.repository.ProductRepository;
import congtycualuan.example.cafemanagement.repository.CategoryRepository;
import congtycualuan.example.cafemanagement.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public ResponseEntity<String> createProduct(Product product) {
        try {
            if (product.getCategory() == null || product.getCategory().getId() == null) {
                return new ResponseEntity<>("Category ID is required", HttpStatus.BAD_REQUEST);
            }

            boolean categoryExists = categoryRepository.existsById(product.getCategory().getId());
            if (!categoryExists) {
                return new ResponseEntity<>("Category not found", HttpStatus.NOT_FOUND);
            }

            Product savedProduct = productRepository.save(product);
            return new ResponseEntity<>("Thêm sản phẩm thành công", HttpStatus.CREATED);
        } catch (Exception ex) {
            return new ResponseEntity<>("Thêm sản phẩm thất bại", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> updateProduct(Integer id, Product product) {
        try {
            if (!productRepository.existsById(id)) {
                return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
            }

            if (product.getCategory() == null || product.getCategory().getId() == null) {
                return new ResponseEntity<>("Category ID is required", HttpStatus.BAD_REQUEST);
            }

            boolean categoryExists = categoryRepository.existsById(product.getCategory().getId());
            if (!categoryExists) {
                return new ResponseEntity<>("Category not found", HttpStatus.NOT_FOUND);
            }

            product.setId(id);
            productRepository.save(product);
            return new ResponseEntity<>("Cập nhật sản phẩm thành công", HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>("Cập nhật sản phẩm thất bại", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> deleteProduct(Integer id) {
        try {
            if (!productRepository.existsById(id)) {
                return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
            }
            productRepository.deleteById(id);
            return new ResponseEntity<>("Xóa sản phẩm thành công", HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>("Xóa sản phẩm thất bại", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Product> getProductById(Integer id) {
        return productRepository.findById(id)
                .map(product -> new ResponseEntity<>(product, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Product>> searchProducts(Integer id, String name, Integer categoryId) {
        List<Product> products;
        if (id != null && name != null && categoryId != null) {
            products = productRepository.findByIdAndNameContainingAndCategoryId(id, name, categoryId);
        } else if (name != null && categoryId != null) {
            products = productRepository.findByNameContaining(name);
            products.retainAll(productRepository.findByCategoryId(categoryId));
        } else if (name != null) {
            products = productRepository.findByNameContaining(name);
        } else if (categoryId != null) {
            products = productRepository.findByCategoryId(categoryId);
        } else {
            products = productRepository.findAll();
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @Override
    public long getProductCount() {
        return productRepository.count();
    }
}