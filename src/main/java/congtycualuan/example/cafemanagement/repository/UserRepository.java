// src/main/java/congtycualuan/example/cafemanagement/repository/UserRepository.java
package congtycualuan.example.cafemanagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import congtycualuan.example.cafemanagement.model.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    Optional<UserEntity> findByEmail(String email);
    Optional<UserEntity> findByResetToken(String resetToken);
}