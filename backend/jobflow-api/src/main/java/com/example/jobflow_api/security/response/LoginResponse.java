package com.example.jobflow_api.security.response;

import lombok.Data;

import java.util.List;

@Data

public class LoginResponse {
    private String jwtToken;
    private String email;
    private List<String> roles;

    public LoginResponse(String email, List<String> roles, String jwtToken) {
        this.email = email;
        this.roles = roles;
        this.jwtToken = jwtToken;
    }

}