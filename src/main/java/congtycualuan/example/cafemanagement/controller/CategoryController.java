// CategoryController.java
package congtycualuan.example.cafemanagement.controller;

import congtycualuan.example.cafemanagement.model.Category;
import congtycualuan.example.cafemanagement.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/category")
@CrossOrigin // Đảm bảo đường dẫn phù hợp với cấu hình bảo mật
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // API thêm danh mục
    @PostMapping("/add")
    public ResponseEntity<String> addCategory(@RequestBody Category category) {
        return categoryService.addCategory(category);
    }

    // API cập nhật danh mục
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateCategory(@PathVariable Integer id, @RequestBody Category category) {
        return categoryService.updateCategory(id, category);
    }

    // API xóa danh mục
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Integer id) {
        return categoryService.deleteCategory(id);
    }

    // API lấy tất cả danh mục
    @GetMapping("/get")
    public ResponseEntity<List<Category>> getAllCategory() {
        return categoryService.getAllCategory();
    }

    // API lấy danh mục theo ID
    @GetMapping("/get/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Integer id) {
        return categoryService.getCategoryById(id);
    }
}