// CategoryServiceImpl.java
package congtycualuan.example.cafemanagement.serviceimpl;

import congtycualuan.example.cafemanagement.model.Category;
import congtycualuan.example.cafemanagement.repository.CategoryRepository;
import congtycualuan.example.cafemanagement.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public ResponseEntity<String> addCategory(Category category) {
        try {
            categoryRepository.save(category);
            return new ResponseEntity<>("Thêm danh mục thành công", HttpStatus.CREATED);
        } catch (Exception ex) {
            return new ResponseEntity<>("Thêm danh mục thất bại", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> updateCategory(Integer id, Category category) {
        try {
            if (!categoryRepository.existsById(id)) {
                return new ResponseEntity<>("Danh mục không tồn tại", HttpStatus.NOT_FOUND);
            }
            category.setId(id);
            categoryRepository.save(category);
            return new ResponseEntity<>("Cập nhật danh mục thành công", HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>("Cập nhật danh mục thất bại", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> deleteCategory(Integer id) {
        try {
            if (!categoryRepository.existsById(id)) {
                return new ResponseEntity<>("Danh mục không tồn tại", HttpStatus.NOT_FOUND);
            }
            categoryRepository.deleteById(id);
            return new ResponseEntity<>("Xóa danh mục thành công", HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>("Xóa danh mục thất bại", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<Category>> getAllCategory() {
        List<Category> categories = categoryRepository.findAll();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Category> getCategoryById(Integer id) {
        return categoryRepository.findById(id)
                .map(category -> new ResponseEntity<>(category, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public long getCategoryCount() {
        return categoryRepository.count();
    }
}