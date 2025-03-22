package com.example.jobflow_api.service;

import com.example.jobflow_api.security.request.LoginRequest;
import com.example.jobflow_api.security.request.SignupRequest;
import com.example.jobflow_api.security.response.MessageResponse;
import com.example.jobflow_api.security.services.UserDetailsImpl;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;

import java.util.Map;


public interface AuthService {
    MessageResponse registerUser(SignupRequest signUpRequest);

    Map<String, Object> validateSignupRequest(SignupRequest signupRequest, BindingResult bindingResult);

    ResponseEntity<?> authenticateUser(LoginRequest loginRequest, HttpServletResponse response);

   UserDetailsImpl getCurrentUserDetails();

    ResponseEntity<?> logoutUser(HttpServletResponse response);
}
