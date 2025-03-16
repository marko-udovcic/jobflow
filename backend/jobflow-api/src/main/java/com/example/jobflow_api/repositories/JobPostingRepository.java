package com.example.jobflow_api.repositories;

import com.example.jobflow_api.models.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobPostingRepository extends JpaRepository<JobPosting, String> {
    List<JobPosting> findByEmployerId(String employerId);
}
