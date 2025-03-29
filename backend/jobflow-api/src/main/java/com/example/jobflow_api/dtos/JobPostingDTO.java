package com.example.jobflow_api.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobPostingDTO {
    private String id;
    private String title;
    private String salary;
    private String description;
    private String responsibilities;
    private String location;
    private String jobType;
    private String hourlyRate;
    private String jobsRequirements;
    private String postingDate;
    private UserDTO company;
    private Long categoryId;
    private String categoryName;

}
