package congtycualuan.example.cafemanagement.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtUtil {

    // Lấy SECRET_KEY từ file cấu hình
    
    private String SECRET_KEY = "9yZW0gaXBzdW0gZG9sb3Ig9yZW0gaXBzdW0gZG9sb3Ig9yZW0gaXBzdW0gZG9sb3Ig9yZW0gaXBzdW0gZG9sb3Ig";

    // Thời gian hết hạn token (ví dụ: 10 giờ)
    private final long JWT_TOKEN_VALIDITY = 10 * 60 * 60 * 1000;

    // Lấy username từ token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Lấy expiration từ token
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Lấy các claims từ token
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Lấy tất cả các claims từ token
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                   .setSigningKey(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
                   .build()
                   .parseClaimsJws(token)
                   .getBody();
    }

    // Kiểm tra token đã hết hạn chưa
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Tạo token
    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username);
    }

    // Tạo token với claims và subject
    private String createToken(Map<String, Object> claims, String subject) {
    return Jwts.builder()
               .setClaims(claims)
               .setSubject(subject)
               .setIssuedAt(new Date(System.currentTimeMillis()))
               .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
               .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()), SignatureAlgorithm.HS256)
               .compact();
}
    

    // Xác thực token
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}