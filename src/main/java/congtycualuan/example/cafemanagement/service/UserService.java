// src/main/java/congtycualuan/example/cafemanagement/service/UserService.java
package congtycualuan.example.cafemanagement.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import congtycualuan.example.cafemanagement.wrapper.ForgotPasswordRequest;
import congtycualuan.example.cafemanagement.wrapper.ResetPasswordRequest;
import congtycualuan.example.cafemanagement.wrapper.UpdateUserStatusRequest;
import congtycualuan.example.cafemanagement.wrapper.UserWrapper;

public interface UserService {

    ResponseEntity<String> signUp(Map<String, String> requestMap);

    ResponseEntity<String> login(Map<String, String> requestMap);

    ResponseEntity<List<UserWrapper>> getAllUsers();

    ResponseEntity<String> updateUser(Integer id, Map<String, String> requestMap);

    ResponseEntity<String> updateUserStatus(Integer id, UpdateUserStatusRequest request);

    ResponseEntity<String> forgotPassword(ForgotPasswordRequest request);

    ResponseEntity<String> resetPassword(ResetPasswordRequest request);
}