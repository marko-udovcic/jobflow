package com.example.jobflow_api.dtos;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class DigitalCvResponse extends DigitalCvRequest {
    private String workerId;
    private String email;
}
