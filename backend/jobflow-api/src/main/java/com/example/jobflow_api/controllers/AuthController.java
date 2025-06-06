package com.example.jobflow_api.controllers;

import com.example.jobflow_api.dtos.UserDTO;
import com.example.jobflow_api.dtos.VerificationResponse;
import com.example.jobflow_api.security.request.LoginRequest;
import com.example.jobflow_api.security.request.SignupRequest;
import com.example.jobflow_api.security.response.MessageResponse;
import com.example.jobflow_api.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        return authService.authenticateUser(loginRequest, response);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletResponse response) {
        return authService.logoutUser(response);
    }

    @GetMapping("/current-user")
    public ResponseEntity<?> getCurrentUserDetails(HttpServletRequest request){
        UserDTO userDto = authService.getCurrentUserDto(request);
        if(userDto != null){
            return ResponseEntity.ok(userDto);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("User is not authorized");

    }

    @GetMapping("/public/verify")
    public ResponseEntity<VerificationResponse> verifyEmail(@RequestParam String token) {
        VerificationResponse response = authService.verifyEmail(token);

        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
