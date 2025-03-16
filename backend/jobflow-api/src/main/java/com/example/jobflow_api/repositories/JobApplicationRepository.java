package com.example.jobflow_api.repositories;

import com.example.jobflow_api.models.JobApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobApplicationRepository extends JpaRepository<JobApplication,String> {
    Page<JobApplication> findByJobPostingId(String jobId, Pageable pageable);
}
