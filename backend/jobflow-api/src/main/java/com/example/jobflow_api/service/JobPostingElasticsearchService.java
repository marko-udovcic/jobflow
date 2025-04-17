package com.example.jobflow_api.service;

import com.example.jobflow_api.models.JobPosting;

import java.util.List;

public interface JobPostingElasticsearchService {
    void indexJobPosting(JobPosting jobPosting);
    void deleteJobPosting(String id);
    void deleteJobPostingsByIds(List<String> ids);
}
