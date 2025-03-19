package com.example.jobflow_api.repositories;

import com.example.jobflow_api.models.JobApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplication,String> {
    Page<JobApplication> findByJobPostingId(String jobId, Pageable pageable);


    @EntityGraph(value = "JobApplication.full",type = EntityGraph.EntityGraphType.LOAD)
    List<JobApplication> findByWorkerId(String workerId);
}
