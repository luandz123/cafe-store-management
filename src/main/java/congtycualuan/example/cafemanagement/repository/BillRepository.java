package congtycualuan.example.cafemanagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import congtycualuan.example.cafemanagement.model.Bill;

public interface BillRepository extends JpaRepository<Bill,Integer> {
    Optional<Bill> findById(Integer id);
    void deleteById(Integer id);
    

}
