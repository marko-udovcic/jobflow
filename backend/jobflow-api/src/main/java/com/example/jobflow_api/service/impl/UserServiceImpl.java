package com.example.jobflow_api.service.impl;

import com.example.jobflow_api.dtos.UpdateCompanyRequest;
import com.example.jobflow_api.dtos.UserDTO;
import com.example.jobflow_api.exceptions.EntityNotFoundException;
import com.example.jobflow_api.models.AppUser;
import com.example.jobflow_api.repositories.UserRepository;
import com.example.jobflow_api.security.jwt.JwtUtils;
import com.example.jobflow_api.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;

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
