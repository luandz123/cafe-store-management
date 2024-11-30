package congtycualuan.example.cafemanagement.ServiceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import congtycualuan.example.cafemanagement.Constents.CafeConstents;
import congtycualuan.example.cafemanagement.Dao.UserRepository;
import congtycualuan.example.cafemanagement.JWT.CustomerUserDetailService;
import congtycualuan.example.cafemanagement.JWT.JwtUtil;
import congtycualuan.example.cafemanagement.POJO.UserEntity;
import congtycualuan.example.cafemanagement.Service.UserService;
import congtycualuan.example.cafemanagement.Utils.CafeUtils;
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
    private CustomerUserDetailService customerUserDetailService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        log.info("inside signUp {}", requestMap);
        try {
            if (userValidation(requestMap)) {
                UserEntity user = userRepository.findByEmail(requestMap.get("email"));
                if (user == null) {
                    UserEntity newUser = createUser(requestMap);
                    userRepository.save(newUser);
                    return CafeUtils.getResponseEntity(CafeConstents.USER_CREATED, HttpStatus.OK);
                }
                return CafeUtils.getResponseEntity(CafeConstents.USER_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
            }
            return CafeUtils.getResponseEntity(CafeConstents.INVALID_DATA, HttpStatus.BAD_REQUEST);
        } catch (Exception ex) {
            log.error("Exception during signUp: {}", ex);
            return ex.getMessage().contains("ConstraintViolationException") ?
                CafeUtils.getResponseEntity(CafeConstents.USER_ALREADY_EXISTS, HttpStatus.BAD_REQUEST) :
                CafeUtils.getResponseEntity(CafeConstents.INVALID_DATA, HttpStatus.BAD_REQUEST);
        }
    }

    
    public boolean userValidation(Map<String, String> requestMap) {
        return requestMap.containsKey("email") &&
               requestMap.containsKey("password") &&
               requestMap.containsKey("username") &&
               requestMap.containsKey("phone");
    }

    
    public UserEntity createUser(Map<String, String> requestMap) {
        UserEntity user = new UserEntity();
        user.setEmail(requestMap.get("email"));
        user.setPassword(passwordEncoder.encode(requestMap.get("password"))); // Mã hóa mật khẩu
        user.setUsername(requestMap.get("username"));
        user.setRole("USER");
        user.setStatus("ACTIVE");
        user.setPhone(requestMap.get("phone"));
        return user;
    }

    @Override
    public ResponseEntity<String> login(Map<String, String> requestMap) {
        log.info("inside login {}", requestMap);
        try {
            Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(requestMap.get("email"), requestMap.get("password"))
            );
            if (auth.isAuthenticated()) {
                UserEntity user = customerUserDetailService.getUserDetail();
                if (user.getStatus().equalsIgnoreCase("ACTIVE")) {
                    String token = jwtUtil.generateToken(user.getEmail());
                    String role = user.getRole();
                    String responseJson = "{\"token\":\"" + token + "\", \"role\":\"" + role + "\"}";
                    return new ResponseEntity<>(responseJson, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("{\"message\":\"Wait for admin approval\"}", HttpStatus.BAD_REQUEST);
                }
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
    public ResponseEntity<List<UserWrapper>> getAllUser() {
        try {
            return new ResponseEntity<>(userRepository.getAllUser(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}