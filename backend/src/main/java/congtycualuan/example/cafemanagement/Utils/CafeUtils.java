package congtycualuan.example.cafemanagement.Utils;



import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class CafeUtils {
    public CafeUtils() {
    }
    public static ResponseEntity<String> getResponseEntity( String mess ,HttpStatus httpStatus) {
        return new  ResponseEntity<String>("{\"message\": \"" + mess + "\"}", httpStatus);
    }
}
