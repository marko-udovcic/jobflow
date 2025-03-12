package com.example.jobflow_api.service.impl;

import com.example.jobflow_api.models.AppUser;
import com.example.jobflow_api.models.enums.Status;
import com.example.jobflow_api.models.enums.UserRole;
import com.example.jobflow_api.repositories.UserRepository;
import com.example.jobflow_api.security.jwt.JwtUtils;
import com.example.jobflow_api.security.request.LoginRequest;
import com.example.jobflow_api.security.request.SignupRequest;
import com.example.jobflow_api.security.response.LoginResponse;
import com.example.jobflow_api.security.response.MessageResponse;
import com.example.jobflow_api.security.services.UserDetailsImpl;
import com.example.jobflow_api.service.AuthService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    @Transactional
    public MessageResponse registerUser(SignupRequest signupRequest) {
        try {
            if (userRepository.existsByEmail(signupRequest.getEmail())) {
                return new MessageResponse("Error: Email is already in use!");
            }

            String encodedPassword = encoder.encode(signupRequest.getPassword());
            Set<UserRole> userRoles = signupRequest.getRole();
            UserRole userRole = userRoles.isEmpty() ? UserRole.WORKER : userRoles.iterator().next();
            Status status = signupRequest.getRole().contains(UserRole.EMPLOYER) ? Status.APPROVED : Status.NOT_A_COMPANY;

            AppUser user = AppUser.builder()
                    .email(signupRequest.getEmail())
                    .password(encodedPassword)
                    .role(userRole)
                    .companyStatus(status)
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

    @Override
    public ResponseEntity<?> authenticateUser(LoginRequest loginRequest) {
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
        } catch (AuthenticationException exception) {
            Map<String, Object> map = new HashMap<>();
            map.put("message", "Bad credentials");
            map.put("status", false);
            return new ResponseEntity<>(map, HttpStatus.UNAUTHORIZED);
        }
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String jwtToken = jwtUtils.generateTokenFromEmail(userDetails);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        LoginResponse response = new LoginResponse(userDetails.getUsername(), roles, jwtToken);

        return ResponseEntity.ok(response);
    }

}
