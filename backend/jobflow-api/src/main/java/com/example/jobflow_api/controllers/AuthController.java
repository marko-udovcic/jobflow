package com.example.jobflow_api.controllers;

import com.example.jobflow_api.security.request.LoginRequest;
import com.example.jobflow_api.security.request.SignupRequest;
import com.example.jobflow_api.security.response.MessageResponse;
import com.example.jobflow_api.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/public/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest, BindingResult bindingResult) {
        Map<String, Object> errorResponse = authService.validateSignupRequest(signupRequest, bindingResult);

        if (!errorResponse.isEmpty()) {
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        MessageResponse response = authService.registerUser(signupRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/public/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        return authService.authenticateUser(loginRequest);
    }

}
