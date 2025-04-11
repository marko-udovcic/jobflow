package com.example.jobflow_api.service;

import com.example.jobflow_api.models.JobPosting;

public interface JobPostingElasticsearchService {
    void indexJobPosting(JobPosting jobPosting);
    void deleteJobPosting(String id);
}
