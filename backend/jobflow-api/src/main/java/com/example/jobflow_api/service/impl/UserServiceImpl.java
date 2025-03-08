package com.example.jobflow_api.service.impl;

import com.example.jobflow_api.dtos.UserDTO;
import com.example.jobflow_api.models.AppUser;
import com.example.jobflow_api.repositories.UserRepository;
import com.example.jobflow_api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Override
    public UserDTO getUserById(String id) {
        AppUser user = userRepository.findById(id).orElseThrow();
        return convertToDto(user);
    }

    private UserDTO convertToDto(AppUser user) {
        return new UserDTO(
                user.getId(),
                user.getEmail(),
                user.getRole(),
                user.getCompanyStatus(),
                user.getCompanyName(),
                user.getPhoneNumber(),
                user.getAboutCompany(),
                user.getCreatedAt()
        );
    }
}
