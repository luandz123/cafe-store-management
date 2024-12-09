package congtycualuan.example.cafemanagement.jwt;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private CustomerUserDetailService customerUserDetailService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authorizationHeader = request.getHeader("Authorization");
        String token = null;
        String email = null;

        // Kiểm tra header Authorization có tồn tại và bắt đầu bằng "Bearer "
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            token = authorizationHeader.substring(7);
            try {
                email = jwtUtil.extractUsername(token);
            } catch (Exception e) {
                log.error("Error extracting email from token: {}", e.getMessage());
            }
        }

        // Nếu email không null và chưa có Authentication trong SecurityContext
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = customerUserDetailService.loadUserByUsername(email);
            if (jwtUtil.validateToken(token, userDetails)) {
                // Tạo Authentication token
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                
                // Cài đặt chi tiết vào Authentication token
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                
                // Đặt Authentication vào SecurityContext
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            } else {
                log.error("Invalid JWT token for user: {}", email);
            }
        }

        // Tiếp tục chuỗi filter
        filterChain.doFilter(request, response);
    }
   
}