package com.example.jobflow_api.service;

import com.example.jobflow_api.dtos.UpdateCompanyRequest;
import com.example.jobflow_api.dtos.UserDTO;
import com.example.jobflow_api.models.AppUser;
import com.example.jobflow_api.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


public interface UserService {


    UserDTO getUserById(String id);

    AppUser updateUser(UpdateCompanyRequest updateCompanyRequest, HttpServletRequest request);

    ResponseEntity<?> deleteUserProfile(String id);

    ResponseEntity<?> updateCompanyStatus(String id, String status);
}
