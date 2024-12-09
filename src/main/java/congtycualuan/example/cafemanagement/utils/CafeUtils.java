// src/main/java/congtycualuan/example/cafemanagement/utils/CafeUtils.java
package congtycualuan.example.cafemanagement.utils;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import congtycualuan.example.cafemanagement.model.UserEntity;
import congtycualuan.example.cafemanagement.wrapper.UserWrapper;

public class CafeUtils {

    private CafeUtils() {
        // Private constructor to prevent instantiation
    }

    public static ResponseEntity<String> getResponseEntity(String message, HttpStatus httpStatus) {
        return new ResponseEntity<>("{\"message\": \"" + message + "\"}", httpStatus);
    }

    public static List<UserWrapper> getUserWrapperList(List<UserEntity> users) {
        return users.stream()
                .map(user -> new UserWrapper(
                        user.getId(),
                        user.getEmail(),
                        user.getUsername(),
                        user.getPhone(),
                        user.getStatus(),
                        user.getRole()))
                .collect(Collectors.toList());
    }
}