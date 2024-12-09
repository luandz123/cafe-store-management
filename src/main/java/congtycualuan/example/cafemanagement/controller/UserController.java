// src/main/java/congtycualuan/example/cafemanagement/controller/UserController.java
package congtycualuan.example.cafemanagement.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import congtycualuan.example.cafemanagement.dto.UserProfileDTO;
import congtycualuan.example.cafemanagement.service.UserService;
import congtycualuan.example.cafemanagement.wrapper.ForgotPasswordRequest;
import congtycualuan.example.cafemanagement.wrapper.ResetPasswordRequest;
import congtycualuan.example.cafemanagement.wrapper.UpdateUserStatusRequest;
import congtycualuan.example.cafemanagement.wrapper.UserWrapper;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    // User registration
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody Map<String, String> requestMap) {
        return userService.signUp(requestMap);
    }

    // User login
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> requestMap) {
        return userService.login(requestMap);
    }

    // Get all users (ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<UserWrapper>> getAllUsers() {
        return userService.getAllUsers();
    }

    // Update user details
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Integer id, @RequestBody Map<String, String> requestMap) {
        return userService.updateUser(id, requestMap);
    }

    // Update user status (ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateUserStatus(@PathVariable Integer id, @RequestBody UpdateUserStatusRequest request) {
        return userService.updateUserStatus(id, request);
    }

    // Forgot password
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        return userService.forgotPassword(request);
    }

    // Reset password
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        return userService.resetPassword(request);
    }
    public UserProfileDTO getUserProfile(Authentication authentication) {
        String currentUsername = authentication.getName();
        
        UserProfileDTO profile = new UserProfileDTO();
        profile.setName("luan");
        profile.setEmail("kakak");
        // Thêm các thông tin khác nếu cần
        return profile;
}}