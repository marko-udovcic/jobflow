package com.example.jobflow_api.service.impl;

import com.example.jobflow_api.dtos.CreateJobPostingRequest;
import com.example.jobflow_api.dtos.JobListingResponse;
import com.example.jobflow_api.dtos.JobPostingDTO;
import com.example.jobflow_api.dtos.UserDTO;
import com.example.jobflow_api.models.AppUser;
import com.example.jobflow_api.models.Category;
import com.example.jobflow_api.models.JobPosting;
import com.example.jobflow_api.repositories.CategoryRepository;
import com.example.jobflow_api.repositories.JobPostingRepository;
import com.example.jobflow_api.repositories.UserRepository;
import com.example.jobflow_api.service.JobPostingService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
@Service
public class JobPostingServiceImpl implements JobPostingService {

    private final JobPostingRepository jobPostingRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public JobPosting createJobPost(String email, CreateJobPostingRequest jobPostingRequest) {
        JobPosting jobPosting = modelMapper.map(jobPostingRequest, JobPosting.class);

        AppUser employer = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        jobPosting.setEmployer(employer);

        Category category = categoryRepository.findById(jobPostingRequest.getCategoryId()).orElseThrow(() -> new RuntimeException("Category not found"));
        jobPosting.setCategory(category);

        jobPosting = jobPostingRepository.save(jobPosting);

        return jobPosting;
    }


    @Override
    public JobPostingDTO getJobPostById(String id) {
        JobPosting jobPosting = jobPostingRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Job Posting not found"
                ));

        JobPostingDTO jobPostingDTO = modelMapper.map(jobPosting, JobPostingDTO.class);
        UserDTO company = modelMapper.map(jobPosting.getEmployer(), UserDTO.class);
        jobPostingDTO.setCompany(company);


        if (jobPosting.getCategory() != null) {
            jobPostingDTO.setCategoryId(jobPosting.getCategory().getId());
            jobPostingDTO.setCategoryName(jobPosting.getCategory().getName());
        }

        return jobPostingDTO;
    }

    @Override
    public ResponseEntity<?> getJobOpeningsById(String employerId) {
        List<JobPosting> listJobOpenings = jobPostingRepository.findByEmployerId(employerId);
        if (listJobOpenings.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        AppUser employer = userRepository.findById(employerId).orElseThrow(() -> new RuntimeException("User not found"));
        String companyName = employer.getCompanyName();

        List<JobListingResponse> jobListingResponseList = listJobOpenings.stream()
                .map(jobPosting -> {
                    JobListingResponse jobListingResponse = modelMapper.map(jobPosting, JobListingResponse.class);
                    if (jobPosting.getCategory() != null) {
                        jobListingResponse.setCategoryName(jobPosting.getCategory().getName());
                    }
                    jobListingResponse.setCompanyName(companyName);
                    return jobListingResponse;

                })
                .toList();

        return ResponseEntity.ok(jobListingResponseList);
    }

    @Override
    public ResponseEntity<?> deleteJobPosting(String id) {
        Optional<JobPosting> jobPosting = jobPostingRepository.findById(id);

        if(jobPosting.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        jobPostingRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}
