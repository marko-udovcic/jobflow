package com.example.jobflow_api.service;

import com.example.jobflow_api.security.request.SignupRequest;
import com.example.jobflow_api.security.response.MessageResponse;
import org.springframework.validation.BindingResult;

import java.util.Map;


public interface AuthService {
    MessageResponse registerUser(SignupRequest signUpRequest);

    Map<String, Object> validateSignupRequest(SignupRequest signupRequest, BindingResult bindingResult);
}
