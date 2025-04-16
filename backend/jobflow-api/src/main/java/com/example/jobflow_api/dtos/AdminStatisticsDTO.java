package com.example.jobflow_api.dtos;

import lombok.Data;

@Data
public class AdminStatisticsDTO {
    private int year;
    private int month;
    private String monthName;
    private long postedJobsCount;
    private long activeUsersCount;
    private long companiesCount;
    private long jobApplicationsCount;
}
