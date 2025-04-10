package com.example.jobflow_api.repositories;

import com.example.jobflow_api.models.DigitalCv;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DigitalCvRepository extends JpaRepository<DigitalCv, String> {
}
