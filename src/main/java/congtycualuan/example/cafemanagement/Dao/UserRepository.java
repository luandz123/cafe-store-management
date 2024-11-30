package congtycualuan.example.cafemanagement.Dao;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import congtycualuan.example.cafemanagement.POJO.UserEntity;
import congtycualuan.example.cafemanagement.wrapper.UserWrapper;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    UserEntity findByEmail(String email);
    UserEntity findUserByUsername(String username);
    List<UserWrapper> getAllUser();
}
