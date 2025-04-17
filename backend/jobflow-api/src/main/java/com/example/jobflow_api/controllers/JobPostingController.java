package com.example.jobflow_api.controllers;


import com.example.jobflow_api.dtos.CreateJobPostingRequest;
import com.example.jobflow_api.dtos.JobListingResponse;
import com.example.jobflow_api.dtos.JobPostingDTO;
import com.example.jobflow_api.dtos.PaginationDTO;
import com.example.jobflow_api.models.JobPosting;
import com.example.jobflow_api.models.indexes.JobPostingDocument;
import com.example.jobflow_api.service.JobPostingService;
import com.example.jobflow_api.service.JobSearchService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/job-postings")
@SecurityRequirement(name = "bearerAuth")
public class JobPostingController {

    private final JobPostingService jobPostingService;
    private final JobSearchService jobSearchService;

    @PostMapping
    @PreAuthorize("hasAuthority('EMPLOYER')")
    public ResponseEntity<JobPosting> createJobPost(@Valid @RequestBody CreateJobPostingRequest createJobPostingRequest,
                                                    @AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        JobPosting jobPosting = jobPostingService.createJobPost(email, createJobPostingRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(jobPosting);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobPostingDTO> getJobPost(@PathVariable String id) {
        try {
            return new ResponseEntity<>(jobPostingService.getJobPostById(id), HttpStatus.OK);
        } catch (ResponseStatusException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("/company/{id}")
    public ResponseEntity<?> getJobOpeningsById(@PathVariable("id")
                                                @Parameter(description = "ID of the company to get job postings for") String id) {
        return jobPostingService.getJobOpeningsById(id);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('EMPLOYER')")
    public ResponseEntity<?> deleteJobPosting(@PathVariable String id) {
        return jobPostingService.deleteJobPosting(id);
    }

    @GetMapping("/search")
    public ResponseEntity<PaginationDTO<JobListingResponse>> search(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String location,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        PaginationDTO<JobListingResponse> result = jobSearchService.searchJobPostings(title, location, page, size);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/suggest-locations")
    public Set<String> suggestLocations(@RequestParam String prefix){
        return jobSearchService.suggestLocations(prefix);
    }

    @GetMapping("/suggest-job-titles")
    public Set<String> suggestJobTitles(@RequestParam String prefix){
        return jobSearchService.suggestJobTitles(prefix);
    }

}
