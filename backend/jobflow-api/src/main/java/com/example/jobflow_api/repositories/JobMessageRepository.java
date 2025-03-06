package com.example.jobflow_api.repositories;

import com.example.jobflow_api.models.JobMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobMessageRepository extends JpaRepository<JobMessage,String> {
}
