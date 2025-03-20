package com.example.jobflow_api.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobMessageResponse {
    private String id;
    private String senderRole;
    private String content;
    private String employerEmail;
    private String sentDate;

}
