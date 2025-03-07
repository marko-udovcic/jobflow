package com.example.jobflow_api.service;

import com.example.jobflow_api.dtos.UserDTO;
import com.example.jobflow_api.models.AppUser;
import com.example.jobflow_api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


public interface UserService {


    UserDTO getUserById(String id);
}
