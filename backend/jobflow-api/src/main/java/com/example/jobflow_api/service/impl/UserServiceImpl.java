package com.example.jobflow_api.service.impl;

import com.example.jobflow_api.dtos.UpdateCompanyRequest;
import com.example.jobflow_api.dtos.UserDTO;
import com.example.jobflow_api.exceptions.EntityNotFoundException;
import com.example.jobflow_api.models.AppUser;
import com.example.jobflow_api.models.JobPosting;
import com.example.jobflow_api.models.enums.Status;
import com.example.jobflow_api.repositories.UserRepository;
import com.example.jobflow_api.security.jwt.JwtUtils;
import com.example.jobflow_api.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;

    private ResponseEntity<?> findUserAndReturnResponse(String id) {
        Optional<AppUser> user = userRepository.findById(id);

        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.ok(user.get());
    }

    @Override
    public UserDTO getUserById(String id) {
        AppUser user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User with ID " + id + " not found"));
        return convertToDto(user);
    }

    @Override
    public AppUser updateUser(UpdateCompanyRequest updateCompanyRequest, HttpServletRequest request) {
        try {

            String jwtToken = jwtUtils.getJwtFromHeader(request);
            String email = jwtUtils.getEmailFromJwtToken(jwtToken);

            if (email == null || email.isEmpty()) {
                throw new RuntimeException("Email not found in the token");
            }

            Optional<AppUser> userOptional = userRepository.findByEmail(email);

            if (userOptional.isPresent()) {
                AppUser user = userOptional.get();

                if (updateCompanyRequest.getCompanyName() != null) {
                    user.setCompanyName(updateCompanyRequest.getCompanyName());
                }
                if (updateCompanyRequest.getAboutCompany() != null) {
                    user.setAboutCompany(updateCompanyRequest.getAboutCompany());
                }

                userRepository.save(user);
                return user;
            } else {
                throw new RuntimeException("User not found");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error updating user: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> deleteUserProfile(String id) {
        ResponseEntity<?> response = findUserAndReturnResponse(id);

        if (response.getStatusCode() == HttpStatus.NOT_FOUND) {
            return response;
        }
        userRepository.deleteById(id);

        return ResponseEntity.ok("User profile deleted successfully.");
    }

    @Override
    public ResponseEntity<?> updateCompanyStatus(String id, String status) {
        ResponseEntity<?> response = findUserAndReturnResponse(id);

        if (response.getStatusCode() == HttpStatus.NOT_FOUND) {
            return response;
        }

        Status companyStatus = Status.valueOf(status.toUpperCase());

        AppUser user = (AppUser) response.getBody();
        user.setCompanyStatus(companyStatus);
        userRepository.save(user);

        return ResponseEntity.ok("User profile updated successfully.");
    }

    private UserDTO convertToDto(AppUser user) {
        return new UserDTO(user.getId(),
                user.getEmail(),
                user.getRole(),
                user.getCompanyStatus(),
                user.getCompanyName(),
                user.getPhoneNumber(),
                user.getAboutCompany(),
                user.getCreatedAt());
    }
}
