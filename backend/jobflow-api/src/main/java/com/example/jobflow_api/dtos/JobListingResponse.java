package com.example.jobflow_api.dtos;

import lombok.Data;

@Data
public class JobListingResponse {
    String id;
    String title;
    String location;
    String categoryName;
    String postingDate;
    String jobType;
    String salary;
    String companyName;
    String employerId;
}
