package com.example.jobflow_api.dtos;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class DigitalCvRequest {
    private String firstname;
    private String lastname;
    private String country;
    private String city;
    private String phone;
    private String summary;
    private String workExperience;
    private String education;
    private String languages;
    private String computerSkills;
    private String otherSkills;
    private String drivingLicence;
    private String additionalInformation;
    private LocalDate dateOfBirth;
    private String nationality;
}
