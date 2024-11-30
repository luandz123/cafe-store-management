package congtycualuan.example.cafemanagement.POJO;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;
import lombok.Data;
@NamedQuery(name = "UserEntity.findByEmail", query = "SELECT u FROM UserEntity u WHERE u.email = :email")
@NamedQuery(name = "UserEntity.findUserByUsername", query = "SELECT u FROM UserEntity u WHERE u.username = :username")
@NamedQuery(name = "UserEntity.getAllUser", query = "SELECT new congtycualuan.example.cafemanagement.wrapper.UserWrapper(u.id, u.email, u.username, u.phone, u.status) FROM UserEntity u where u.role = 'USER'")
@Entity
@Table(name = "User")
@Data
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(length = 15)
    private String phone;

  
    @Column(nullable = false, length = 10)
    private String role;

    @Column(name = "status")
    private String status;
    
   

  
    

  
}
