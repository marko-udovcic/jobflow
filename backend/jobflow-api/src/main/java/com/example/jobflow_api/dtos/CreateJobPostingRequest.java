package com.example.jobflow_api.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class  CreateJobPostingRequest {

    @NotNull(message = "Category ID is required")
    private long categoryId;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Salary is required")
    private String salary;

    @NotBlank(message = "Description is required")
    private String description;

    private String responsibilities;

    private String jobsRequirements;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Job type is required")
    private String jobType;
}
