package congtycualuan.example.cafemanagement.wrapper;

public class UpdateUserStatusRequest {
    private Integer id;
    private String status;

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    
    @Override
    public String toString() {
        return "UpdateUserStatusRequest{" +
                "id=" + id +
                ", status='" + status + '\'' +
                '}';
    }
}
