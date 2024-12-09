// src/main/java/congtycualuan/example/cafemanagement/serviceimpl/UserServiceImpl.java
package congtycualuan.example.cafemanagement.serviceimpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import congtycualuan.example.cafemanagement.constents.CafeConstents;
import congtycualuan.example.cafemanagement.jwt.JwtFilter;
import congtycualuan.example.cafemanagement.jwt.JwtUtil;
import congtycualuan.example.cafemanagement.model.UserEntity;
import congtycualuan.example.cafemanagement.repository.UserRepository;
import congtycualuan.example.cafemanagement.service.UserService;
import congtycualuan.example.cafemanagement.utils.CafeUtils;
import congtycualuan.example.cafemanagement.utils.EmailUtils;
import congtycualuan.example.cafemanagement.wrapper.ForgotPasswordRequest;
import congtycualuan.example.cafemanagement.wrapper.ResetPasswordRequest;
import congtycualuan.example.cafemanagement.wrapper.UpdateUserStatusRequest;
import congtycualuan.example.cafemanagement.wrapper.UserWrapper;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserServiceImpl implements UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private JwtFilter jwtFilter;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private EmailUtils emailUtils;

    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        log.info("Inside signUp {}", requestMap);
        try {
            if (userValidation(requestMap)) {
                if (userRepository.findByEmail(requestMap.get("email")).isPresent()) {
                    return CafeUtils.getResponseEntity(CafeConstents.USER_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
                }
                UserEntity user = createUser(requestMap);
                userRepository.save(user);
                return CafeUtils.getResponseEntity("User registered successfully", HttpStatus.OK);
            }
            return CafeUtils.getResponseEntity(CafeConstents.INVALID_DATA, HttpStatus.BAD_REQUEST);
        } catch (Exception ex) {
            log.error("Exception during signUp: {}", ex);
            return ex.getMessage().contains("ConstraintViolationException") ?
                CafeUtils.getResponseEntity(CafeConstents.USER_ALREADY_EXISTS, HttpStatus.BAD_REQUEST) :
                CafeUtils.getResponseEntity(CafeConstents.INVALID_DATA, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<String> login(Map<String, String> requestMap) {
        log.info("Inside login {}", requestMap);
        try {
            String email = requestMap.get("email");
            String password = requestMap.get("password");

            // Tạo Authentication token với email và password
            Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
            );

            if (auth.isAuthenticated()) {
                UserEntity user = userRepository.findByEmail(email)
                        .orElseThrow(() -> new BadCredentialsException("User not found"));

                // Tạo JWT token với email làm subject
                String token = jwtUtil.generateToken(user.getEmail());

                // Trả về token và role
                String response = String.format("{\"token\":\"%s\", \"role\":\"%s\"}", token, user.getRole());
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
        } catch (BadCredentialsException e) {
            log.error("Bad credentials: {}", e.getMessage());
            return new ResponseEntity<>("{\"message\":\"Bad credentials\"}", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("Exception during login: {}", e);
            return new ResponseEntity<>("{\"message\":\"Internal Server Error\"}", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("{\"message\":\"Bad credentials\"}", HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<List<UserWrapper>> getAllUsers() {
        try {
            List<UserEntity> users = userRepository.findAll();
            List<UserWrapper> userWrappers = CafeUtils.getUserWrapperList(users);
            return new ResponseEntity<>(userWrappers, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Exception in getAllUsers: {}", e);
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> updateUser(Integer id, Map<String, String> requestMap) {
        log.info("Inside updateUser {}", requestMap);
        log.info("Request Map keys: {}", requestMap.keySet());
        try {
            if (updateValidation(requestMap)) {
                Optional<UserEntity> optionalUser = userRepository.findById(id);
                if (optionalUser.isPresent()) {
                    UserEntity user = optionalUser.get();
                    user.setUsername(requestMap.getOrDefault("username", user.getUsername()));
                    user.setEmail(requestMap.getOrDefault("email", user.getEmail()));
                    user.setPhone(requestMap.getOrDefault("phone", user.getPhone()));
                    userRepository.save(user);
                    return CafeUtils.getResponseEntity("User updated successfully", HttpStatus.OK);
                }
                return CafeUtils.getResponseEntity("User not found", HttpStatus.NOT_FOUND);
            }
            return CafeUtils.getResponseEntity(CafeConstents.INVALID_DATA, HttpStatus.BAD_REQUEST);
        } catch (Exception ex) {
            log.error("Exception during updateUser: {}", ex);
            return new ResponseEntity<>(CafeConstents.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> updateUserStatus(Integer id, UpdateUserStatusRequest request) {
        log.info("Inside updateUserStatus {}", request);
        try {
            if (id != null && request.getStatus() != null && !request.getStatus().isEmpty()) {
                Optional<UserEntity> optionalUser = userRepository.findById(id);
                if (optionalUser.isPresent()) {
                    UserEntity user = optionalUser.get();
                    user.setStatus(request.getStatus());
                    userRepository.save(user);
                    return CafeUtils.getResponseEntity("User status updated successfully", HttpStatus.OK);
                }
                return CafeUtils.getResponseEntity("User not found", HttpStatus.NOT_FOUND);
            }
            return CafeUtils.getResponseEntity(CafeConstents.INVALID_DATA, HttpStatus.BAD_REQUEST);
        } catch (Exception ex) {
            log.error("Exception during updateUserStatus: {}", ex);
            return new ResponseEntity<>(CafeConstents.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> forgotPassword(ForgotPasswordRequest request) {
        log.info("Inside forgotPassword {}", request);
        try {
            Optional<UserEntity> optionalUser = userRepository.findByEmail(request.getEmail());
            if (!optionalUser.isPresent()) {
                return CafeUtils.getResponseEntity("Email not found", HttpStatus.NOT_FOUND);
            }

            UserEntity user = optionalUser.get();
            String token = UUID.randomUUID().toString();
            user.setResetToken(token);
            userRepository.save(user);

            String resetLink = "http://localhost:8080/api/users/reset-password?token=" + token;
            emailUtils.sendEmail(user.getEmail(), "Reset Password", "Click the link to reset your password: " + resetLink);

            return CafeUtils.getResponseEntity("Reset password link sent to your email", HttpStatus.OK);
        } catch (Exception ex) {
            log.error("Exception during forgotPassword: {}", ex);
            return CafeUtils.getResponseEntity(CafeConstents.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> resetPassword(ResetPasswordRequest request) {
        log.info("Inside resetPassword {}", request);
        try {
            Optional<UserEntity> optionalUser = userRepository.findByResetToken(request.getToken());
            if (!optionalUser.isPresent()) {
                return CafeUtils.getResponseEntity("Invalid or expired token", HttpStatus.BAD_REQUEST);
            }

            UserEntity user = optionalUser.get();
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            user.setResetToken(null);
            userRepository.save(user);

            return CafeUtils.getResponseEntity("Password reset successfully", HttpStatus.OK);
        } catch (Exception ex) {
            log.error("Exception during resetPassword: {}", ex);
            return CafeUtils.getResponseEntity(CafeConstents.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private boolean userValidation(Map<String, String> requestMap) {
        return requestMap.containsKey("email") &&
               requestMap.containsKey("password") &&
               requestMap.containsKey("username") &&
               requestMap.containsKey("phone");
    }

    private boolean updateValidation(Map<String, String> requestMap) {
        return requestMap.containsKey("email") &&
               requestMap.containsKey("username") &&
               requestMap.containsKey("phone");
    }

    private UserEntity createUser(Map<String, String> requestMap) {
        UserEntity user = new UserEntity();
        user.setEmail(requestMap.get("email"));
        user.setPassword(passwordEncoder.encode(requestMap.get("password")));
        user.setUsername(requestMap.get("username"));
        user.setRole("USER");
        user.setStatus("ACTIVE");
        user.setPhone(requestMap.get("phone"));
        return user;
    }
}