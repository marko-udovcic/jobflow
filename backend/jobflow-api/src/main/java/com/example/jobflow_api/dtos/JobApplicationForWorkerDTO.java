package com.example.jobflow_api.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobApplicationForWorkerDTO {
    private String id;
    private String content;
    private String applicationStatus;
    private String applicationDate;
    private List<JobMessageResponse> messages;
    private String jobPostingId;
    private String companyName;

}
