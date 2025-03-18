package com.example.jobflow_api.dtos;

import lombok.Data;

@Data
public class JobApplicationUpdateRequest {
    private String id;
    private String applicationStatus;
    private String message;
}
