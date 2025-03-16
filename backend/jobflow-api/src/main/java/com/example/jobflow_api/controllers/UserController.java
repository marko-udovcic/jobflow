package com.example.jobflow_api.controllers;

import com.example.jobflow_api.dtos.UpdateCompanyRequest;
import com.example.jobflow_api.dtos.UserDTO;
import com.example.jobflow_api.exceptions.EntityNotFoundException;
import com.example.jobflow_api.models.AppUser;
import com.example.jobflow_api.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
@SecurityRequirement(name = "bearerAuth")
public class UserController {
    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String id) {
        try {
            var userDTO = userService.getUserById(id);
            return new ResponseEntity<>(userDTO, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update-company")
    public ResponseEntity<?> updateUser(@RequestBody UpdateCompanyRequest updateCompanyRequest, HttpServletRequest request) {
        AppUser updatedUser = userService.updateUser(updateCompanyRequest, request);

        return ResponseEntity.ok("User updated successfully");
    }

    @PutMapping("/update-status/{id}")
    public ResponseEntity<?> updateCompanyStatus(@PathVariable String id, String status){
        return userService.updateCompanyStatus(id,status);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUserProfile(@PathVariable String id) {
        return userService.deleteUserProfile(id);
    }

}
