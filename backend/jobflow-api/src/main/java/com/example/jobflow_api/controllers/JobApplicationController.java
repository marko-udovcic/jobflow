package com.example.jobflow_api.controllers;


import com.example.jobflow_api.dtos.*;
import com.example.jobflow_api.models.JobApplication;
import com.example.jobflow_api.service.JobApplicationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/job-applications")
@SecurityRequirement(name = "bearerAuth")
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;


    @PostMapping
    public ResponseEntity<?> createApplication(@RequestBody JobApplicationRequest jobApplicationRequest) {
        return jobApplicationService.createApplication(jobApplicationRequest);
    }

    @GetMapping("/job-post/{jobId}")
    public PaginationDTO<JobApplicationDetailsForEmployerDTO> getApplicationsForJobPost(@PathVariable String jobId,
                                                                                        @RequestParam(defaultValue = "0") int page,
                                                                                        @RequestParam(defaultValue = "10") int size){
        Pageable pageable = PageRequest.of(page,size);
        return jobApplicationService.getApplicationsByJobId(jobId,pageable);
    }

    @PutMapping("/")
    public ResponseEntity<?> updateJobApplication(
            @RequestBody JobApplicationUpdateRequest jobApplicationUpdateRequest
            ){
        return jobApplicationService.updateJobApplicationWithMessage(jobApplicationUpdateRequest);
    }

    @GetMapping("/{workerId}")
    public List<JobApplicationForWorkerDTO> getApplicationByWorker(@PathVariable String workerId){
        return jobApplicationService.getApplicationsByWorkerId(workerId);
    }

}
