package com.example.jobflow_api.service.impl;

import com.example.jobflow_api.models.AppUser;
import com.example.jobflow_api.models.enums.Status;
import com.example.jobflow_api.models.enums.UserRole;
import com.example.jobflow_api.repositories.UserRepository;
import com.example.jobflow_api.security.request.SignupRequest;
import com.example.jobflow_api.security.response.MessageResponse;
import com.example.jobflow_api.service.AuthService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    @Transactional
    public MessageResponse registerUser(SignupRequest signupRequest) {
        try {
            if (userRepository.existsByEmail(signupRequest.getEmail())) {
                return new MessageResponse("Error: Email is already in use!");
            }

            String encodedPassword = encoder.encode(signupRequest.getPassword());
            Set<UserRole> userRoles = signupRequest.getRole();
            UserRole userRole = userRoles.isEmpty() ? UserRole.Worker : userRoles.iterator().next();

            AppUser user = AppUser.builder()
                    .email(signupRequest.getEmail())
                    .password(encodedPassword)
                    .role(userRole)
                    .companyStatus(Status.Approved)
                    .build();

            userRepository.save(user);

            return new MessageResponse("User registered successfully!");
        } catch (Exception e) {
            return new MessageResponse("Error occurred during registration: " + e.getMessage());
        }
    }


    @Override
    public Map<String, Object> validateSignupRequest(SignupRequest signupRequest, BindingResult bindingResult) {
        Map<String, Object> errorResponse = new HashMap<>();

        if (bindingResult.hasErrors()) {
            errorResponse.put("message", "Validation failed");

            List<String> errors = new ArrayList<>();
            for (ObjectError error : bindingResult.getAllErrors()) {
                errors.add(error.getDefaultMessage());
            }
            errorResponse.put("errors", errors);
        }

        return errorResponse;
    }


}
