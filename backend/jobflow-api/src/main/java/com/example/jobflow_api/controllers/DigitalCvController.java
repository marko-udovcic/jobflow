package com.example.jobflow_api.controllers;


import com.example.jobflow_api.dtos.DigitalCvRequest;
import com.example.jobflow_api.service.DigitalCvService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/digital-cv")
@SecurityRequirement(name = "bearerAuth")
public class DigitalCvController {
    private final DigitalCvService digitalCvService;

    @PostMapping
    @PreAuthorize("hasAuthority('WORKER')")
    public ResponseEntity<?> createDigitalCv(@RequestBody DigitalCvRequest digitalCvRequest) {
        return digitalCvService.createDigitalCv(digitalCvRequest);

    }

    @PutMapping
    @PreAuthorize("hasAuthority('WORKER')")
    public ResponseEntity<?> updateDigitalCv(@RequestBody DigitalCvRequest digitalCvRequest) {
        return digitalCvService.updateDigitalCv(digitalCvRequest);

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDigitalCvById(@PathVariable String id) {
        return digitalCvService.getDigitalCvById(id);
    }

}

