package com.example.jobflow_api.repositories;

import com.example.jobflow_api.models.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface JobPostingRepository extends JpaRepository<JobPosting, String> {
    List<JobPosting> findByEmployerId(String employerId);

    long countByPostingDateBetween(LocalDateTime start, LocalDateTime end);
}
