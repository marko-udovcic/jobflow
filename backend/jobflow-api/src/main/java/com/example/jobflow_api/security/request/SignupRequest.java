package com.example.jobflow_api.security.request;

import java.util.Set;

import com.example.jobflow_api.models.enums.UserRole;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class SignupRequest {

    @NotBlank
    @Size(max = 150)
    @Email
    private String email;

    @Setter
    @Getter
    private Set<UserRole> role;

    @NotBlank
    @Size(min = 6, max = 40,message = "Password must be at least 6 characters long")
    private String password;
}

