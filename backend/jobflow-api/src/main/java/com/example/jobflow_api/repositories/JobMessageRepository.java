package com.example.jobflow_api.repositories;

import com.example.jobflow_api.models.JobMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobMessageRepository extends JpaRepository<JobMessage,String> {
}
