// CategoryService.java
package congtycualuan.example.cafemanagement.service;

import congtycualuan.example.cafemanagement.model.Category;
import org.springframework.http.ResponseEntity;
import java.util.List;

public interface CategoryService {
    ResponseEntity<String> addCategory(Category category);
    ResponseEntity<String> updateCategory(Integer id, Category category);
    ResponseEntity<String> deleteCategory(Integer id);
    ResponseEntity<List<Category>> getAllCategory();
    ResponseEntity<Category> getCategoryById(Integer id);
    long getCategoryCount();
}