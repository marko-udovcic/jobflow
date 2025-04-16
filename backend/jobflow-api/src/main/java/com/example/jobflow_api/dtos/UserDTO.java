package com.example.jobflow_api.dtos;

import com.example.jobflow_api.models.enums.Status;
import com.example.jobflow_api.models.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String id;
    private String email;
    private UserRole role;
    private Status companyStatus;
    private String companyName;
    private String phoneNumber;
    private String aboutCompany;
    private LocalDateTime createdAt;
    private boolean enabled;
}
