// SecurityConfig.java
package congtycualuan.example.cafemanagement.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableMethodSecurity(prePostEnabled = true) // Cập nhật annotation cho bảo mật phương thức
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Disable CSRF since we're using JWT
            .csrf(csrf -> csrf.disable())

            // Configure CORS
            .cors(cors -> cors.configurationSource(request -> {
                org.springframework.web.cors.CorsConfiguration config = new org.springframework.web.cors.CorsConfiguration();
                config.setAllowedOrigins(java.util.List.of("http://localhost:3000"));
                config.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                config.setAllowedHeaders(java.util.List.of("*"));
                config.setAllowCredentials(true);
                return config;
            }))

            // Configure session management to be stateless
            .sessionManagement(sess -> sess
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // Configure authorization rules
            .authorizeHttpRequests(auth -> auth
                // Endpoints cho phép truy cập công khai
                .requestMatchers(
                    "/api/users/login",
                    "/api/users/signup",
                    "/api/users/forgot-password",
                    "/api/users/reset-password",
                    "/api/products/getAll",
                    "/api/products/**",
                    
                    "/api/bills/add",
                    
                    "/api/bills/generate/**",
                    "/api/category/getAll",
                    "/api/category/get/**"
                ).permitAll()

                // Các endpoint chỉ dành cho ADMIN
                .requestMatchers(
                    "/api/users/get/**",
                    "/api/users/updateStatus/**",
                    "/api/category/add",
                    "/api/category/update/**",
                    "/api/category/delete/**",
                    "/api/products/add",
                    "/api/products/update/**",
                    "/api/products/delete/**",
                    "/api/bills/getAll",
                    "/api/dashboard/getAll"
                ).hasRole("ADMIN")

                // Các endpoint dành cho USER và ADMIN
                .requestMatchers(
                    "/api/product/get/**",
                    "/api/product/category/**",
                    "/api/bills/report",
                    "/api/users/update/**",
                    "/api/bills/delete/**",
                    "api/bills/get/**"
                ).hasAnyRole("USER", "ADMIN")

                // Tất cả các request khác cần xác thực
                .anyRequest().authenticated()
            );

        // Thêm JWT filter trước UsernamePasswordAuthenticationFilter
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManagerBean(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}