// CategoryRepository.java
package congtycualuan.example.cafemanagement.repository;

import congtycualuan.example.cafemanagement.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    
}