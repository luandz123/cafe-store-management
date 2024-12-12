package congtycualuan.example.cafemanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class DashboardDTO {
    private long ProductCount;
    private long CategoryCount;
    private long BillCount;

}
