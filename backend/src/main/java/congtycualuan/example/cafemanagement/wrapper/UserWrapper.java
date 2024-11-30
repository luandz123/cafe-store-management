package congtycualuan.example.cafemanagement.wrapper;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserWrapper {
    private Integer id;
    private String email;
    private String name;
    private String phone;
    private String status;
}
