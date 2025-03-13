package com.example.jobflow_api.security.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}