package com.example.jobflow_api.dtos;

import lombok.Data;

@Data
public class JobApplicationRequest { //dto for creating application
    private String jobPostingId;
    private String jobPosition;
    private String content;
}
