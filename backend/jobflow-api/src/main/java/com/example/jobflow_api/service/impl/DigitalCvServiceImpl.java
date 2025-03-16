package com.example.jobflow_api.service.impl;

import com.example.jobflow_api.dtos.DigitalCvRequest;
import com.example.jobflow_api.dtos.DigitalCvResponse;
import com.example.jobflow_api.dtos.ErrorResponse;
import com.example.jobflow_api.exceptions.EntityNotFoundException;
import com.example.jobflow_api.models.AppUser;
import com.example.jobflow_api.models.DigitalCv;
import com.example.jobflow_api.repositories.DigitalCvRepository;
import com.example.jobflow_api.repositories.UserRepository;
import com.example.jobflow_api.security.services.UserDetailsImpl;
import com.example.jobflow_api.service.AuthService;
import com.example.jobflow_api.service.DigitalCvService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DigitalCvServiceImpl implements DigitalCvService {

    private final ModelMapper modelMapper;
    private final DigitalCvRepository digitalCvRepository;
    private final UserRepository userRepository;
    private final AuthService authService;

    public ResponseEntity<ErrorResponse> checkIfCvExists(String userId) {
        Optional<DigitalCv> existingCv = digitalCvRepository.findById(userId);

        if (existingCv.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Digital CV already exists for this user."));
        }
        return null;
    }


    @Transactional
    @Override
    public ResponseEntity<?> createDigitalCv(DigitalCvRequest digitalCvRequest) {
        UserDetailsImpl userDetails = authService.getCurrentUserDetails();
        final String userId = userDetails.getId();

        ResponseEntity<ErrorResponse> response = checkIfCvExists(userId);
        if (response != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response.getBody());
        }

        var digitalCv = modelMapper.map(digitalCvRequest, DigitalCv.class);
        digitalCv.setEmail(userDetails.getUsername());

        AppUser appUser = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("user not found"));

        digitalCv.setAppUserAndId(appUser);

        digitalCv = digitalCvRepository.save(digitalCv);

        return ResponseEntity.status(HttpStatus.CREATED).body(digitalCv);


    }

    @Transactional
    @Override
    public ResponseEntity<?> updateDigitalCv(DigitalCvRequest digitalCvRequest) {
        UserDetailsImpl userDetails = authService.getCurrentUserDetails();
        String userId = userDetails.getId();

        DigitalCv existingCv = digitalCvRepository.findById(userId)
                .orElse(null);
        if (existingCv == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Digital CV not found for this user."));
        }

        modelMapper.map(digitalCvRequest, existingCv);
        digitalCvRepository.save(existingCv);

        return ResponseEntity.ok("CV updated successfully");

    }

    @Override
    public ResponseEntity<?> getDigitalCvById(String id) {
        Optional<DigitalCv> digitalCvOptional = digitalCvRepository.findById(id);

        if (digitalCvOptional.isPresent()) {
            var digitalCv = digitalCvOptional.get();

            DigitalCvResponse digitalCvResponse = modelMapper.map(digitalCv,DigitalCvResponse.class);

            return ResponseEntity.ok(digitalCvResponse);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse("Digital CV not found for this user."));

    }
}
