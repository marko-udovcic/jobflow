package com.example.jobflow_api.dtos;

import lombok.Data;

@Data
public class JobApplicationDetailsForEmployerDTO {
    private String email;
    private String workerId;
    private String applicationStatus;
    private String applicationDate;
    private String content;
    private String jobPosition;
    private String jobApplicationId;
}
