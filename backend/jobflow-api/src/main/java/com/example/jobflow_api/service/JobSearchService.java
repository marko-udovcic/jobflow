package com.example.jobflow_api.service;

import com.example.jobflow_api.dtos.JobListingResponse;
import com.example.jobflow_api.dtos.PaginationDTO;
import com.example.jobflow_api.models.indexes.JobPostingDocument;

import java.util.Set;

public interface JobSearchService {
    PaginationDTO<JobListingResponse> searchJobPostings(String title, String location, int page, int size);

    Set<String> suggestLocations(String prefix);

    Set<String> suggestJobTitles(String prefix);
}
