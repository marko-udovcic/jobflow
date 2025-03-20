package com.example.jobflow_api.service;

import com.example.jobflow_api.dtos.*;
import com.example.jobflow_api.models.JobApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface JobApplicationService {
    ResponseEntity<?> createApplication(JobApplicationRequest jobApplicationRequest);

//    ResponseEntity<Page<JobApplication>> getApplicationsByJobId(String jobId, Pageable pageable);

    PaginationDTO<JobApplicationDetailsForEmployerDTO> getApplicationsByJobId(String jobId, Pageable pageable);

    ResponseEntity<?> updateJobApplicationWithMessage(JobApplicationUpdateRequest jobApplicationUpdateRequest);

    List<JobApplicationForWorkerDTO> getApplicationsByWorkerId(String workerId);
}
