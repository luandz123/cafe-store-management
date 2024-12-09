package congtycualuan.example.cafemanagement.jwt;

import java.util.Arrays;
import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import congtycualuan.example.cafemanagement.repository.UserRepository;
import congtycualuan.example.cafemanagement.model.UserEntity;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CustomerUserDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        log.info("Loading user by email: {}", email);
        Optional<UserEntity> optionalUser = userRepository.findByEmail(email);
        if (!optionalUser.isPresent()) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        UserEntity userDetail = optionalUser.get();
        return new User(
                userDetail.getEmail(),
                userDetail.getPassword(),
                getAuthorities(userDetail.getRole())
        );
    }

    /**
     * Get authorities based on user's role.
     */
    private Collection<? extends GrantedAuthority> getAuthorities(String role) {
        return Arrays.asList(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()));
    }
}