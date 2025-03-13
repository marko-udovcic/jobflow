package com.example.jobflow_api.controllers;

import com.example.jobflow_api.dtos.UpdateCompanyRequest;
import com.example.jobflow_api.dtos.UserDTO;
import com.example.jobflow_api.models.AppUser;
import com.example.jobflow_api.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @PutMapping("/update-company")
    public ResponseEntity<?> updateUser(@RequestBody UpdateCompanyRequest updateCompanyRequest, HttpServletRequest request) {
        AppUser updatedUser = userService.updateUser(updateCompanyRequest, request);

        return ResponseEntity.ok("User updated successfully");
    }

}
