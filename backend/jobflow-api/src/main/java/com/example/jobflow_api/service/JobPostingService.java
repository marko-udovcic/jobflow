package com.example.jobflow_api.service;

import com.example.jobflow_api.dtos.CreateJobPostingRequest;
import com.example.jobflow_api.dtos.JobPostingDTO;
import com.example.jobflow_api.models.JobPosting;
import org.springframework.http.ResponseEntity;

public interface JobPostingService {
    public JobPosting createJobPost(String email, CreateJobPostingRequest jobPostingRequest);

    JobPostingDTO getJobPostById(String id);

    ResponseEntity<?> getJobOpeningsById(String companyId);

    ResponseEntity<?> deleteJobPosting(String id);
}
