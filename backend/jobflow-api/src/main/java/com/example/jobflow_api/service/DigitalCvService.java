package com.example.jobflow_api.service;

import com.example.jobflow_api.dtos.DigitalCvRequest;
import com.example.jobflow_api.models.DigitalCv;
import com.example.jobflow_api.security.services.UserDetailsImpl;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;

public interface DigitalCvService {

    @Transactional
    ResponseEntity<?> createDigitalCv(DigitalCvRequest digitalCvRequest);

    @Transactional
    ResponseEntity<?> updateDigitalCv(DigitalCvRequest digitalCvRequest);

    ResponseEntity<?> getDigitalCvById(String id);

}
