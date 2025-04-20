package com.example.jobflow_api.service.impl;

import com.example.jobflow_api.dtos.UpdateCompanyRequest;
import com.example.jobflow_api.dtos.UserDTO;
import com.example.jobflow_api.exceptions.EntityNotFoundException;
import com.example.jobflow_api.models.AppUser;
import com.example.jobflow_api.models.JobPosting;
import com.example.jobflow_api.models.enums.Status;
import com.example.jobflow_api.repositories.JobPostingRepository;
import com.example.jobflow_api.repositories.UserRepository;
import com.example.jobflow_api.security.jwt.JwtUtils;
import com.example.jobflow_api.security.services.UserDetailsImpl;
import com.example.jobflow_api.service.AuthService;
import com.example.jobflow_api.service.JobPostingElasticsearchService;
import com.example.jobflow_api.service.UserElasticsearchService;
import com.example.jobflow_api.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JobPostingRepository jobPostingRepository;
    private final UserElasticsearchService userElasticsearchService;
    private final JobPostingElasticsearchService jobPostingElasticsearchService;
    private final JwtUtils jwtUtils;
    private final ModelMapper modelMapper;


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

        return modelMapper.map(user,UserDTO.class);
    }

    @Transactional
    @Override
    public AppUser updateUser(UpdateCompanyRequest updateCompanyRequest, HttpServletRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            String email = userDetails.getEmail();

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
        List<JobPosting> jobPostingList = jobPostingRepository.findByEmployerId(id);

        List<String> jobPostingIds = jobPostingList.stream()
                        .map(JobPosting::getId)
                        .collect(Collectors.toList());

        userRepository.deleteById(id);
        userElasticsearchService.deleteUser(id);

        if(!jobPostingIds.isEmpty()){
            jobPostingElasticsearchService.deleteJobPostingsByIds(jobPostingIds);
        }

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

    @Override
    public ResponseEntity<?> updateUserStatus(String id, boolean enabled) {
        ResponseEntity<?> response = findUserAndReturnResponse(id);

        if (response.getStatusCode() == HttpStatus.NOT_FOUND) {
            return response;
        }

        AppUser user = (AppUser) response.getBody();
        user.setEnabled(enabled);
        userRepository.save(user);
        userElasticsearchService.indexUser(user);

        return ResponseEntity.ok("User profile updated successfully.");
    }


}
