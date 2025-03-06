package com.example.jobflow_api.repositories;

import com.example.jobflow_api.models.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobApplicationRepository extends JpaRepository<JobApplication,String> {
}
