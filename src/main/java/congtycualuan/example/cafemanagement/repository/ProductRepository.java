// ProductRepository.java
package congtycualuan.example.cafemanagement.repository;

import congtycualuan.example.cafemanagement.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByNameContaining(String name);
    List<Product> findByCategoryId(Integer categoryId);
    List<Product> findByIdAndNameContainingAndCategoryId(Integer id, String name, Integer categoryId);
}