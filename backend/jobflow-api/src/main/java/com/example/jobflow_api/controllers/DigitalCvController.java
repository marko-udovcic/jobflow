package com.example.jobflow_api.controllers;


import com.example.jobflow_api.dtos.DigitalCvRequest;
import com.example.jobflow_api.dtos.UserDTO;
import com.example.jobflow_api.exceptions.EntityNotFoundException;
import com.example.jobflow_api.models.DigitalCv;
import com.example.jobflow_api.models.JobPosting;
import com.example.jobflow_api.service.DigitalCvService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/digital-cv")
@SecurityRequirement(name = "bearerAuth")
public class DigitalCvController {
    private final DigitalCvService digitalCvService;

    @PostMapping
    public ResponseEntity<?> createDigitalCv(@RequestBody DigitalCvRequest digitalCvRequest) {
        return digitalCvService.createDigitalCv(digitalCvRequest);

    }

    @PutMapping
    public ResponseEntity<?> updateDigitalCv(@RequestBody DigitalCvRequest digitalCvRequest) {
        return digitalCvService.updateDigitalCv(digitalCvRequest);

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDigitalCvById(@PathVariable String id) {
        return digitalCvService.getDigitalCvById(id);
    }

}

