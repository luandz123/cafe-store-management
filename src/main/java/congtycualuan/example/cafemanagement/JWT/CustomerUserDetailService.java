package congtycualuan.example.cafemanagement.JWT;

import java.util.Arrays;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import congtycualuan.example.cafemanagement.Dao.UserRepository;
import congtycualuan.example.cafemanagement.POJO.UserEntity;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CustomerUserDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    private UserEntity userDetail;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        log.info("Loading user by email: {}", email);
        userDetail = userRepository.findByEmail(email);
        if (userDetail == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        return new org.springframework.security.core.userdetails.User(
                userDetail.getEmail(),
                userDetail.getPassword(),
                getAuthorities(userDetail.getRole())
        );
    }

    /**
     * Lấy các authorities dựa trên role của người dùng.
     */
    private Collection<? extends GrantedAuthority> getAuthorities(String role) {
        return Arrays.asList(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()));
    }

    /**
     * Lấy thông tin chi tiết người dùng sau khi được tải bởi UserDetailsService.
     */
    public UserEntity getUserDetail() {
        return userDetail;
    }
}