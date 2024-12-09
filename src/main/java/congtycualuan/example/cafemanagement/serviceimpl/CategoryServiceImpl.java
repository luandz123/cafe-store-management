// CategoryServiceImpl.java
package congtycualuan.example.cafemanagement.serviceimpl;

import congtycualuan.example.cafemanagement.repository.CategoryRepository;
import congtycualuan.example.cafemanagement.model.Category;
import congtycualuan.example.cafemanagement.service.CategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public ResponseEntity<String> addCategory(Category category) {
        try {
            categoryRepository.save(category);
            return new ResponseEntity<>("Thêm danh mục thành công", HttpStatus.OK);
        } catch (Exception ex) {
            log.error("Lỗi khi thêm danh mục: {}", ex.getMessage());
            return new ResponseEntity<>("Thêm danh mục thất bại", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> updateCategory(Integer id, Category category) {
        try {
            Optional<Category> optionalCategory = categoryRepository.findById(id);
            if (optionalCategory.isPresent()) {
                Category existingCategory = optionalCategory.get();
                existingCategory.setName(category.getName());
                categoryRepository.save(existingCategory);
                return new ResponseEntity<>("Cập nhật danh mục thành công", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Danh mục không tồn tại", HttpStatus.NOT_FOUND);
            }
        } catch (Exception ex) {
            log.error("Lỗi khi cập nhật danh mục: {}", ex.getMessage());
            return new ResponseEntity<>("Cập nhật danh mục thất bại", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> deleteCategory(Integer id) {
        try {
            if (categoryRepository.existsById(id)) {
                categoryRepository.deleteById(id);
                return new ResponseEntity<>("Xóa danh mục thành công", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Danh mục không tồn tại", HttpStatus.NOT_FOUND);
            }
        } catch (Exception ex) {
            log.error("Lỗi khi xóa danh mục: {}", ex.getMessage());
            return new ResponseEntity<>("Xóa danh mục thất bại", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

        @Override
    public ResponseEntity<List<Category>> getAllCategory() {
        try {
            List<Category> categories = categoryRepository.findAll();
            if (categories.isEmpty()) {
                return new ResponseEntity<>(categories, HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(categories, HttpStatus.OK);
        } catch (Exception ex) {
            log.error("Error fetching all categories", ex);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Category> getCategoryById(Integer id) {
        try {
            Optional<Category> category = categoryRepository.findById(id);
            return category.map(value ->
                    new ResponseEntity<>(value, HttpStatus.OK))
                    .orElseGet(() ->
                            new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
        } catch (Exception ex) {
            log.error("Lỗi khi lấy danh mục theo ID: {}", ex.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public long getCategoryCount() {
        return categoryRepository.count();
    }
}